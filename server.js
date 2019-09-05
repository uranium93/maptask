const express = require('express')
const connectDb = require('./config/db')

// init the express App
const app = express();

// Connect to database
connectDb()

// use integrated bodyParser in express
app.use(express.json({ extended: false }))

// Define Routers in the router/api folder
app.use('/api/user', require('./router/api/user'))
app.use('/api/locations', require('./router/api/locations'))

// open port 5000 in development and port env.PORT in heroku
const PORT = process.env.PORT || 5000

// Evry things will be passed from this entery LOL
app.listen(PORT, () => console.log(`connected on port ${PORT}`))
