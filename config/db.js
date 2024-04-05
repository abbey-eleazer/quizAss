const mongoose = require('mongoose')
const colors = require('colors')

// CONNECTION EVENTS

const db_connection = async() => {

  try {
    await mongoose.connect(process.env.MONGODB_URL)   //connect to db
    console.log('Connected to MONGO DB'.bgCyan)

  } catch (error) {
     console.log('Connection failed'.bgRed)
     console.log(error)
  }
}

module.exports = db_connection