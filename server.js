const express = require('express');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors')
const connectDB = require('./config/dbConn.js')
const mongoose = require('mongoose')
const allowedOrigins = require('./config/allowedOrigins.js')

mongoose.set('strictQuery', true);

connectDB()

app.use(
  cors({
    origin: { allowedOrigins },
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'OPTIONS', 'HEAD', 'DELETE'],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//endpoints
app.use('/users', require('./routes/userRoutes.js'))
app.use('/auth', require('./routes/authRoutes.js'))
app.use('/messages', require('./routes/messagesRoutes.js'))

// wrong endpoints 
app.all('*', (req, res) => {
  res.status(404).json({message:"Not found!!"})
 
})

mongoose.connection.once('open', () => {
  console.log(process.env.NODE_ENV)
  console.log('connected to mongo db')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})