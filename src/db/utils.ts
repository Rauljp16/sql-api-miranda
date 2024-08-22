import { connection } from "./db"


export async function insertDb(table: string, obj: object[]) {
    let tableId = 0
    console.log("tableId antes" + tableId);

    const sql =
        `INSERT INTO ${table} SET ?`;
    `INSERT INTO rooms_images (room_id, image_id)
    VALUES (LAST_INSERT_ID(), (SELECT _id FROM images WHERE _id = ?))`;
    connection.query(sql, obj, (err, results: any) => {
        if (err) {
            console.error('Error al insertar el objeto:', err);
            return;
        }
        tableId = results.insertId;
        console.log("results" + results);
    })
    console.log("tableId despues" + tableId);
};



