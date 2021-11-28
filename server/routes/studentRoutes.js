const express = require("express");
const router = express.Router();

const {studentLoginFunc,
       getPendingQuizzesFunc,
       getCompletedQuizzesFunc,
       submitQuizFunc,
       forgotPasswordFunc,
       resetPasswordFunc} = require("../controllers/studentController");
       
const { Authenticate } = require("../middlewares/auth");

 /**
* @swagger
*
* /api/student/login:
*   post:
*     tags:
*       - Student related routes
*     name: login a student
*     summary: to login a student
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
* /api/student/submit-quiz:
*   post:
*     tags:
*       - Student related routes
*     name: to submit a quiz
*     summary: to submit a quiz
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             quizId:
*               type: string
*             score:
*               type: string
*             totalMarks:
*               type: string
*         required:
*           - quizId
*           - score
*           - totalMarks
*     responses:
*       200:
*         description: Quiz submitted successfully
*       400:
*         description: Bad request
*       404:
*         description: Student Not found
*
* /api/student/forgot-password:
*   post:
*     tags:
*       - Student related routes
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
*         description: Bad request
*
*
* /api/student/reset-password:
*   post:
*     tags:
*       - Student related routes
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
* /api/student/pending-quizzes:
*   get:
*     tags:
*       - Student related routes
*     name: get all pending quizzes
*     summary: to get all pending quizzes for currently logged in student
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: Student not found
*       400:
*         description: Bad Request
*
*
* /api/student/completed-quizzes:
*   get:
*     tags:
*       - Student related routes
*     name: get all completed quizzes
*     summary: to get all completed quizzes for currently logged in student
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: Student not found
*       400:
*         description: Bad Request
*
*
*
*/

//student login
router.post("/login",studentLoginFunc);

// for getting pending quizzes 
router.get("/pending-quizzes",Authenticate,getPendingQuizzesFunc);

//for getting completed quizzes 
router.get("/completed-quizzes",Authenticate,getCompletedQuizzesFunc);

//for submitting quiz
router.post("/submit-quiz",Authenticate,submitQuizFunc);

// to Reset password 
router.post('/forgot-password',forgotPasswordFunc);

// to post OTP and new password 
router.post('/reset-password', resetPasswordFunc);

module.exports = router;