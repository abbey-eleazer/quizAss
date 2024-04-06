const express = require('express')
const  morgan  = require('morgan')
require('dotenv').config()
const db_connection = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//PORT
const PORT = process.env.PORT || 8900

//conect to db
db_connection()

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

app.post('/', (req, res) => {
  res.send({message: 'Api is Working'})
})

app.use('/api/v1/', require('./routes/userRoutes'))


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bgWhite))
