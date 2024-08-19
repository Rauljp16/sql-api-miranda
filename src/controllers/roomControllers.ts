import { Router, Request, Response, NextFunction } from "express";
import {
    allRooms,
    roomById,
    createRoom,
    updateRoom,
    deleteRoom,
} from "../services/roomServices";

const router = Router();

router.get("/", async (_req: Request, res: Response, _next: NextFunction) => {
    const rooms = await allRooms();
    return res.json({ rooms });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newRoom = await createRoom(body);
        return res.json({ newRoom });
    } catch (e) {
        next(e);
        return;
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const room = await roomById(id);

        return res.json({ room });
    } catch (e) {
        next(e);
        return;
    }
});

router.patch(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const updated = await updateRoom(id, body);
            return res.json({ updated });
        } catch (e) {
            next(e);
            return;
        }
    }
);

router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const deleteOne = await deleteRoom(id);
            return res.json(deleteOne);
        } catch (e) {
            next(e);
            return;
        }
    }
);

export default router;
