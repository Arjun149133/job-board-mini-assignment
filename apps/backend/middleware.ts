import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ error: "Invalid token" });
        return;
    }

}