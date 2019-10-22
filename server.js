const express = require("express")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/',(req, res) => {
  res.send({caralho: "mano"})
})

const port = process.env.PORT || 8080

const server = app.listen(port, ()=>{
  console.log(`Server is running in ${process.env.NODE_ENV} mode on: http://localhost:${server.address().port}`)
})