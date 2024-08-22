import { Iroom } from "../types/global";
import { connection } from "../db/db";
import { insertDb, insertRoomImg } from "../db/utils";

export const allRooms = async (): Promise<Iroom[]> => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM rooms", (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results as Iroom[]);
            }
        });
    });
};

export const roomById = async (id: string): Promise<Iroom | undefined> => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM rooms WHERE _id = ?",
            parseInt(id),
            (error, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0] as Iroom);
                }
            }
        );
    });
};

export const createRooms = async (rooms: Iroom[]) => {
    await Promise.all(
        rooms.map(async (room: any) => {
            const id = await insertDb("rooms", room);
            console.log("Room ID:", id);

            await insertRoomImg(id, room.Foto);
            console.log("Imagen ID:", room.Foto);
        })
    );

    console.log(
        "Todas las habitaciones y sus imágenes relacionadas se han insertado correctamente."
    );
};

export const updateRoom = async (
    id: string,
    body: Partial<Iroom>
): Promise<Iroom | null> => {
    const updates = Object.entries(body)
        .map(([key, _value]) => `${key} = ?`)
        .join(", ");

    const values = [...Object.values(body), id];

    const query = `UPDATE rooms SET ${updates} WHERE _id = ?`;

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

export const deleteRoom = async (_id: string): Promise<Iroom | null> => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM rooms WHERE _id = ?",
            [_id],
            (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ _id } as Iroom);
                }
            }
        );
    });
};
