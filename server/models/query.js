const mongoose = require('mongoose')
const { Schema } = mongoose


const querySchema = new Schema({
    askedBy: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    askedTo: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    isSolved: {
        type: Boolean,
        default:false
    },
    solution: {
        type:String
    },
    datePosted: {
        type:Date,
        required: true
    },
    dateSolved: {
        type:Date
    }
})

module.exports = mongoose.model('query', querySchema)
