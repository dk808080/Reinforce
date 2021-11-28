const mongoose = require('mongoose')
const { Schema } = mongoose


const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    otp: {
        type: String
    }
})


module.exports = mongoose.model('faculty', facultySchema)
