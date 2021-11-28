const express = require("express");
const router = express.Router();

const {submitQueryFunc,solveQueryFunc, getYourSolvedQueriesFunc, getYourUnslovedQueriesFunc, getQueriesWaitingForYouFunc, getQueriesSolvedByYouFunc} = require("../controllers/queryController");
const { Authenticate } = require("../middlewares/auth");

/**
* @swagger
*
* /api/query/submit-query:
*   post:
*     tags:
*       - Query related routes
*     name: to add a new query
*     summary: Students can ask queries to fellow students or faculties
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             askedBy:
*               type: string
*             askedTo:
*               type: string
*             body:
*               type: string
*             recipient:
*               type: string
*             title:
*               type: string
*         required:
*           - askedBy
*           - askedTo
*           - body
*           - recipient
*           - title
*     responses:
*       200:
*         description: Query added successfully
*       400:
*         description: Bad request
*       404:
*         description: Not found
*
* /api/query/solve-query:
*   post:
*     tags:
*       - Query related routes
*     name: solve a query
*     summary: students and faculties can solve queries asked to them
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             queryId:
*               type: string
*             solution:
*               type: string
*         required:
*           - queryId
*           - solution
*     responses:
*       200:
*         description: OTP sent successfully
*       404:
*         description: Not found
*       400:
*         description: Bad request
*
*
* /api/query/solved-queries:
*   get:
*     tags:
*       - Query related routes
*     name: get all solved queries
*     summary: to get all solved queries for currently logged in student
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No found
*       400:
*         description: Bad Request
*
* /api/query/unsolved-queries:
*   get:
*     tags:
*       - Query related routes
*     name: get all unsolved queries
*     summary: to get all unsolved queries for currently logged in student
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No found
*       400:
*         description: Bad Request
*
* /api/query/queries-waiting:
*   get:
*     tags:
*       - Query related routes
*     name: get all queries waiting for a student of faculty
*     summary: to get all queries waiting for currently logged in student or faculty
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: Not found
*       400:
*         description: Bad Request
*
* /api/query/queries-solved-by-you:
*   get:
*     tags:
*       - Query related routes
*     name: get all queries solved by a student of faculty
*     summary: to get all queries solved by currently logged in student or faculty
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       404:
*         description: No found
*       400:
*         description: Bad Request
*
*/

// to submit query
router.post("/submit-query",Authenticate,submitQueryFunc);

//to solve query
router.post("/solve-query",Authenticate,solveQueryFunc);

//to get all the solved queries
router.get("/solved-queries",Authenticate,getYourSolvedQueriesFunc);

// to get all unsolved queries
router.get("/unsolved-queries",Authenticate,getYourUnslovedQueriesFunc);

//to get all queries waiting for you
router.get("/queries-waiting",Authenticate,getQueriesWaitingForYouFunc);

//to get all queries solved by you
router.get("/queries-solved-by-you",Authenticate,getQueriesSolvedByYouFunc);


module.exports = router;