const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const Admin = require("../models/admin");
const Student = require("../models/student");
const Faculty = require("../models/faculty");

module.exports = {
    /*  
       Purpose = to check whether a user(admin or faculty or student) is loggedin or not
       Input = cookie containg jwt token
       Output = If user is loggin it will execute next function
   */
    Authenticate: async (req, res, next) => {
        try {
                const token = req.headers.authorization;
                if (!token) {
                    req.user = undefined;
                    throw new Error("User not found");
                }

                const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
                //console.log(decoded);
                const faculty = await Faculty.findById(decoded._id)
                const student = await Student.findById(decoded._id)
                const admin = await Admin.findById(decoded._id)
                if (faculty) {
                    req.user = faculty;
                    req.userType = "faculty";
                }
                else if (student) {
                    req.user = student;
                    req.userType = "student";
                }
                else if (admin) {
                    req.user = admin;
                    req.userType = "admin";
                }
                else {
                    throw new Error("User not found");
                }
                //console.log(req.user);
                next();
        }
        catch (err) {
            res.status(401).send("Unauthorized:No token provided");
            console.log("Error in checking for auth", err.message)
        }

    },
};