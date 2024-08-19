import { Router, Request, Response, NextFunction } from "express";
import { generateAccessToken } from "../services/loginServices";

const router = Router()

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const token = await generateAccessToken(username, password);

        return res.json({ token })

    } catch (e) {

        next(e);

        return res.status(401).json({ message: "Invalid credentials" })

    }
});

export default router;