"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    Name: { type: String, required: true },
    OrderDate: { type: String, required: true },
    CheckIn: { type: String, required: true },
    CheckOut: { type: String, required: true },
    SpecialRequest: { type: String, required: true },
    RoomType: { type: String, required: true },
    RoomNumber: { type: String, required: true },
    Status: { type: String, required: true },
});
const BookingModel = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = BookingModel;
