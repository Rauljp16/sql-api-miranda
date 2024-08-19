import { Router, Request, Response, NextFunction } from "express";
import {
    allBookings,
    bookingById,
    createBooking,
    updateBooking,
    deleteBooking,
} from "../services/bookingServices";

const router = Router();

router.get("/", async (_req: Request, res: Response, _next: NextFunction) => {
    const bookings = await allBookings();
    return res.json({ bookings });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newBooking = createBooking(body);
        return res.json({ newBooking });
    } catch (e) {
        next(e);
        return;
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const booking = await bookingById(id);

        return res.json({ booking });
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
            const update = await updateBooking(id, body);
            return res.json({ update });
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
            const deleteOne = await deleteBooking(id);
            return res.json(deleteOne);
        } catch (e) {
            next(e);
            return;
        }
    }
)

export default router;
