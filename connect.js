import mysql from 'mysql';

export const db = mysql.createConnection({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "9901",
    database: "social",
    port:"3306"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});