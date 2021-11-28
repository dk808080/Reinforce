const express = require("express");
const router = express.Router();

const {facultyLoginFunc,
       addQuizFunc, 
       allQuizzesFunc, 
       getSubjectCodesAndNamesFunc,
       forgotPasswordFunc,
       resetPasswordFunc} = require("../controllers/facultyController");
       
const { Authenticate } = require("../middlewares/auth");


 /**
* @swagger
*
* /api/faculty/login:
*   post:
*     tags:
*       - Faculty related routes
*     name: login a faculty
*     summary: to login a faculty
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
* /api/faculty/add-quiz:
*   post:
*     tags:
*       - Faculty related routes
*     name: to add a new quiz
*     summary: to add a new quiz
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             facultyRegistrationNumber:
*               type: string
*             facultyName:
*               type: string
*             purpose:
*               type: string
*             department:
*               type: string
*             semester:
*               type: string
*             subjectCode:
*               type: string
*             questions:
*               type: array
*         required:
*           - facultyRegistrationNumber
*           - facultyName
*           - purpose
*           - department
*           - semester
*           - subjectCode
*           - questions
*     responses:
*       200:
*         description: Quiz added successfully
*       400:
*         description: Bad request
*       404:
*         description: Not found
*
* /api/faculty/forgot-password:
*   post:
*     tags:
*       - Faculty related routes
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
* /api/faculty/reset-password:
*   post:
*     tags:
*       - Faculty related routes
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
* /api/faculty/all-quizzes:
*   get:
*     tags:
*       - Faculty related routes
*     name: get all quizzes
*     summary: to get all quizzes for currently logged in faculty
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
* /api/faculty/get-subject-codes:
*   get:
*     tags:
*       - Faculty related routes
*     name: get all subject codes and names
*     summary: to get all subject codes and names
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No subjects found
*       400:
*         description: Bad Request
*
*
*/

//for faculty login
router.post("/login",facultyLoginFunc);

//for adding quiz
router.post("/add-quiz",Authenticate, addQuizFunc);

//for getting all quizzes
router.get("/all-quizzes",Authenticate, allQuizzesFunc);

// for getting all subject codes and names
router.get("/get-subject-codes",Authenticate, getSubjectCodesAndNamesFunc);

// to Reset password 
router.post('/forgot-password',forgotPasswordFunc);

// to post OTP and new password 
router.post('/reset-password', resetPasswordFunc);

module.exports = router;