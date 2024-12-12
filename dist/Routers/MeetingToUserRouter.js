"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingToUserRoute = void 0;
const express_1 = __importDefault(require("express"));
const MeetingToUserController_1 = require("../Controllers/MeetingToUserController");
exports.MeetingToUserRoute = express_1.default.Router();
exports.MeetingToUserRoute.get("/user/:userId/meeting/:meetingID/timezone", MeetingToUserController_1.MeetingToUserController.getUserTimezone);
//# sourceMappingURL=MeetingToUserRouter.js.map