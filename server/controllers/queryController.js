const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/node-mailer");

//validations 
const validateSubmitQueryInput = require("../validations/submitQuery");
const validateSolveQueryInput = require("../validations/solveQuery");

//model
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Query = require("../models/query");

module.exports = {
    /*  
        Purpose = to submit a query
        Input =  askedBy, askedTo, body, recipient and title
        Output = Recipient of query will get an email for newly submitted query
    */
    submitQueryFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const { errors, isValid } = validateSubmitQueryInput(req.body);

                // Check Validation
                if (!isValid) {
                    return res.status(400).json(errors);
                }
                const { askedBy, askedTo, body, recipient, title } = req.body;

                const student = await Student.findOne({ registrationNumber: askedBy })
                if (!student) {
                    errors.askedBy = 'sender with given registration number is not found';
                    return res.status(404).json(errors);
                }
                var emailid = "";
                if (recipient === "Faculty") {
                    const faculty = await Faculty.findOne({ registrationNumber: askedTo });
                    if (!faculty) {
                        errors.askedTo = 'recipient with given registration is not found';
                        return res.status(404).json(errors);
                    }
                    emailid = faculty.email;
                }
                else {
                    const student2 = await Student.findOne({ registrationNumber: askedTo });
                    if (!student2) {
                        errors.askedTo = 'recipient with given registration is not found';
                        return res.status(404).json(errors);
                    }
                    emailid = student2.email;
                }
                const newQuery = await new Query({
                    askedBy,
                    recipient,
                    askedTo,
                    title,
                    body,
                    datePosted: new Date()
                })
                //console.log(newQuiz);
                await newQuery.save();
                var htmlToSent = `<div><h3>${student.registrationNumber}(${student.name}) has submitted this query for you </h3><h4>Title : ${title}</h4><p>Query : ${body}</p></div>`;
                await sendEmail(emailid, student.name + " has submitted a query for you", htmlToSent)
                return res.status(200).json({ message: "Query posted successfully" });
            } else {
                throw new Error("Only student can submit a query");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }

    },
    /*  
        Purpose = to solve a query
        Input =  solvedBy, queryId and solution
        Output = Sender of query will get an email with solution submitted for asked query
    */
    solveQueryFunc: async (req, res, next) => {
        try {
            if (req.userType === "student" || req.userType === "faculty") {
                const { errors, isValid } = validateSolveQueryInput(req.body);

                // Check Validation
                if (!isValid) {
                    return res.status(400).json(errors);
                }
                const { queryId, solution } = req.body;

                const solvedBy = req.user.registrationNumber;

                const query = await Query.findOne({ _id: queryId })
                if (!query) {
                    errors.queryId = 'query with given id is not found';
                    return res.status(404).json(errors);
                }
                if (query.askedTo !== solvedBy) {
                    errors.solvedBy = 'This query was not asked to you';
                    return res.status(400).json(errors);
                }
                var name = "";
                var regno = "";
                if (query.recipient === "Faculty") {
                    const faculty = await Faculty.findOne({ registrationNumber: solvedBy });
                    if (!faculty) {
                        errors.solvedBy = 'query solver with given registration number is not a faculty';
                        return res.status(400).json(errors);
                    }
                    name = faculty.name;
                    regno = faculty.registrationNumber;
                }
                else {
                    const student = await Student.findOne({ registrationNumber: solvedBy });
                    if (!student) {
                        errors.solvedBy = 'query solver with given registration number is not a student';
                        return res.status(400).json(errors);
                    }
                    name = student.name;
                    regno = student.registrationNumber;
                }

                //console.log(query);
                query.solution = solution;
                query.isSolved = true;
                query.dateSolved = new Date();
                await query.save();
                const student = await Student.findOne({ registrationNumber: query.askedBy })
                var htmlToSent = `<div><h3>${regno}(${name}) has submitted solution to your query </h3><h4>Title : ${query.title}</h4><p>Query : ${query.body}</p><p>Solution : ${solution}</p></div>`;
                await sendEmail(student.email, "Your query has been solved by " + solvedBy, htmlToSent)
                return res.status(200).json({ message: "Query solved successfully" });
            } else {
                throw new Error("Only students or faculties can submit a query");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
    /*  
        Purpose = to get all solved queries of a student
        Input =  registration number
        Output = Array containing all solved queries of a student
    */
    getYourSolvedQueriesFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber });
                if (!student) {
                    return res.status(404).json({ error: "No student found for given registration number" })
                }
                const queries = await Query.find({ askedBy: req.user.registrationNumber, isSolved: true }, { _id: 0 }).sort({ dateSolved: -1 });
                if (queries.length === 0) {
                    return res.status(404).json({ error: "No solved queries are there for given student" })
                }
                res.status(200).json({ result: queries });
            }
            else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },

    /*  
        Purpose = to get all unsolved queries of a student
        Input =  registration number
        Output = Array containing all unsolved queries of a student
    */
    getYourUnslovedQueriesFunc: async (req, res, next) => {
        try {
            if (req.userType === "student") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber });
                if (!student) {
                    return res.status(404).json({ error: "No student found for given registration number" })
                }
                const queries = await Query.find({ askedBy: req.user.registrationNumber, isSolved: false }, { _id: 0 }).sort({ datePosted: -1 });
                if (queries.length === 0) {
                    return res.status(404).json({ error: "No unsolved queries are there for given student" })
                }
                res.status(200).json({ result: queries });
            }
            else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },

    /*  
        Purpose = to get all queries waiting for a student or faculty
        Input =  registration number
        Output = Array containing all queries waiting for a student or faculty
    */
    getQueriesWaitingForYouFunc: async (req, res, next) => {
        try {
            if (req.userType === "student" || req.userType === "faculty") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber });
                if (!student) {
                    const faculty = await Faculty.findOne({ registrationNumber: req.user.registrationNumber });
                    if (!faculty) {
                        return res.status(404).json({ error: "No student or faculty found for given registration number" });
                    }
                }
                const queries = await Query.find({ askedTo: req.user.registrationNumber, isSolved: false }).sort({ datePosted: -1 });
                if (queries.length === 0) {
                    return res.status(404).json({ error: "No queries are waiting for you" })
                }
                res.status(200).json({ result: queries });
            } else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
    /*  
        Purpose = to get all queries solved by a student or faculty
        Input =  registration number
        Output = Array containing all queries solved by a student or faculty
    */
    getQueriesSolvedByYouFunc: async (req, res, next) => {
        try {
            if (req.userType === "student" || req.userType === "faculty") {
                const student = await Student.findOne({ registrationNumber: req.user.registrationNumber });
                if (!student) {
                    const faculty = await Faculty.findOne({ registrationNumber: req.user.registrationNumber });
                    if (!faculty) {
                        return res.status(404).json({ error: "No student or faculty found for given registration number" });
                    }
                }
                const queries = await Query.find({ askedTo: req.user.registrationNumber, isSolved: true }, { _id: 0 }).sort({ dateSolved: -1 });
                if (queries.length === 0) {
                    return res.status(404).json({ error: "No queries are solved by you yet" })
                }
                res.status(200).json({ result: queries });
            } else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            res.status(400).json({ message: `Invalid request", ${err.message}` })
        }
    },
};