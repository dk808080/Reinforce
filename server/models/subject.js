const mongoose = require('mongoose')
const { Schema } = mongoose


const subjectSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    totalLectures: {
        type: Number,
        default:30
    },
    year: {
        type: String,
        required: true 
    },
    semester: {
        type: String,
        required: true 
    },
})


module.exports = mongoose.model('subject', subjectSchema)

