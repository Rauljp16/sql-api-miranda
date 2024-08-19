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
const express_1 = require("express");
const userServices_1 = require("../services/userServices");
const router = (0, express_1.Router)();
router.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userServices_1.allUsers)();
    console.log(users);
    return res.json({ users });
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield (0, userServices_1.createUser)(body);
        return res.json({ newUser });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, userServices_1.userById)(id);
        return res.json({ user });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.patch("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const update = yield (0, userServices_1.updateUser)(id, body);
        return res.json({ update });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteOne = yield (0, userServices_1.deleteUser)(id);
        return res.json(deleteOne);
    }
    catch (e) {
        next(e);
        return;
    }
}));
exports.default = router;
