import mysql from 'mysql'

// export const db = mysql.createConnection({
//     connectionLimit: 10,
//     host: "sql12.freesqldatabase.com",
//     user: "sql12674184",
//     password: "shIgTmXsST",
//     database: "sql12674184",
//     port:"3306"
// })
// export const db = mysql.createConnection({
//     connectionLimit: 10,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port:process.env.DB_PORT
// })
export const db = mysql.createConnection({
    connectionLimit: 10,
    host: "bzmdlqdxndep6fxun3rt-mysql.services.clever-cloud.com",
    user: "uab0wddnpmjmmqhc",
    password: "Vlr0hKw6DbqSFAzlawT1",
    database: "bzmdlqdxndep6fxun3rt",
    port:"3306"
})


db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});