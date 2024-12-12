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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingToUserController = void 0;
const MeetingToUsers_1 = require("../Services/MeetingToUsers");
exports.MeetingToUserController = {
    getUserTimezone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, meetingID } = req.params;
            if (!userId || !meetingID) {
                res.status(400).json({ message: "userId and meetingID are required." });
                return;
            }
            const userTimezones = MeetingToUsers_1.MeetingToUsers.filter((entry) => entry.userId === parseInt(userId) &&
                entry.meetingID === parseInt(meetingID));
            if (userTimezones.length === 0) {
                res.status(404).json({
                    message: "No records found for the specified user and meeting.",
                });
                return;
            }
            res.status(200).json({ data: userTimezones });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=MeetingToUserController.js.map