const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//Set Body Parser Middlewares.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Set Static Files
app.use(express.static('public'))

//Set Template Engine.
app.engine('.hbs' , exphbs.engine({ extname: '.hbs'}))
app.set('view engine' , 'hbs')

// Set routes middlewares.
const userRoute = require('./routes/user')
app.use('/api' , userRoute)

app.get('/' , (req, res)=>res.send("<h1>Server is running...</h1>"))

app.listen(port , ()=> console.log(`Node Server Started at ${port}`))