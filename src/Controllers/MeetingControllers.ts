import { Request, Response, NextFunction } from "express";
import { meetings } from "../Services/Meeting";
import { MeetingToUsers } from "../Services/MeetingToUsers";
import { users } from "../Services/Users";
import moment from "moment-timezone";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  participants: number[];
  description: string;
  timezone: string;
}

interface MeetingType {
  createMeetings: (req: Request, res: Response, next: NextFunction) => void;
  readMeetings: (req: Request, res: Response, next: NextFunction) => void;
  readMeetingById: (req: Request, res: Response, next: NextFunction) => void;
  updateMeetings: (req: Request, res: Response, next: NextFunction) => void;
  deleteMeetings: (req: Request, res: Response, next: NextFunction) => void;
}

export const MeetingControllers: MeetingType = {
  createMeetings: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newMeeting: Meeting = req.body;

      // Check for missing required fields
      if (
        !newMeeting.title ||
        !newMeeting.date ||
        !newMeeting.time ||
        !newMeeting.duration ||
        !newMeeting.participants ||
        !newMeeting.description ||
        !newMeeting.timezone
      ) {
        res.status(400).send({
          error:
            "Missing required fields: title, date, time, duration, participants, description, or timezone",
        });
        return;
      }

      if (
        !Array.isArray(newMeeting.participants) ||
        newMeeting.participants.length === 0
      ) {
        res.status(400).send({
          error: "Participants must be an array with at least one user ID.",
        });
        return;
      }

      newMeeting.id = meetings.length
        ? meetings[meetings.length - 1].id + 1
        : 1;

      const unavailableUsers: number[] = [];
      newMeeting.participants.forEach((userId) => {
        const user = users.find((u) => u.id === userId);

        if (user) {
          const meetingTime = moment(
            `${newMeeting.time}`,
            "YYYY-MM-DD hh:mm:ss A"
          );

          const userAvailableTimes = user.availableTimes[newMeeting.date];

          if (
            !userAvailableTimes ||
            !userAvailableTimes.some((availableTime: string) => {
              const availableTimeMoment = moment(availableTime, "hh:mm A");
              return availableTimeMoment.isSame(meetingTime, "minute");
            })
          ) {
            unavailableUsers.push(userId);
          }
        }
      });

      if (unavailableUsers.length > 0) {
        res.status(400).send({
          error: "The participant is unavailable at the given time.",
          unavailableUsers,
        });
        return;
      }

      meetings.push(newMeeting);

      const meetingID = newMeeting.id;
      const newMappings = newMeeting.participants.map((userId) => {
        const user = users.find((u) => u.id === userId);
        const userTimezone = user?.timezone || "UTC";
        const userToMeetingTime = moment
          .tz(
            `${newMeeting.date} ${newMeeting.time}`,
            "YYYY-MM-DD hh:mm:ss A",
            userTimezone
          )
          .tz(newMeeting.timezone)
          .format("HH:mm");

        return {
          id: MeetingToUsers.length
            ? MeetingToUsers[MeetingToUsers.length - 1].id + 1
            : 1,
          userId,
          meetingID,
          userToClientTimezone: userToMeetingTime,
        };
      });

      MeetingToUsers.push(...newMappings);

      res.status(201).send({
        message: "Meeting created successfully",
        data: newMeeting,
        userMappings: newMappings,
      });
    } catch (error: any) {
      res.status(500).send({
        error:
          error.message ||
          "An unexpected error occurred while creating the meeting",
      });
      next(error);
    }
  },

  readMeetings: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.status(200).send({ data: meetings });
    } catch (error) {
      next(error);
    }
  },

  readMeetingById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const meeting = meetings.find((meeting) => meeting.id === parseInt(id));

      if (!meeting) {
        res.status(404).send({ error: "Meeting not found" });
        return;
      }

      res.status(200).send({ data: meeting });
    } catch (error) {
      next(error);
    }
  },

  updateMeetings: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedData: Partial<Meeting> = req.body;
      const meetingIndex = meetings.findIndex(
        (meeting) => meeting.id === parseInt(id)
      );

      if (meetingIndex === -1) {
        res.status(404).send({ error: "Meeting not found" });
        return;
      }

      meetings[meetingIndex] = { ...meetings[meetingIndex], ...updatedData };

      res.status(200).send({
        message: "Meeting updated successfully",
        data: meetings[meetingIndex],
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMeetings: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const meetingIndex = meetings.findIndex(
        (meeting) => meeting.id === parseInt(id)
      );

      if (meetingIndex === -1) {
        res.status(404).send({ error: "Meeting not found" });
        return;
      }

      meetings.splice(meetingIndex, 1);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
