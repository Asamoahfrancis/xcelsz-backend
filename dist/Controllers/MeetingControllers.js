"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingControllers = void 0;
const Meeting_1 = require("../Services/Meeting");
const MeetingToUsers_1 = require("../Services/MeetingToUsers");
const Users_1 = require("../Services/Users");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.MeetingControllers = {
    createMeetings: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMeeting = req.body;
            // Check for missing required fields
            if (!newMeeting.title ||
                !newMeeting.date ||
                !newMeeting.time ||
                !newMeeting.duration ||
                !newMeeting.participants ||
                !newMeeting.description ||
                !newMeeting.timezone) {
                res.status(400).send({
                    error: "Missing required fields: title, date, time, duration, participants, description, or timezone",
                });
                return;
            }
            if (!Array.isArray(newMeeting.participants) ||
                newMeeting.participants.length === 0) {
                res.status(400).send({
                    error: "Participants must be an array with at least one user ID.",
                });
                return;
            }
            newMeeting.id = Meeting_1.meetings.length
                ? Meeting_1.meetings[Meeting_1.meetings.length - 1].id + 1
                : 1;
            const unavailableUsers = [];
            newMeeting.participants.forEach((userId) => {
                const user = Users_1.users.find((u) => u.id === userId);
                if (user) {
                    const meetingTime = (0, moment_timezone_1.default)(`${newMeeting.time}`, "YYYY-MM-DD hh:mm:ss A");
                    const userAvailableTimes = user.availableTimes[newMeeting.date];
                    if (!userAvailableTimes ||
                        !userAvailableTimes.some((availableTime) => {
                            const availableTimeMoment = (0, moment_timezone_1.default)(availableTime, "hh:mm A");
                            return availableTimeMoment.isSame(meetingTime, "minute");
                        })) {
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
            Meeting_1.meetings.push(newMeeting);
            const meetingID = newMeeting.id;
            const newMappings = newMeeting.participants.map((userId) => {
                const user = Users_1.users.find((u) => u.id === userId);
                const userTimezone = (user === null || user === void 0 ? void 0 : user.timezone) || "UTC";
                const userToMeetingTime = moment_timezone_1.default
                    .tz(`${newMeeting.date} ${newMeeting.time}`, "YYYY-MM-DD hh:mm:ss A", userTimezone)
                    .tz(newMeeting.timezone)
                    .format("HH:mm");
                return {
                    id: MeetingToUsers_1.MeetingToUsers.length
                        ? MeetingToUsers_1.MeetingToUsers[MeetingToUsers_1.MeetingToUsers.length - 1].id + 1
                        : 1,
                    userId,
                    meetingID,
                    userToClientTimezone: userToMeetingTime,
                };
            });
            MeetingToUsers_1.MeetingToUsers.push(...newMappings);
            res.status(201).send({
                message: "Meeting created successfully",
                data: newMeeting,
                userMappings: newMappings,
            });
        }
        catch (error) {
            res.status(500).send({
                error: error.message ||
                    "An unexpected error occurred while creating the meeting",
            });
            next(error);
        }
    }),
    readMeetings: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).send({ data: Meeting_1.meetings });
        }
        catch (error) {
            next(error);
        }
    }),
    readMeetingById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const meeting = Meeting_1.meetings.find((meeting) => meeting.id === parseInt(id));
            if (!meeting) {
                res.status(404).send({ error: "Meeting not found" });
                return;
            }
            res.status(200).send({ data: meeting });
        }
        catch (error) {
            next(error);
        }
    }),
    updateMeetings: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const meetingIndex = Meeting_1.meetings.findIndex((meeting) => meeting.id === parseInt(id));
            if (meetingIndex === -1) {
                res.status(404).send({ error: "Meeting not found" });
                return;
            }
            Meeting_1.meetings[meetingIndex] = Object.assign(Object.assign({}, Meeting_1.meetings[meetingIndex]), updatedData);
            res.status(200).send({
                message: "Meeting updated successfully",
                data: Meeting_1.meetings[meetingIndex],
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMeetings: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const meetingIndex = Meeting_1.meetings.findIndex((meeting) => meeting.id === parseInt(id));
            if (meetingIndex === -1) {
                res.status(404).send({ error: "Meeting not found" });
                return;
            }
            Meeting_1.meetings.splice(meetingIndex, 1);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=MeetingControllers.js.map