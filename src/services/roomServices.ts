import { Iroom } from "../types/global";
import { connection } from "../db/db";
import mysql from 'mysql2';


// Obtener todas las habitaciones
export const allRooms = async (): Promise<Iroom[]> => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM rooms', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results as Iroom[]);
            }
        });
    });
};

// Obtener habitación por ID
export const roomById = async (id: string): Promise<Iroom | undefined> => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM rooms WHERE id = ?', [id], (error, results: any) => {
            if (error) {
                reject(error);
            } else {
                // Asegurarse de que `results[0]` sea del tipo `Iroom`
                resolve(results[0] as Iroom);
            }
        });
    });
};

// Crear múltiples habitaciones
export const createRooms = async (rooms: Iroom[]): Promise<Iroom[]> => {
    const values = rooms.map((room) => [
        room.Foto,
        room.number,
        room.BedType,
        // room.Facilities,
        room.Rate,
        room.OfferPrice,
        room.Status,
        room.RoomFloor,
    ]);

    const placeholders = rooms.map(() => "(?,?,?,?,?,?)").join(", ");

    const query = `INSERT INTO rooms ( number, BedType, Rate, OfferPrice, Status, RoomFloor) VALUES ${placeholders}`;

    return new Promise((resolve, reject) => {
        connection.query(query, values.flat(), (err, results) => {
            if (err) {
                console.error("Error al insertar: " + err.stack);
                reject(err);
            } else {
                console.log("Habitaciones insertadas:", results);
                console.log("resolve room:" + rooms);
                console.log("este es el ID:" + results);
                resolve(rooms);
            }
        });
    });
};

// Actualizar una habitación
export const updateRoom = async (
    id: string,
    body: Partial<Iroom>
): Promise<Iroom | null> => {
    const updates = Object.entries(body)
        .map(([key, _value]) => `${key} = ?`)
        .join(", ");

    const values = [...Object.values(body), id];

    const query = `UPDATE rooms SET ${updates} WHERE id = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results: any) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows > 0) {
                    resolve({ ...body, id } as Iroom);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

// Eliminar una habitación
export const deleteRoom = async (_id: string): Promise<Iroom | null> => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM rooms WHERE _id = ?', [_id], (error, results: any) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows > 0) {
                    resolve({ _id } as Iroom);
                } else {
                    resolve(null);
                }
            }
        });
    });
};
