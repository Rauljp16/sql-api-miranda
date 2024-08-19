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
const contactServices_1 = require("../services/contactServices");
const router = (0, express_1.Router)();
router.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield (0, contactServices_1.allContact)();
    return res.json({ contact });
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newContact = (0, contactServices_1.createContact)(body);
        return res.json({ newContact });
    }
    catch (e) {
        next(e);
        return;
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const contact = yield (0, contactServices_1.contactById)(id);
        return res.json({ contact });
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
        const update = yield (0, contactServices_1.updateContact)(id, body);
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
        const deleteOne = yield (0, contactServices_1.deleteContact)(id);
        return res.json(deleteOne);
    }
    catch (e) {
        next(e);
        return;
    }
}));
exports.default = router;
