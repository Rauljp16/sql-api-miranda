import { Iroom } from '../types/global';
import { connection } from "../db/db";
import { insertDb } from "../db/utils";
//import { insertDb } from "../db/utils";


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
        connection.query('SELECT * FROM rooms WHERE _id = ?', parseInt(id), (error, results: any) => {
            if (error) {
                reject(error);
            } else {
                // Asegurarse de que `results[0]` sea del tipo `Iroom`
                resolve(results[0] as Iroom);
            }
        });
    });
};

// Crear múltiples habitaciones metodo John con la function de utils
export const createRooms = async (rooms: Iroom[]) => {
    return new Promise((resolve) => {
        resolve(rooms);
        rooms.map((room: any) => {
            insertDb("rooms", room)
            console.log(room);
        })
    });
}

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
