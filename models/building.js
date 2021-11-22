const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema({
    street: {
        type: String, 
        required: true
    },
    addressNumber: {
        type: Number,
        required:true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    }
})


module.exports = mongoose.model('Building', buildingSchema)