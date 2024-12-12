"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const MeetingRouter_1 = require("./Routers/MeetingRouter");
const UserRouter_1 = require("./Routers/UserRouter");
const MeetingToUserRouter_1 = require("./Routers/MeetingToUserRouter");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.app.use("/img", express_1.default.static(path_1.default.join(__dirname, "public/img")));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static("public"));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use("/api/v1", MeetingRouter_1.MeetingRouter);
exports.app.use("/api/v1", UserRouter_1.UserRouter);
exports.app.use("/api/v1", MeetingToUserRouter_1.MeetingToUserRoute);
exports.app.get("*", (req, res) => {
    res.status(404).send("Invalid endpoint");
});
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        message: err.message || "Internal Server Error",
    });
});
//# sourceMappingURL=server.js.map