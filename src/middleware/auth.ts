import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');



export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header is missing" });
        return
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "Token is missing" });
        return
    }
    try {
        const TOKEN_SECRET = process.env.TOKEN_SECRET;
        if (!TOKEN_SECRET) {
            throw new Error("Aplication error");
        }
        jwt.verify(token, TOKEN_SECRET)
        next()
    } catch (e) {
        res.status(401).json({ message: "invalid token" })
        return
    }
}





