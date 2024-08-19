"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    Foto: { type: String, required: true },
    number: { type: String, required: true },
    BedType: { type: String, required: true },
    Facilities: Array,
    Rate: { type: Number, required: true },
    OfferPrice: { type: Number, required: true },
    Status: { type: String, required: true },
    RoomFloor: { type: String, required: true },
});
const RoomModel = (0, mongoose_1.model)("Room", roomSchema);
exports.default = RoomModel;
