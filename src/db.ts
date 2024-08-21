
import mysql from 'mysql2';
import "dotenv/config";

const mysqlUri = {
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "hotel_miranda"
};

export const connection = mysql.createConnection(mysqlUri);

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL: ' + err.stack);
        return;
    }
    console.log('Conexión a MySQL establecida.');
});
