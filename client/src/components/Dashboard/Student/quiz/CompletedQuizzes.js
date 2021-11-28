import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userType } from "../../../../utils/auth";
import NotAuthorized from "../../../NotAuthorized";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

function CompletedQuizzes() {

    const [quizzes, setQuizzes] = useState([]);
    const [questionsList, seQuestionList] = useState([]);
    const [loading, setLaoding] = useState(true);
    const [searchTrem, setTerm] = useState("");

    useEffect(() => {
        setAuthToken();
        axios
            .get(`${getServerUrl()}/api/student/completed-quizzes`)
            .then((res) => {
                setQuizzes(res.data.result);
                setLaoding(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // to get list of questions for a quiz
    const wholeList = questionsList.map(item => {
        return (
            <div class="card hover-translate-y-n10 hover-shadow-lg" style={{ textAlign: "left" }} >
                <div class="card-body">
                    <div>
                        <h5><u>Question :</u> {item.question}</h5>
                        <p class="text-muted mb-0">
                            <u>Option A :</u> {item.optionA}
                        </p>
                        <p class="text-muted mb-0">
                            <u>Option B :</u> {item.optionB}
                        </p>
                        <p class="text-muted mb-0">
                            <u>Option C :</u> {item.optionC}
                        </p>
                        <p class="text-muted mb-0">
                            <u>Option D :</u> {item.optionD}
                        </p>
                        <p class="text-muted mb-0">
                            <u>Correct Answer :</u> {item.correctAnswer}
                        </p>
                    </div>
                </div>
            </div>

        )
    });

    // to filter list of quizzes based on searched term
    const quizzesList = quizzes.filter((quizobj) => {
        if (searchTrem === "") {
            return quizobj;
        }
        else if (new Date(quizobj.quiz.datePosted).toLocaleString().toString().includes(searchTrem.toLowerCase())
            || new Date(quizobj.dateSubmitted).toLocaleString().toString().includes(searchTrem.toLowerCase())
            || quizobj.quiz.purpose.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.quiz.department.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.quiz.semester.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.quiz.subjectCode.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.quiz.facultyRegistrationNumber.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.quiz.facultyName.toLowerCase().includes(searchTrem.toLowerCase())
            || quizobj.score.toString().includes(searchTrem.toLowerCase())
            || quizobj.totalMarks.toString().includes(searchTrem.toLowerCase())) {
            return quizobj;
        }
    }).map((quizobj) => {
        return (
            <div class="card shadow-lg border-0">
                <div class="card-body px-5 py-5 text-center text-md-left">

                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h5 class="mb-2">Purpose : {quizobj.quiz.purpose}</h5>
                            <p class="mb-0">
                                Department : {quizobj.quiz.department}
                            </p>
                            <p class="mb-0">
                                Semester : {quizobj.quiz.semester}
                            </p>
                            <p class="mb-0">
                                Subject Code : {quizobj.quiz.subjectCode}
                            </p>
                            <p class="mb-0">
                                Assigned by : {quizobj.quiz.facultyRegistrationNumber + " || " + quizobj.quiz.facultyName}
                            </p>
                            <h6 class="mb-2">Your Score : {quizobj.score}/{quizobj.totalMarks} </h6>
                        </div>
                        <div class="col-md-6 mt-4 mt-md-0 text-md-right">
                            <div>
                                <div style={{ textAlign: "right" }} className="mb-3">
                                    Submitted on : <span class="badge badge-soft-primary badge-pill">{new Date(quizobj.dateSubmitted).toLocaleString()}</span>
                                </div>
                                <div style={{ textAlign: "right" }} className="mb-5">
                                    Assigned on : <span class="badge badge-soft-dark badge-pill">{new Date(quizobj.quiz.datePosted).toLocaleString()}</span>
                                </div>

                            </div>
                            <a href="#" class="btn btn-warning btn-icon rounded-pill">
                                <span type="button" class="btn-inner--text" data-toggle="modal" data-target="#questionsModal" onClick={(e) => {
                                    e.preventDefault();
                                    seQuestionList(quizobj.quiz.questions);
                                    console.log(questionsList);
                                }}>
                                    Questions
                                </span>

                                <div class="modal fade" id="questionsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Questions</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                {wholeList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div class="ml-5 mr-5 mt-5">
            {userType() === "STU"? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> : quizzes.length === 0 ?
                <div class="card bg-primary shadow-lg rounded-lg border-0">
                    <div class="px-4 py-5 text-center">
                        <div class="h3 text-white">
                            No quizzes submitted by you yet!!
                        </div>
                        <Link to="/pending-quizzes"><button type="button" class="btn btn-dark" >
                            Check your pending quizzes
                        </button></Link>
                    </div>
                </div>
                :
                <div>
                    <div class="input-group" style={{ width: "18rem", margin: "0 auto 2rem auto" }} >
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search queries" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setTerm(e.target.value)} />
                    </div>
                    {quizzesList}
                </div>
                : <NotAuthorized />
            }
        </div>
    );
}

export default CompletedQuizzes;