import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { QuizProvider } from "./QuizContext";
import { userType } from "../../../../utils/auth";
import NotAuthorized from "../../../NotAuthorized";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";


function PendingQuizzes() {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLaoding] = useState(true);
    const [searchTrem, setTerm] = useState("");

    const obj = useContext(QuizProvider);

    useEffect(() => {
        setAuthToken();
        axios
            .get(`${getServerUrl()}/api/student/pending-quizzes`)
            .then((res) => {
                setQuizzes(res.data.result);
                setLaoding(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // to filter list of quizzes based on searched term
    const quizzesList = quizzes.filter((quiz) => {
        if (searchTrem === "") {
            return quiz;
        }
        else if (new Date(quiz.datePosted).toLocaleString().includes(searchTrem.toLowerCase())
            || quiz.purpose.toLowerCase().includes(searchTrem.toLowerCase())
            || quiz.department.toLowerCase().includes(searchTrem.toLowerCase())
            || quiz.semester.toLowerCase().includes(searchTrem.toLowerCase())
            || quiz.subjectCode.toLowerCase().includes(searchTrem.toLowerCase())
            || quiz.facultyRegistrationNumber.toLowerCase().includes(searchTrem.toLowerCase())
            || quiz.facultyName.toLowerCase().includes(searchTrem.toLowerCase())) {
            return quiz;
        }
    }).map((quiz) => {
        return (
            <div class="card shadow-lg border-0">
                <div class="card-body px-5 py-5 text-center text-md-left">
                    <div style={{ textAlign: "left" }} >
                        Assigned on : <span class="badge badge-dark badge-pill">{new Date(quiz.datePosted).toLocaleString()}</span>
                    </div>
                    <div class="row align-items-center mt-2">
                        <div class="col-md-6">
                            <h5 class="mb-2">Purpose : {quiz.purpose}</h5>
                            <p class="mb-0">
                                Department : {quiz.department}
                            </p>
                            <p class="mb-0">
                                Semester : {quiz.semester}
                            </p>
                            <p class="mb-0">
                                Subject Code : {quiz.subjectCode}
                            </p>
                            <p class="mb-0">
                                Assigned by : {quiz.facultyRegistrationNumber + " || " + quiz.facultyName}
                            </p>
                        </div>
                        <div class="col-12 col-md-6 mt-4 mt-md-0 text-md-right">
                            <a href="#" class="btn btn-warning btn-icon rounded-pill">
                                <span type="button" class="btn-inner--text" data-toggle="modal" data-target="#questionsModal" onClick={(e) => {
                                    e.preventDefault();
                                    obj.attemptQuiz(quiz);
                                }}>
                                    Attempt Quiz
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div class="ml-5 mr-5 mt-5">
            { userType() === "STU" ? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> : quizzes.length === 0 ?
                <div class="card bg-primary shadow-lg rounded-lg border-0">
                    <div class="px-4 py-5 text-center">
                        <div class="h3 text-white">
                            No pending Quizzes!!
                        </div>
                        <p class="text-white">When you teachers will post quiz you will be able to see them here :)</p>
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
                </div> : <NotAuthorized />
            }

        </div>
    );
}

export default PendingQuizzes;