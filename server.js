const express = require("express")
require('dotenv').config({ path: './config/config.env'})
const bootcamps = require('./routes/bootcamps')
const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dev logging middelware

if (process.env.NODE_ENV === "development") {
  app.use(logger)
  app.use(morgan('dev'))
}



// Mount routers
app.use('/api/v1/bootcamps', bootcamps)


const port = process.env.PORT || 8080

const server = app.listen(port, ()=>{
  console.log(`Server is running in ${process.env.NODE_ENV} mode on: http://localhost:${server.address().port}`.yellow.bold)
})

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red.bold)
  // close server and exit process
  server.close(() => process.exit(1))

})