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
exports.UserControllers = void 0;
const Users_1 = require("../Services/Users");
exports.UserControllers = {
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).send(Users_1.users);
        }
        catch (error) {
            next(error);
        }
    }),
    availableSlots: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { date } = req.query;
            if (!userId || !date) {
                res.status(400).send({ error: "User ID and date are required." });
                return;
            }
            const user = Users_1.users.find((u) => u.id === parseInt(userId));
            if (!user) {
                res.status(404).send({ error: "User not found." });
                return;
            }
            const availableTimes = user.availableTimes[date];
            if (!availableTimes || availableTimes.length === 0) {
                res
                    .status(200)
                    .send({ availableSlots: [], message: "No available slots." });
                return;
            }
            res.status(200).send({ availableSlots: availableTimes });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=UserControllers.js.map