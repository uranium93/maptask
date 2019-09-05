const express = require('express')
const connectDb = require('./config/db')
const path = require('path')

// init the express App
const app = express();

// Connect to database
connectDb()

// use integrated bodyParser in express
app.use(express.json({ extended: false }))

// Define Routers in the router/api folder
app.use('/api/user', require('./router/api/user'))
app.use('/api/locations', require('./router/api/locations'))

// open port 5000 in development and port env.PORT n heroku
const PORT = process.env.PORT || 5000

// render the index react app when we are on production
if (process.env.NODE_ENV === "production") {
    //make a static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Evry things will be passed from this entery LOL
app.listen(PORT, () => console.log(`connected on port ${PORT}`))
