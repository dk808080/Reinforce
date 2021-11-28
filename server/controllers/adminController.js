const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/node-mailer");
require("dotenv").config();

//validations 

const validateAdminRegisterInput = require('../validations/adminRegister')
const validateFacultyRegisterInput = require('../validations/facultyRegister')
const validateStudentRegisterInput = require('../validations/studentRegister')
const validateAdminLoginInput = require('../validations/adminLogin')
const validateSubjectRegisterInput = require('../validations/subjectRegister')
const validateForgotPassword = require("../validations/forgotPassword");
const validateOTP = require("../validations/otpValidation");

//models

const Admin = require("../models/admin");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Subject = require("../models/subject");


module.exports = {
    /*  
      Purpose = to login into a admin account 
      Input = registration number and password 
      Output = jwt token inside a cookie
  */
    adminLoginFunc: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAdminLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const admin = await Admin.findOne({ registrationNumber })
            if (!admin) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, admin.password)

            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(400).json(errors);
            }

            admin.password = undefined;
            const token = jwt.sign(admin.toJSON(), process.env.JWT_SECRET);
            console.log(typeof(token));
            return res.status(200).json({
                status: 'success',
                user: admin,
                jwt: token,
              });
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to add a new admin
       Input = name, email, department, avatar, contactNumber and dob.
       Output = new admin with given info will be added
   */
    addAdminFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const { errors, isValid } = validateAdminRegisterInput(req.body);
                if (!isValid) {
                    return res.status(400).json(errors)
                }
                const { name, email, gender,
                    dob, department, contactNumber, avatar } = req.body
                const admin = await Admin.findOne({ email })
                if (admin) {
                    errors.email = "Email already exist"
                    return res.status(400).json(errors)
                }
                let departmentHelper;
                if (department === "CSE") {
                    departmentHelper = 100
                }
                else if (department === "ECE") {
                    departmentHelper = 200
                }
                else if (department === "EEE") {
                    departmentHelper = 300
                }

                const admins = await Admin.find({ department })
                let helper = (admins.length + departmentHelper).toString();

                let hashedPassword;
                hashedPassword = await bcrypt.hash(dob, 10)
                var components = [
                    "ADM",
                    helper
                ];

                var registrationNumber = components.join("");
                const newAdmin = await new Admin({
                    name,
                    email,
                    password: hashedPassword,
                    registrationNumber,
                    department,
                    avatar,
                    contactNumber,
                    dob,
                    gender
                })
                await newAdmin.save()
                res.status(200).json({ result: newAdmin })
            } else {
                throw new Error("only admins can add new admins");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to get data of all available admins
       Output = Array containing data of all available admins
   */
    getAllAdminsFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const admins = await Admin.find({}, { _id: 0 })
                if (admins.length === 0) {
                    return res.status(404).json({ message: "No admins found" })
                }
                res.status(200).json({ result: admins })
            } else {
                throw new Error("Only admins can get all admins");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to add a new student
       Input = name, email, gender, department, avatar, dob, contactNumber, year and semester
       Output = new student with given info will be added
   */
    addStudentFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const { errors, isValid } = validateStudentRegisterInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors)
                }
                const { name, email, gender, department, avatar, dob, contactNumber, year, semester, } = req.body

                const student = await Student.findOne({ email })
                if (student) {
                    errors.email = "Email already exist"
                    return res.status(400).json(errors)
                }
                let departmentHelper;
                if (department === "CSE") {
                    departmentHelper = 100;
                }
                else if (department === "ECE") {
                    departmentHelper = 200;
                }
                else {
                    departmentHelper = 300;
                }

                const students = await Student.find({ department })
                let helper = (students.length + departmentHelper).toString();
                let hashedPassword;
                hashedPassword = await bcrypt.hash(dob, 10)
                var components = [
                    "STU",
                    helper
                ];

                var registrationNumber = components.join("");
                const newStudent = await new Student({
                    registrationNumber,
                    name,
                    email,
                    password: hashedPassword,
                    gender,
                    department,
                    avatar,
                    dob,
                    contactNumber,
                    year,
                    semester
                })
                await newStudent.save()
                const subjects = await Subject.find({ department, semester })
                if (subjects.length !== 0) {
                    for (var i = 0; i < subjects.length; i++) {
                        newStudent.subjects.push(subjects[i]._id)
                    }
                }
                await newStudent.save()
                res.status(200).json({ result: newStudent })
            } else {
                throw new Error("Only admins can add students");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to get data of all available students
       Output = Array containing data of all available students
   */
    getAllStudentsFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin" || req.userType === "student") {
                const students = await Student.find({}, { _id: 0 })
                if (students.length === 0) {
                    return res.status(404).json({ message: "No students found" })
                }
                res.status(200).json({ result: students })
            } else {
                throw new Error("Only admins and students can get all students");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
    /*  
       Purpose = to add a new faculty
       Input = name, email, gender, department, avatar, dob, contactNumber and designation
       Output = new faculty with given info will be added
   */
    addFacultyFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const { errors, isValid } = validateFacultyRegisterInput(req.body)
                //Validation
                if (!isValid) {
                    return res.status(400).json(errors)
                }
                const { name, email, designation, department, contactNumber, dob, gender, avatar } = req.body
                const faculty = await Faculty.findOne({ email })
                if (faculty) {
                    errors.email = 'Email already exist'
                    return res.status(400).json(errors)
                }
                let departmentHelper;
                if (department === "CSE") {
                    departmentHelper = 100;
                }
                else if (department === "ECE") {
                    departmentHelper = 200;
                }
                else {
                    departmentHelper = 300;
                }
                const faculties = await Faculty.find({ department })
                let helper = (faculties.length + departmentHelper).toString();
                let hashedPassword;
                hashedPassword = await bcrypt.hash(dob, 10)
                var components = [
                    "FAC",
                    helper
                ];

                var registrationNumber = components.join("");
                const newFaculty = await new Faculty({
                    name,
                    email,
                    designation,
                    password: hashedPassword,
                    department,
                    contactNumber,
                    gender,
                    avatar,
                    registrationNumber,
                    dob
                });
                await newFaculty.save()
                res.status(200).json({ result: newFaculty })
            } else {
                throw new Error("Only admins can add faculty");
            }
        }
        catch (err) {
            console.log("error", err.message)
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to get data of all available faculties
       Output = Array containing data of all available faculties
   */
    getAllFacultyFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin" || req.userType === "student") {
                const faculties = await Faculty.find({}, { _id: 0 })
                if (faculties.length === 0) {
                    return res.status(404).json({ message: "No Record Found" })
                }
                res.status(200).json({ result: faculties })
            } else {
                throw new Error("Only admins and students can get all faculties");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
       Purpose = to add a new subject
       Input =  subjectCode, subjectName, department, year,semester and totalLectures.            
       Output = Array containing data of all available admins
   */
    addSubjectFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const { errors, isValid } = validateSubjectRegisterInput(req.body)
                //Validation
                if (!isValid) {
                    return res.status(400).json(errors)
                }
                const { totalLectures, department, subjectCode,
                    subjectName, year, semester } = req.body
                const subject = await Subject.findOne({ subjectCode })
                if (subject) {
                    errors.subjectCode = "Given Subject is already added"
                    return res.status(400).json(errors)
                }
                const newSubject = await new Subject({
                    totalLectures,
                    department,
                    subjectCode,
                    subjectName,
                    year,
                    semester
                })
                await newSubject.save()

                const students = await Student.find({ department, semester })
                if (students.length === 0) {
                    res.status(200).json({ newSubject })
                }
                else {
                    for (var i = 0; i < students.length; i++) {
                        students[i].subjects.push(newSubject._id)
                        await students[i].save()
                    }
                    res.status(200).json({ newSubject })
                }
            } else {
                throw new Error("Only admins can add subject");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
    /*  
       Purpose = to get data of all available subjects
       Output = Array containing data of all available subjects
   */
    getAllSubjectsFunc: async (req, res, next) => {
        try {
            if (req.userType === "admin") {
                const allSubjects = await Subject.find({}, { _id: 0 })
                if (!allSubjects) {
                    return res.status(404).json({ message: "You havent registered any subject yet." })
                }
                res.status(200).json({ result: allSubjects });
            } else {
                throw new Error("Only admins can get all subjects");
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
            const admin = await Admin.findOne({ email })
            if (!admin) {
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
            admin.otp = OTP
            await admin.save()
            var htmlToSend = `<div><h4>OTP to reset your Reinforce password is : ${OTP}</h4><p>This OTP will be valid for 5 minutes</p></div>`;
            await sendEmail(admin.email, "OTP to reset Reinforce password", htmlToSend)
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                admin.otp = ""
                await admin.save()
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
            const admin = await Admin.findOne({ email });
            if (admin.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            admin.password = hashedPassword;
            await admin.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
};