const express = require("express");
const router = express.Router();

const { adminLoginFunc,  
        addAdminFunc, 
        getAllAdminsFunc, 
        addFacultyFunc, 
        getAllFacultyFunc, 
        addStudentFunc, 
        getAllStudentsFunc, 
        addSubjectFunc, 
        getAllSubjectsFunc,
        forgotPasswordFunc,
        resetPasswordFunc} = require("../controllers/adminController");
        
const { Authenticate } = require("../middlewares/auth");


 /**
* @swagger
*
* /api/admin/login:
*   post:
*     tags:
*       - Admin related routes
*     name: login a admin
*     summary: to login a admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             registrationNumber:
*               type: string
*             password:
*               type: string
*         required:
*           - registrationNumber
*           - password
*     responses:
*       200:
*         description: logged in successfully
*       404:
*         description: Registration number not found
*       401:
*         description: Unauthorized
*
*
* /api/admin/add-admin:
*   post:
*     tags:
*       - Admin related routes
*     name: to add a new admin
*     summary: to add a new admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             dob:
*               type: string
*             department:
*               type: string
*             contactNumber:
*               type: string
*             avatar:
*               type: string
*         required:
*           - name
*           - email
*           - gender
*           - dob
*           - department
*           - contactNumber
*           - avatar
*     responses:
*       200:
*         description: Added successfully
*       400:
*         description: Bad request
*
*
* /api/admin/add-faculty:
*   post:
*     tags:
*       - Admin related routes
*     name: to add a new faculty
*     summary: to add a new faculty
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             dob:
*               type: string
*             department:
*               type: string
*             contactNumber:
*               type: string
*             avatar:
*               type: string
*             designation:
*               type: string
*         required:
*           - name
*           - email
*           - gender
*           - dob
*           - department
*           - contactNumber
*           - avatar
*           - designation
*     responses:
*       200:
*         description: Added successfully
*       400:
*         description: Bad request
*
*
* /api/admin/add-student:
*   post:
*     tags:
*       - Admin related routes
*     name: to add a new student
*     summary: to add a new student
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             dob:
*               type: string
*             department:
*               type: string
*             contactNumber:
*               type: string
*             avatar:
*               type: string
*             year:
*               type: string
*             semester:
*               type: string
*         required:
*           - name
*           - email
*           - gender
*           - dob
*           - department
*           - contactNumber
*           - avatar
*           - year
*           - semester
*     responses:
*       200:
*         description: Added successfully
*       400:
*         description: Bad request
*
*
* /api/admin/add-subject:
*   post:
*     tags:
*       - Admin related routes
*     name: to add a new subject
*     summary: to add a new subject
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             subjectCode:
*               type: string
*             subjectName:
*               type: string
*             department:
*               type: string
*             year:
*               type: string
*             semester:
*               type: string
*             totalLectures:
*               type: string
*         required:
*           - subjectCode
*           - subjectName
*           - department
*           - year
*           - semester
*           - totalLectures
*     responses:
*       200:
*         description: Added successfully
*       400:
*         description: Bad request
*
*
* /api/admin/forgot-password:
*   post:
*     tags:
*       - Admin related routes
*     name: forgot password
*     summary: to get OTP for resting password
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*         required:
*           - email
*     responses:
*       200:
*         description: OTP sent successfully
*       404:
*         description: Email not found
*       400:
*         Bad request
*
*
* /api/admin/reset-password:
*   post:
*     tags:
*       - Admin related routes
*     name: reset password
*     summary: to reset the password
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             otp:
*               type: string
*             newPassword:
*               type: string
*             confirmNewPassword:
*               type: string
*         required:
*           - email
*           - otp
*           - newPassword
*           - confirmNewPassword
*     responses:
*       200:
*         description: passowrd has been reset successfully
*       400:
*         description: Bad request
*
*
* /api/admin/all-admins:
*   get:
*     tags:
*       - Admin related routes
*     name: get all admins
*     summary: to get all admins
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No quiz found
*       400:
*         description: Bad Request
*
*
* /api/admin/all-faculties:
*   get:
*     tags:
*       - Admin related routes
*     name: get all faculties
*     summary: to get all faculties
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No quiz found
*       400:
*         description: Bad Request
*
*
* /api/admin/all-students:
*   get:
*     tags:
*       - Admin related routes
*     name: get all students
*     summary: to get all students
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No quiz found
*       400:
*         description: Bad Request
*
*
* /api/admin/all-subjects:
*   get:
*     tags:
*       - Admin related routes
*     name: get all subjects
*     summary: to get all subjects
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No quiz found
*       400:
*         description: Bad Request
*
*
*
*/

// for admin login
router.post("/login", adminLoginFunc);

// for adding admin
router.post("/add-admin", Authenticate, addAdminFunc);

// for getting all admins
router.get("/all-admins", Authenticate, getAllAdminsFunc);

// for adding student
router.post("/add-student", Authenticate, addStudentFunc);

// for getting all students
router.get("/all-students", Authenticate, getAllStudentsFunc);

// for adding faculty 
router.post("/add-faculty", Authenticate, addFacultyFunc);

// for getting all faculties 
router.get("/all-faculties", Authenticate, getAllFacultyFunc);

// for adding subject
router.post("/add-subject", Authenticate, addSubjectFunc);

// for getting all subjects
router.get("/all-subjects", Authenticate, getAllSubjectsFunc);

// to Reset password 
router.post('/forgot-password',forgotPasswordFunc);

// to post OTP and new password 
router.post('/reset-password', resetPasswordFunc);

module.exports = router;