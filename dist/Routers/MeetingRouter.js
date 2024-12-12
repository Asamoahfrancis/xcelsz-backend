"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingRouter = void 0;
const express_1 = __importDefault(require("express"));
const MeetingControllers_1 = require("../Controllers/MeetingControllers");
exports.MeetingRouter = express_1.default.Router();
exports.MeetingRouter.post("/meetings", MeetingControllers_1.MeetingControllers.createMeetings);
exports.MeetingRouter.get("/meetings", MeetingControllers_1.MeetingControllers.readMeetings);
exports.MeetingRouter.get("/meetings/:id", MeetingControllers_1.MeetingControllers.readMeetingById);
exports.MeetingRouter.put("/meetings/:id", MeetingControllers_1.MeetingControllers.updateMeetings);
exports.MeetingRouter.delete("/meetings/:id", MeetingControllers_1.MeetingControllers.deleteMeetings);
//# sourceMappingURL=MeetingRouter.js.map