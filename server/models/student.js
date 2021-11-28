const mongoose = require('mongoose')
const { Schema } = mongoose


const studentSchema = new Schema({
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
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'subject'
        }
    ],
    gender: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    quizzes: [
        {
            quiz: {
                type: Schema.Types.ObjectId
            },
            score: {
                type: Number,
                default: -1
            },
            totalMarks: {
                type: Number,
                default: -1
            },
            dateSubmitted: {
                type: Date
            },
            status: {
                type: String,
                default: "pending"
            }
        }
    ],
    otp: {
        type: String
    }

})

module.exports = mongoose.model('student', studentSchema)




