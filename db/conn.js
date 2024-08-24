const mysql = require('mysql')
require('dotenv').config()

const connectDB = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connectDB.connect((err) => {
    console.log("HOST:", DB_HOST)
    console.log("DB:", DB_DATABASE)
    if (!err)
        console.log('MySql Connected Successfully!')
    else
        console.log('Something Wrong Error => ' + err)
})

module.exports = connectDB