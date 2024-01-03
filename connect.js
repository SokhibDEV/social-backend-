import mysql from 'mysql'

export const db = mysql.createConnection({
    connectionLimit: 10,
    host: "sql12.freesqldatabase.com",
    user: "sql12674184",
    password: "shIgTmXsST",
    database: "sql12674184",
    port:"3306"
})


db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});