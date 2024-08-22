import { connection } from "./db"



export async function insertDb(table: string, obj: object): Promise<number> {
    const query = `INSERT INTO ${table} SET ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, obj, (err, results: any) => {
            if (err) {
                console.error('Error al insertar el objeto:', err);
                reject(err);
                return;
            }
            console.log('Objeto insertado correctamente, ID:', results.insertId);
            resolve(results.insertId);
            return results.insertId
        });
    });
}


export async function insertRoomImg(room_id: number, image_id: string) {
    const query = `INSERT INTO rooms_images (room_id, image_id) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [room_id, image_id], (err, results: any) => {
            if (err) {
                console.error('Error al insertar en rooms_images:', err);
                reject(err);
                return;
            }
            console.log('Relacion insertada correctamente en rooms_images');
            resolve(results.insertId);
        });
    });
}

