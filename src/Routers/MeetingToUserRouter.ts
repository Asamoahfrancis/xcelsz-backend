import express from "express";
import { MeetingToUserController } from "../Controllers/MeetingToUserController";
export const MeetingToUserRoute = express.Router();

MeetingToUserRoute.get(
  "/user/:userId/meeting/:meetingID/timezone",
  MeetingToUserController.getUserTimezone
);
