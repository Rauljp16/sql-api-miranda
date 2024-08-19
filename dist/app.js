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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const roomControllers_1 = __importDefault(require("./controllers/roomControllers"));
const bookingControllers_1 = __importDefault(require("./controllers/bookingControllers"));
const userControllers_1 = __importDefault(require("./controllers/userControllers"));
const contactControllers_1 = __importDefault(require("./controllers/contactControllers"));
const loginControllers_1 = __importDefault(require("./controllers/loginControllers"));
const auth_1 = __importDefault(require("./middleware/auth"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const mongoUri = process.env.MONGO_URL;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoUri);
    }
    catch (error) {
        console.error(error);
    }
});
start();
exports.app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
    //res.send("kujsdfhkjgdfsjkjdf")
});
exports.app.use("/login", loginControllers_1.default);
exports.app.use(auth_1.default);
exports.app.use("/rooms", roomControllers_1.default);
exports.app.use("/bookings", bookingControllers_1.default);
exports.app.use("/users", userControllers_1.default);
exports.app.use("/contact", contactControllers_1.default);
exports.app.use((err, _req, res, _Next) => {
    console.error(err);
    return res.status(401).json({ error: true, message: "Aplications error" });
});
