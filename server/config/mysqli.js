const mysql = require('mysql');

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "asa_farma"
})

if(!conn) {
    console.error('error : ', conn);
}

module.exports = conn;