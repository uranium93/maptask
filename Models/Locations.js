const mongoose = require('mongoose')

const LocationsSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    location: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        default: "No Discription ..."
    }
})

module.exports = Locations = mongoose.model('locations', LocationsSchema)