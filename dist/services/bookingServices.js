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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBookings = exports.createBooking = exports.bookingById = exports.allBookings = void 0;
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const allBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield bookingModel_1.default.find();
    return allBookings;
});
exports.allBookings = allBookings;
const bookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findById(id);
    if (!booking) {
        throw new Error("Cannont find bookings");
    }
    return booking;
});
exports.bookingById = bookingById;
const createBooking = (booking) => {
    const newBooking = new bookingModel_1.default(booking);
    newBooking.save();
    return newBooking;
};
exports.createBooking = createBooking;
const createBookings = (bookings) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBookings = yield bookingModel_1.default.insertMany(bookings);
    return createdBookings;
});
exports.createBookings = createBookings;
const updateBooking = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const updatedBooking = yield bookingModel_1.default.findOneAndUpdate({ _id: objectId }, body, { new: true });
    return updatedBooking;
});
exports.updateBooking = updateBooking;
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const delBooking = yield bookingModel_1.default.findByIdAndDelete(objectId);
    return delBooking;
});
exports.deleteBooking = deleteBooking;
