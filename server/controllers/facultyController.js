const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/node-mailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//validations 
const validateFacultyLoginInput = require("../validations/facultyLogin");
const validateAddQuizInput = require("../validations/addQuiz");
const validateForgotPassword = require("../validations/forgotPassword");
const validateOTP = require("../validations/otpValidation");

//model
const Faculty = require("../models/faculty");
const Quiz = require("../models/quiz");
const Subject = require("../models/subject");
const Student = require("../models/student");

module.exports = {
    /*  
        Purpose = to login into a faculty account 
        Input = registration number and password 
        Output = jwt token inside a cookie
    */
    facultyLoginFunc: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const faculty = await Faculty.findOne({ registrationNumber })
            if (!faculty) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, faculty.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(400).json(errors);
            }

            faculty.password = undefined;
            const token = jwt.sign(faculty.toJSON(), process.env.JWT_SECRET);
            //console.log(token);

            return res.status(200).json({
                status: 'success',
                user: faculty,
                jwt: token,
              });
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to add a new quiz
       Input = facultyRegistrationNumber, facultyName, purpose, department, semester, subjectCode(String), questions
       Output = Quiz will be added for all the students of given department who are currently in given semester.
   */
    addQuizFunc: async (req, res, next) => {
        try {
            if (req.userType === "faculty") {
                const { errors, isValid } = validateAddQuizInput(req.body);

                // Check Validation
                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const { facultyRegistrationNumber, facultyName, purpose, department, semester, subjectCode, questions } = req.body;

                const faculty = await Faculty.findOne({ registrationNumber: facultyRegistrationNumber })

                if (!faculty) {
                    errors.registrationNumber = 'Registration number not found';
                    return res.status(404).json(errors);
                }

                const subject = await Subject.findOne({ subjectCode })
                if (!subject) {
                    errors.subjectCode = "Given Subject code does not exists"
                    return res.status(404).json(errors)
                }

                const newQuiz = await new Quiz({
                    facultyRegistrationNumber,
                    facultyName,
                    purpose,
                    department,
                    semester,
                    subjectCode,
                    questions,
                    datePosted: new Date()
                })
                //console.log(newQuiz);
                await newQuiz.save();
                const students = await Student.find({ department, semester })
                if (students.length === 0) {
                    res.status(404).json({ error: "No student found in given semester and department" })
                }
                else {
                    for (var i = 0; i < students.length; i++) {
                        const quizObj = {
                            quiz: newQuiz._id
                        }
                        students[i].quizzes.push(quizObj);
                        await students[i].save();
                        var htmlToSent = `<div><h3>${purpose} has been posted for ${subjectCode}</h3><p>Posted By : ${facultyRegistrationNumber} || ${facultyName}</p><p>Department : ${department}</p><p>Semester : ${semester}</p> <p>Subject Code : ${subjectCode}</p></div>`;
                        await sendEmail(students[i].email, purpose + " is posted for " + subjectCode, htmlToSent)
                    }
                    return res.status(200).json({ message: "quiz added successfully" });
                }
            } else {
                throw new Error("Only faculty can add quiz");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },

    /*  
      Purpose = to retrieve all quizzes posted by currently loggedin faculty in descending order of date posted
      Input = registration Number
      Output = Array containing all quizzes 
  */

    allQuizzesFunc: async (req, res, next) => {
        try {
            if (req.userType === "faculty") {
                const quizzes = await Quiz.find({ facultyRegistrationNumber: req.user.registrationNumber }).sort({ datePosted: -1 });
                if (quizzes.length === 0) {
                    return res.status(404).json({ message: "No quiz found" })
                }
                res.status(200).json({ result: quizzes })
            } else {
                throw new Error("Only faculty can get all quizes");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
     Purpose = to retrieve subject codes and subject names of availabe subjects 
     Output = Array containing all subject codes and subject names 
 */
    getSubjectCodesAndNamesFunc: async (req, res, next) => {
        try {
            if (req.userType === "faculty") {
                const subjects = await Subject.find({}, { subjectCode: 1, subjectName: 1, _id: 0 });
                if (subjects.length === 0) {
                    return res.status(404).json({ message: "No subjects found" })
                }
                res.status(200).json({ result: subjects })
            }
            else {
                throw new Error("Only faculty can get all subject codes");
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
            const faculty = await Faculty.findOne({ email })
            if (!faculty) {
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
            faculty.otp = OTP
            await faculty.save()
            var htmlToSend = `<div><h4>OTP to reset your Reinforce password is : ${OTP}</h4><p>This OTP will be valid for 5 minutes</p></div>`;
            await sendEmail(faculty.email, "OTP to reset Reinforce password", htmlToSend)
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                faculty.otp = ""
                await faculty.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
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
            const faculty = await Faculty.findOne({ email });
            if (faculty.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            faculty.password = hashedPassword;
            await faculty.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
};