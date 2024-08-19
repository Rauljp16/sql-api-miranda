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
const roomServices_1 = require("../services/roomServices");
const router = (0, express_1.Router)();
router.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield (0, roomServices_1.allRooms)();
    return res.json({ rooms });
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRoom = yield (0, roomServices_1.createRoom)(body);
        return res.json({ newRoom });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const room = yield (0, roomServices_1.roomById)(id);
        return res.json({ room });
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
        const updated = yield (0, roomServices_1.updateRoom)(id, body);
        return res.json({ updated });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteOne = yield (0, roomServices_1.deleteRoom)(id);
        return res.json(deleteOne);
    }
    catch (e) {
        next(e);
        return;
    }
}));
exports.default = router;
