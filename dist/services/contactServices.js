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
exports.deleteContact = exports.updateContact = exports.createContacts = exports.createContact = exports.contactById = exports.allContact = void 0;
const contactModel_1 = __importDefault(require("../models/contactModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const allContact = () => __awaiter(void 0, void 0, void 0, function* () {
    const allContact = yield contactModel_1.default.find();
    return allContact;
});
exports.allContact = allContact;
const contactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contactModel_1.default.findById(id);
    if (!contact) {
        throw new Error("Cannont find contact");
    }
    return contact;
});
exports.contactById = contactById;
const createContact = (contact) => {
    const newContact = new contactModel_1.default(contact);
    newContact.save();
    return newContact;
};
exports.createContact = createContact;
const createContacts = (contacts) => __awaiter(void 0, void 0, void 0, function* () {
    const createdContacts = yield contactModel_1.default.insertMany(contacts);
    return createdContacts;
});
exports.createContacts = createContacts;
const updateContact = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const updatedContact = yield contactModel_1.default.findOneAndUpdate({ _id: objectId }, body, { new: true });
    return updatedContact;
});
exports.updateContact = updateContact;
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const delContact = yield contactModel_1.default.findByIdAndDelete(objectId);
    return delContact;
});
exports.deleteContact = deleteContact;
