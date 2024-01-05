import mysql from 'mysql'

export const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});