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
exports.deleteRoom = exports.updateRoom = exports.createRooms = exports.createRoom = exports.roomById = exports.allRooms = void 0;
const roomModel_1 = __importDefault(require("../models/roomModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const allRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRooms = yield roomModel_1.default.find();
    return allRooms;
});
exports.allRooms = allRooms;
const roomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield roomModel_1.default.findById(id);
    if (!room) {
        throw new Error("Cannont find rooms");
    }
    return room;
});
exports.roomById = roomById;
const createRoom = (room) => {
    const newRoom = new roomModel_1.default(room);
    newRoom.save();
    return newRoom;
};
exports.createRoom = createRoom;
const createRooms = (rooms) => __awaiter(void 0, void 0, void 0, function* () {
    const createdRooms = yield roomModel_1.default.insertMany(rooms);
    return createdRooms;
});
exports.createRooms = createRooms;
const updateRoom = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const updatedRoom = yield roomModel_1.default.findOneAndUpdate({ _id: objectId }, body, { new: true });
    return updatedRoom;
});
exports.updateRoom = updateRoom;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const delRoom = yield roomModel_1.default.findByIdAndDelete(objectId);
    return delRoom;
});
exports.deleteRoom = deleteRoom;
