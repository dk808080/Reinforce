const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/node-mailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

//validations 
const validateStudentLoginInput = require("../validations/studentLogin");
const validateSubmitQuizInput = require("../validations/submitQuiz");
const validateForgotPassword = require("../validations/forgotPassword");
const validateOTP = require("../validations/otpValidation");

//model
const Student = require("../models/student");
const Quiz = require("../models/quiz");

module.exports = {
    /*  
        Purpose = to login into a student account 
        Input = registration number and password 
        Output = jwt token inside a cookie
    */
    studentLoginFunc: async (req, res, next) => {
        try {
            const { errors, isValid } = validateStudentLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const student = await Student.findOne({ registrationNumber })
            if (!student) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, student.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            student.password = undefined;
            student.quizzes = undefined;
            const token = jwt.sign(student.toJSON(), process.env.JWT_SECRET);
            // console.log(token);

            return res.status(200).json({
                status: 'success',
                user: student,
                jwt: token,
              });
        }
        catch (err) {
            res.status(401).json({ message: `Invalid request", ${err.message}` })
        }

    },

    /*  
       Purpose = to get all pending quizzes
       Input = registration Number
       Output = Array containing all pending quizzes
   */
    getPendingQuizzesFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber }, { _id: 0, password: 0 });
                if (student.length === 0) {
                    return res.status(404).json({ message: "No student found for given registration number" })
                }
                var quizzesResult = [];
                for (var i = 0; i < student.quizzes.length; i++) {
                    if (student.quizzes[i].status === "pending") {
                        const quiz = await Quiz.findOne({ _id: student.quizzes[i].quiz });
                        //console.log(quiz);
                        quizzesResult.push(quiz);
                    }
                }
                res.status(200).json({
                    result: quizzesResult.sort(function (a, b) {
                        return b.datePosted - a.datePosted;
                    })
                })
            } else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
        Purpose = to get all completed quizzes
        Input = registration Number
        Output = Array containing all completed quizzes
    */
    getCompletedQuizzesFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber }, { _id: 0, password: 0 });
                if (student.length === 0) {
                    return res.status(404).json({ error: "No student found for given registration number" })
                }
                var quizzesResult = [];
                for (var i = 0; i < student.quizzes.length; i++) {
                    if (student.quizzes[i].status === "completed") {
                        const quiz = await Quiz.findOne({ _id: student.quizzes[i].quiz });
                        //console.log(quiz);
                        const item = {
                            quiz: quiz,
                            score: student.quizzes[i].score,
                            totalMarks: student.quizzes[i].totalMarks,
                            dateSubmitted: student.quizzes[i].dateSubmitted
                        }
                        quizzesResult.push(item);
                    }
                }
                res.status(200).json({
                    result: quizzesResult.sort(function (a, b) {
                        return b.dateSubmitted - a.dateSubmitted;
                    })
                })
            } else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },

    /*  
       Purpose = to submit a quiz
       Input = registration Number, quizId, score and totalMarks
       Output = Email for successfully submission of quiz will be sent to student with his score
   */
    submitQuizFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const { errors, isValid } = validateSubmitQuizInput(req.body);
                // Check Validation
                if (!isValid) {
                    return res.status(400).json(errors);
                }
                const { quizId, score, totalMarks } = req.body;
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber }, { password: 0 });
                if (!student) {
                    return res.status(404).json({ error: "No student found for given registration number" })
                }
                // console.log(student);
                for (var i = 0; i < student.quizzes.length; i++) {
                    if (student.quizzes[i].quiz.toString() === quizId) {
                        if (student.quizzes[i].status === "completed") {
                            return res.status(400).json({ error: "You can only attemp quiz once" })
                        }
                        student.quizzes[i].score = score;
                        student.quizzes[i].totalMarks = totalMarks;
                        student.quizzes[i].status = "completed";
                        student.quizzes[i].dateSubmitted = new Date();
                        await student.save();
                    }
                }
                const quiz = await Quiz.findOne({ _id: quizId });
                var htmlToSend = `<div><h3>${quiz.purpose} has been sumttied for ${quiz.subjectCode}</h3><p>Quiz was posted By : ${quiz.facultyRegistrationNumber} || ${quiz.facultyName}</p><p>Department : ${quiz.department}</p><p>Semester : ${quiz.semester}</p> <p>Subject Code : ${quiz.subjectCode}</p><h4>Your Score : ${score}/${totalMarks}</h4></div>`;
                await sendEmail(student.email, "You submitted " + quiz.purpose + " for " + quiz.subjectCode, htmlToSend)
                res.status(200).json({ message: "Quiz submitted successfully and your score is " + score });
            } else {
                throw new Error("Only student can submit quiz");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
    /*
        Purpose = To sent OTP for password reset
        Input = email id
        Output = OTP will be sent to email which will be valid for 5 mins
    */
    forgotPasswordFunc: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const student = await Student.findOne({ email })
            if (!student) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(404).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            student.otp = OTP
            await student.save()
            var htmlToSend = `<div><h4>OTP to reset your Reinforce password is : ${OTP}</h4><p>This OTP will be valid for 5 minutes</p></div>`;
            await sendEmail(student.email, "OTP to reset Reinforce password", htmlToSend)
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                student.otp = ""
                await student.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` });
        }
    },
    /*
        Purpose = To reset the password 
        Input = email id, otp, new password and confirm password
        Output = new password will be stored after hashing 
    */
    resetPasswordFunc: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const student = await Student.findOne({ email });
            if (student.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            student.password = hashedPassword;
            await student.save()
            return res.status(200).json({ message: "Password Changed" });
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` });
        }
    },
};