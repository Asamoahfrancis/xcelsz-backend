"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserControllers_1 = require("../Controllers/UserControllers");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.get("/users", UserControllers_1.UserControllers.getAllUsers);
exports.UserRouter.get("/users/:userId/available-slots", UserControllers_1.UserControllers.availableSlots);
//# sourceMappingURL=UserRouter.js.map