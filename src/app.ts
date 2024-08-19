import express, { Request, Response, NextFunction } from "express";
import roomControllers from "./controllers/roomControllers";
import bookingControllers from "./controllers/bookingControllers";
import userControllers from "./controllers/userControllers";
import contactControllers from "./controllers/contactControllers";
import loginControllers from "./controllers/loginControllers";
import authMiddleware from "./middleware/auth";
import path from "path"
import mongoose from "mongoose";
import cors from "cors";

export const app = express();
const mongoUri = process.env.MONGO_URL
app.use(cors())
app.use(express.json());

const start = async () => {
    try {
        await mongoose.connect(mongoUri as string);

    } catch (error) {
        console.error(error);
    }
};

start();
app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    //res.send("kujsdfhkjgdfsjkjdf")
});




app.use("/login", loginControllers);
app.use(authMiddleware);
app.use("/rooms", roomControllers);
app.use("/bookings", bookingControllers);
app.use("/users", userControllers);
app.use("/contact", contactControllers);

app.use((err: Error, _req: Request, res: Response, _Next: NextFunction) => {
    console.error(err);
    return res.status(401).json({ error: true, message: "Aplications error" });
});