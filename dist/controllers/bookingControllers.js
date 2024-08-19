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
const bookingServices_1 = require("../services/bookingServices");
const router = (0, express_1.Router)();
router.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, bookingServices_1.allBookings)();
    return res.json({ bookings });
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBooking = (0, bookingServices_1.createBooking)(body);
        return res.json({ newBooking });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield (0, bookingServices_1.bookingById)(id);
        return res.json({ booking });
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
        const update = yield (0, bookingServices_1.updateBooking)(id, body);
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
        const deleteOne = yield (0, bookingServices_1.deleteBooking)(id);
        return res.json(deleteOne);
    }
    catch (e) {
        next(e);
        return;
    }
}));
exports.default = router;
