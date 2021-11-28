const mongoose = require('mongoose')
const { Schema } = mongoose


const adminSchema = new Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    otp: {
        type: String,
    }

})


module.exports = mongoose.model('admin', adminSchema)
