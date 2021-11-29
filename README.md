# Reinforce - Microsoft Engage Project

This project is built with MERN stack (MongoDB, Express, ReactJS and NodeJS) where backend is written using <b>Model-View-Controller(MVC) architecture</b>.
<br/>
<br/>
Hosted website - https://reinforce-application.herokuapp.com/  <br/>
Swagger UI documentation - https://reinforce-app-server.herokuapp.com/swagger-ui  <br/><br/><br/>
Android Application - https://drive.google.com/file/d/1GYSqex3IkgXEa_MZorex8MPH-6wo3Vdp/view?usp=sharing <br/>

Sample credentials to login into system - 
<br/>
ADMIN - 
<br/>
registration number = ADM100<br/>
password = 2004-12-12
<br/><br/>
FACULTY - 
<br/>
registration number = FAC100<br/>
password = 2002-11-11<br/>
<br/><br/>
STUDENT - <br/>
registration number = STU102<br/>
password = 2002-01-30<br/><br/>



<ul>
    <li>
        <a href="#Introduction">
            Introduction
        </a>
    </li>
    <li>
        <a href="#Use-Case-Diagram">
            Use Case Diagram
        </a>
    </li>
    <li>
        <a href="#Key-Features">
            Key Features
        </a>
    </li>
    <li>
        <a href="#Technologies-Used">
           Technologies Used
        </a>
        <ul>
            <li>
                <a href="#Database">
                     Database
                </a>
            </li>
            <li>
                <a href="#Server">
                    Server
                </a>
            </li>
            <li>
                <a href="#Client">
                     Client
                </a>
            </li>
        </ul>
    </li>
    <li>
        <a href="#Workflow-of-Token-Based-Authentication">
             Workflow of Token Based Authentication
        </a>
    </li>
    <li>
        <a href="#Request-Response-Workflow">
            Request Response Workflow
        </a>
    </li>
    <li>
        <a href="#Available-Scripts">
            Available Scripts
        </a>
    </li>
      <li>
        <a href="#Android-Application">
            Android Application
        </a>
    </li>
</ul>

## Introduction

<b>Reinforce -</b> This web project aim to facilitate posting and auto-grading the quizzes for students by faculties. 
<br/>
It also has an admin panel that is the super user of the website. Faculties can easily post their quizzes to a student group on a single mouse button click and students are notified via a email. Student can put their queries to faculties and fellow students. <br/>
This is also a mobile friendly web application and an android app is also built for which apk is shared above.

## Use Case Diagram
![alt usecase](https://github.com/dk808080/Reinforce/blob/main/Diagrams/use%20case.png)

<ol>
        <li>
            Admin - 
            <ul>
                <li> Can add new admins</li>
                <li> Can add new faculties </li>
                <li> Can add new stdents </li>
                <li> Can add new subject </li>
                <li> Can see all admins and also filter them by department </li>
                <li> Can see all faculties and also filter them by department </li>
                <li> Can see all students and also filter them by department and year</li>
                <li> Can see all subjects and also filter them by department and semester </li>
            </ul>
        </li>
        <li>
            Faculty - 
            <ul>
                <li> Can upload a new quiz</li>
                <li> Can see all quizzes he/she has taken till date where most recent will be in top.</li>
                <li> Can see all queries that subdents asked to him/her</li>
                <li> Can submit solution for queries asked</li>
                <li> Can see all queries he/she has answeres till date where most recently answered will be in top</li>
                <li> Can use <b>search box</b> to search all queries and quizzes</li>
            </ul>
        </li>
        <li>
            Student - 
            <ul>
                <li> Can see all pending quizzes where most recent will be on top</li>
                <li> Can attempt a pending quiz</li>
                <li> Can see all completed quizzes where most recently submitted will be on top</li>
                <li> Can ask query to a faculties or fellow students</li>
                <li> Can see all solved queries of him/her</li>
                <li> Can see all unsolved queries of him/her</li>
                <li> Can see all queries he/she has solved for fellow students</li>
                <li> Can see all queries waiting for him/her</li>
                <li> Can submit solution for queries asked by fellow students</li>
                <li> Can use search box to search all queries and quizzes</li>
            </ul>
        </li>
    </ol>
    

## Key Features

### Quiz application - 

<ul>
    <li>Faculties can upload quizzes for all the student who belongs to a particular department and semester.</li>
    <li>Students will receive an email notification for newly uploaded quiz for them then they can attemp the quiz.</li>
    <li>All question numbers will there in a box on left side to make it easy to navigate to any question</li>
    <li> Student can end or quit test any time or it will be auto submitted after completion of time.</li>
    <li>Student will get an email notification for his/her score in quiz.</li>
</ul>

### Query application - 

<ul>
    <li>Students can ask a query to faculties or fellow students</li>
    <li>Recipient of query will get an email notification.</li>
    <li>Recipients can submit the solution os a query</li>
    <li> Sender of query will get an email notification when his/her query will be solved by recipient</li>
    <li>Students and faculties can see all the solved, unsolved and waiting queries</li>
</ul>

## Technologies Used

### Database
#### MongoDB 

It is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.

#### Data Model Diagram 

![alt data model diagram](https://github.com/dk808080/Reinforce/blob/main/Diagrams/datamodels.png)


### Server
#### NodeJs
Node.js is a server-side platform built on Google Chrome's JavaScript Engine (V8 Engine) for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

#### Packages used 
<ol>
        <li>
            express – backend web framework for nodejs, used for building backend APIs.
        </li>
        <li>
            mongoose – to establish connection with mongoDB Atlas database.
        </li>
        <li>
            body-parser – to parses the req.body parameter in JSON form.
        </li>
        <li>
            jsonwebtoken - for authentication using web tokens.
        </li>
        <li>
            cookie-parser – read and write to the browser cookies.
        </li>
        <li>
            CORS – allows data exchange if frontend and backend are on two different services.
        </li>
        <li>
            nodemailer - to Sends email notifications
        </li>
        <li>
            validator - to validates user inputs 
        </li>
        <li>
            swagger-jsdoc - to generate an OpenAPI (Swagger) specification.
        </li>
         <li>
            swagger-ui-express - to auto-generate swagger-ui( end point = "/swagger-ui")
        </li>
</ol>


### Client
#### ReactJs
React. js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications.

#### Packages used 

<ol>
    <li>
        react-router-dom - to handle routing
    </li>
    <li>
        axios – for making api calls
    </li>
    <li>
        sweetalert – for customizing alerts
    </li>
</ol>

## Workflow of Token Based Authentication
![alt auth flow](https://github.com/dk808080/Reinforce/blob/main/Diagrams/auth%20flow.png)


## Request Response Workflow

Here I am taking an example of query submission to explain the workflow

![alt req res workflow](https://github.com/dk808080/Reinforce/blob/main/Diagrams/req%20res%20flow.png)


## Available Scripts
In project directory go to server folder and add a .env file which contains following things 
<br/>
MONGOURI= MongoDB atlas URL <br/>
hostEmail= Email id used to notify users <br/>
hostPassword= password of email id <br/>
JWT_SECRET= jwt secret token <br/>
serviceUsed= email service used <br/>
<br/>

### Steps to Run 
Then in the project directory, you can run:

### `cd server`
to navigate to server folder

### `npm install`
to install all needed dependencies

### `npm start`
to start the NodeJs server

### `cd ../client`
to navigate to client folder

### `npm install`
to install all needed dependencies

### `npm start`
to start the react app

Then navigate to your browser <a href="http://localhost:3000/">http://localhost:3000/</a> to view the react app
<br/>
<br/>
Navigate to your browser <a href="http://localhost:5000/swagger-ui/">http://localhost:5000/swagger-ui/</a> to use Swagger UI(to generate interactive API documentation that lets your users try out the API calls directly in the browser).

## Android Application
Android application is made using WebView and WebViewClient.
WebView class is an extension of Android's View class that allows you to display web pages as a part of your activity layout. <br/>
.apk can be downloaded from provided google drive link.
