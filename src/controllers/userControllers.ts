import { Router, Request, Response, NextFunction } from "express";
import {
    allUsers,
    userById,
    createUser,
    updateUser,
    deleteUser,
} from "../services/userServices";

const router = Router();

router.get("/", async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await allUsers();
    console.log(users);
    return res.json({ users });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newUser = await createUser(body);
        return res.json({ newUser });
    } catch (e) {
        next(e);
        return;
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const user = await userById(id);

        return res.json({ user });
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
            const update = await updateUser(id, body);
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
            const deleteOne = await deleteUser(id);
            return res.json(deleteOne);
        } catch (e) {
            next(e);
            return;
        }
    }
);

export default router;
