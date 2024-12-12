import express from "express";
import { MeetingControllers } from "../Controllers/MeetingControllers";
export const MeetingRouter = express.Router();

MeetingRouter.post("/meetings", MeetingControllers.createMeetings);
MeetingRouter.get("/meetings", MeetingControllers.readMeetings);
MeetingRouter.get("/meetings/:id", MeetingControllers.readMeetingById);
MeetingRouter.put("/meetings/:id", MeetingControllers.updateMeetings);
MeetingRouter.delete("/meetings/:id", MeetingControllers.deleteMeetings);
