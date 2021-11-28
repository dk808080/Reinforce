const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

require("dotenv").config();

// routes
var adminRoutes = require("./routes/adminRoutes");
var facultyRoutes = require("./routes/facultyRoutes");
var studentRoutes = require("./routes/studentRoutes");
var queryRoutes = require("./routes/queryRoutes");

const app = express();

// middlewares 
app.use(cors());
app.use(cookieParser());

// connection to database
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", (req, res) => {
    console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
    console.log("error while connecting ", err);
});

app.get("/", (req, res) => {
    res.send("this is home of server");
})

//models 
require("./models/student");
require("./models/faculty");
require("./models/admin");
require("./models/subject");
require("./models/quiz");
require("./models/query");

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Reinforce',
            description: "Reinfoce APIs information",
            contact: {
                name: "Dimpal Kataniya"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["./routes/*.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);

//route middlewares
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// routes 
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/query", queryRoutes);
//app.use("/api/home",homeRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, (req, res) => {
    console.log("server is running on port " + PORT);
});