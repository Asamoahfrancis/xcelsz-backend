import { Request, Response, NextFunction } from "express";
import { MeetingToUsers } from "../Services/MeetingToUsers";

export const MeetingToUserController = {
  getUserTimezone: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, meetingID } = req.params;
      if (!userId || !meetingID) {
        res.status(400).json({ message: "userId and meetingID are required." });
        return;
      }

      const userTimezones = MeetingToUsers.filter(
        (entry) =>
          entry.userId === parseInt(userId) &&
          entry.meetingID === parseInt(meetingID)
      );

      if (userTimezones.length === 0) {
        res.status(404).json({
          message: "No records found for the specified user and meeting.",
        });
        return;
      }

      res.status(200).json({ data: userTimezones });
    } catch (error) {
      next(error);
    }
  },
};
