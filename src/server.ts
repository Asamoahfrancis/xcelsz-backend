import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { NextFunction, Request, Response } from "express";
import { MeetingRouter } from "./Routers/MeetingRouter";
import { UserRouter } from "./Routers/UserRouter";
import { MeetingToUserRoute } from "./Routers/MeetingToUserRouter";
import path from "path";
export const app = express();

app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", MeetingRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", MeetingToUserRoute);

app.get("*", (req, res) => {
  res.status(404).send("Invalid endpoint");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
});
