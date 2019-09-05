const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MongoDbUri')

const connectDb = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log('Database Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb