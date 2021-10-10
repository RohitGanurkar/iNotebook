const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')

connectToMongo();

console.log("hello RAHUL");


const app = express()
const port = 5000

app.use(express.json()); // auth.js me app.body ko use karne k liye middleware use krna pdta hai vha ye use hota hai

// for fix npm core error
app.use(cors())

// Avaliable routes -->
app.use('/api/auth' , require('./routers/auth'))
app.use('/api/note' , require('./routers/note'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
