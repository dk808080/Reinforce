const mongoose = require('mongoose')
const { Schema } = mongoose


const quizSchema = new Schema({
    facultyRegistrationNumber: {
        type: String,
        required: true,
    },
    facultyName: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    questions: [
        {
            question: String,
            optionA: String,
            optionB: String,
            optionC: String,
            optionD: String,
            correctAnswer: String,
        }
    ]

})


module.exports = mongoose.model('quiz', quizSchema)
