import { Router, Request, Response, NextFunction } from "express";
import {
    allContact,
    contactById,
    createContact,
    updateContact,
    deleteContact,
} from "../services/contactServices";

const router = Router();

router.get("/", async (_req: Request, res: Response, _next: NextFunction) => {
    const contact = await allContact();
    return res.json({ contact });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newContact = createContact(body);
        return res.json({ newContact });
    } catch (e) {
        next(e);
        return;
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const contact = await contactById(id);

        return res.json({ contact });
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
            const update = await updateContact(id, body);
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
            const deleteOne = await deleteContact(id);
            return res.json(deleteOne);
        } catch (e) {
            next(e);
            return;
        }
    }
);

export default router;
