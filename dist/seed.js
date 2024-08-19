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
exports.createRandomBooking = exports.createRandomContact = exports.createRandomRoom = exports.createRandomUsers = exports.run = void 0;
//import { createUsers } from "./services/userServices";
//import { createRooms } from "./services/roomServices";
//import { createContacts } from "./services/contactServices";
//import { createBookings } from "./services/bookingServices";
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
run().catch((err) => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URL);
            //createUsers(createRandomUsers(5));
            //createRooms(createRandomRoom(2));
            //createContacts(createRandomContact(5));
            //createBookings(createRandomBooking(10));
        }
        catch (error) {
            console.error("Error in run function:", error);
        }
    });
}
exports.run = run;
function createRandomUsers(count) {
    const generateDescription = (name) => {
        const activities = [
            "es un cliente habitual",
            "ha estado con nosotros desde",
            "le gusta visitar",
            "siempre disfruta de nuestras instalaciones en",
            "es conocido por su amabilidad en"
        ];
        const place = faker_1.faker.location.city();
        const adjective = faker_1.faker.word.adjective();
        return `${name} ${activities[Math.floor(Math.random() * activities.length)]} ${place}. Es ${adjective}.`;
    };
    const name = faker_1.faker.person.fullName();
    const userGenerator = () => ({
        foto: faker_1.faker.image.avatarGitHub(),
        name: name,
        startDate: faker_1.faker.date.past().toISOString().split('T')[0],
        description: generateDescription(name),
        email: faker_1.faker.internet.email(),
        contact: faker_1.faker.phone.number(),
        status: faker_1.faker.helpers.arrayElement(["INACTIVE", "ACTIVE"]),
        password: faker_1.faker.internet.password(),
    });
    const users = Array.from({ length: count }, userGenerator);
    return users;
}
exports.createRandomUsers = createRandomUsers;
function createRandomRoom(count) {
    const userGenerator = () => ({
        Foto: faker_1.faker.image.urlLoremFlickr({ category: 'hotel-rooms' }),
        number: faker_1.faker.string.binary(),
        BedType: faker_1.faker.word.words(),
        Facilities: faker_1.faker.helpers.arrayElements([
            "TV",
            "WiFi",
            "Baño privado",
            "Aire acondicionado",
            "Minibar",
        ]),
        Rate: faker_1.faker.number.int({ min: 10, max: 100 }),
        OfferPrice: faker_1.faker.number.int({ min: 10, max: 100 }),
        Status: faker_1.faker.helpers.arrayElement(["Booked", "Available"]),
        RoomFloor: "Floor A-1",
    });
    const rooms = Array.from({ length: count }, userGenerator);
    return rooms;
}
exports.createRandomRoom = createRandomRoom;
function createRandomContact(count) {
    const userGenerator = () => ({
        date: faker_1.faker.date.month(),
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        asunto: faker_1.faker.word.words(),
        comment: faker_1.faker.lorem.paragraph(),
    });
    const contacts = Array.from({ length: count }, userGenerator);
    return contacts;
}
exports.createRandomContact = createRandomContact;
function createRandomBooking(count) {
    const userGenerator = () => ({
        Name: faker_1.faker.person.fullName(),
        OrderDate: faker_1.faker.date.weekday(),
        CheckIn: faker_1.faker.date.weekday(),
        CheckOut: faker_1.faker.date.weekday(),
        SpecialRequest: faker_1.faker.word.words(2),
        RoomType: faker_1.faker.word.words(2),
        RoomNumber: faker_1.faker.string.numeric(3),
        Status: faker_1.faker.helpers.arrayElement(["in progress", "checkin", "checkout"]),
    });
    const bookings = Array.from({ length: count }, userGenerator);
    return bookings;
}
exports.createRandomBooking = createRandomBooking;
