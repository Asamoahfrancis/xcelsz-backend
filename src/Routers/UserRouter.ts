import express from "express";
import { UserControllers } from "../Controllers/UserControllers";
export const UserRouter = express.Router();

UserRouter.get("/users", UserControllers.getAllUsers);
UserRouter.get(
  "/users/:userId/available-slots",
  UserControllers.availableSlots
);
