//import { createUsers } from "./services/userServices";
//import { createRooms } from "./services/roomServices";
//import { createContacts } from "./services/contactServices";
//import { createBookings } from "./services/bookingServices";
import { faker } from "@faker-js/faker";
import { Icontact, Iroom, Iuser, Ibooking } from "./types/global";
import "dotenv/config";
import { RowDataPacket } from "mysql2";
import { connection } from "./db/db";

export async function run() {
    try {
        connection.connect((err) => {
            if (err) {
                console.log("Error de conexion: " + err);
                throw err;
            } else {
                console.log("Conexion a la base de datos exitosaa.");
            }
        });
        //createUsers(createRandomUsers(5));
        //createRooms(createRandomRoom(1));
        //createContacts(createRandomContact(5));
        //createBookings(createRandomBooking(10
    } catch (error) {
        console.error("Error in run function:", error);
    }
}
run().catch((err) => console.log(err));

connection.query(
    `SELECT
        r._id,
        r.number,
        r.RoomType,
        r.Rate,
        r.OfferPrice,
        r.Status,
        r.RoomFloor,
        GROUP_CONCAT(DISTINCT a.amenity) AS Amenities
    FROM
        rooms r
    LEFT JOIN
        rooms_amenities ra ON r._id = ra.room_id
    LEFT JOIN
        amenities a ON ra.amenity_id = a._id
    WHERE
        r._id = 7
    GROUP BY
        r._id, r.number, r.RoomType, r.Rate, r.OfferPrice, r.Status, r.RoomFloor`,
    (error, results) => {
        if (error) throw error;

        // Casteamos los resultados a RowDataPacket[]
        const rows = results as RowDataPacket[];

        // Procesamos los resultados para convertir Amenities a un array
        const processedResults = rows.map((row) => {
            return {
                ...row,
                Amenities: row.Amenities ? row.Amenities.split(",") : [], // Convertimos el string a array
            };
        });

        // Imprimimos los resultados procesados
        console.log("Resultados procesados: ", processedResults);
        connection.end();
    }
);

export function createRandomUsers(count: number): Iuser[] {
    const generateDescription = (name: string) => {
        const activities = [
            "es un cliente habitual",
            "ha estado con nosotros desde",
            "le gusta visitar",
            "siempre disfruta de nuestras instalaciones en",
            "es conocido por su amabilidad en",
        ];
        const place = faker.location.city();
        const adjective = faker.word.adjective();
        return `${name} ${activities[Math.floor(Math.random() * activities.length)]
            } ${place}. Es ${adjective}.`;
    };
    const name = faker.person.fullName();

    const userGenerator = (): Iuser => ({
        foto: faker.image.avatarGitHub(),
        name: name,
        startDate: faker.date.past().toISOString().split("T")[0],
        description: generateDescription(name),
        email: faker.internet.email(),
        contact: faker.phone.number(),
        status: faker.helpers.arrayElement(["INACTIVE", "ACTIVE"]),
        password: faker.internet.password(),
    });

    const users: Iuser[] = Array.from({ length: count }, userGenerator);

    return users;
}

export function createRandomRoom(count: number): Iroom[] {
    const userGenerator = (): Iroom => ({
        Foto: faker.number.int({ min: 1, max: 3 }),
        number: faker.number.int({ min: 1, max: 15 }),
        BedType: faker.number.int({ min: 1, max: 4 }),
        Amenities: faker.number.int({ min: 1, max: 5 }),
        // Facilities: JSON.stringify(faker.helpers.arrayElements([
        //     "TV",
        //     "WiFi",
        //     "Baño privado",
        //     "Aire acondicionado",
        //     "Minibar",
        // ])),
        Rate: faker.number.int({ min: 10, max: 100 }),
        OfferPrice: faker.number.int({ min: 10, max: 100 }),
        Status: faker.helpers.arrayElement(["Booked", "Available"]),
        RoomFloor: faker.number.int({ min: 1, max: 4 }),
    });
    const rooms: Iroom[] = Array.from({ length: count }, userGenerator);

    return rooms;
}

export function createRandomContact(count: number): Icontact[] {
    const userGenerator = (): Icontact => ({
        date: faker.date.month(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        asunto: faker.word.words(),
        comment: faker.lorem.paragraph(),
    });
    const contacts: Icontact[] = Array.from({ length: count }, userGenerator);

    return contacts;
}

export function createRandomBooking(count: number): Ibooking[] {
    const userGenerator = (): Ibooking => ({
        Name: faker.person.fullName(),
        OrderDate: faker.date.weekday(),
        CheckIn: faker.date.weekday(),
        CheckOut: faker.date.weekday(),
        SpecialRequest: faker.word.words(2),
        RoomType: faker.word.words(2),
        RoomNumber: faker.string.numeric(3),
        Status: faker.helpers.arrayElement(["in progress", "checkin", "checkout"]),
    });
    const bookings: Ibooking[] = Array.from({ length: count }, userGenerator);

    return bookings;
}
