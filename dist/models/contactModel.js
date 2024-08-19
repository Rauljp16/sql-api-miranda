"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    asunto: { type: String, required: true },
    comment: { type: String, required: true },
});
const ContactModel = (0, mongoose_1.model)("Contact", contactSchema);
exports.default = ContactModel;
