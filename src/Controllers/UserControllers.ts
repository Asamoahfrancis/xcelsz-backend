import { Request, Response, NextFunction } from "express";
import { users } from "../Services/Users";

export const UserControllers = {
  getAllUsers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  },

  availableSlots: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      if (!userId || !date) {
        res.status(400).send({ error: "User ID and date are required." });
        return;
      }

      const user = users.find((u) => u.id === parseInt(userId));

      if (!user) {
        res.status(404).send({ error: "User not found." });
        return;
      }

      const availableTimes =
        user.availableTimes[date as keyof typeof user.availableTimes];

      if (!availableTimes || availableTimes.length === 0) {
        res
          .status(200)
          .send({ availableSlots: [], message: "No available slots." });
        return;
      }

      res.status(200).send({ availableSlots: availableTimes });
    } catch (error) {
      next(error);
    }
  },
};
