import React, { Component, Fragment } from "react";
import notification from "../../../../assets/audio/answer.mp3";
import buttonSound from "../../../../assets/audio/button-sound.mp3";
import "../../../../assets/css/styleQuizzPage.css";
import swal from "sweetalert";
import axios from "axios";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

class AttemptQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currQuestion: {},
            nextQuestion: {},
            prevQuestion: {},
            answer: "",
            numberOfQuestion: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            prevButtonDisable: true,
            nextButtonDisable: false,
            answersGiven: [],
            numbers: [],
            time: {}
        };
        this.interval = null
    }

    componentDidMount() {
        this.state.questions = this.props.quiz.questions;
        const { questions, currQuestion, nextQuestion, prevQuestion } = this.state;
        this.displayQuestions(questions, currQuestion, nextQuestion, prevQuestion);
        this.state.answersGiven = new Array(this.props.quiz.questions.length).fill("Not Answered");
        this.state.numbers = Array.from({ length: this.props.quiz.questions.length }, (_, i) => i + 1);
        this.startTimer();
    }

    // to display a question
    displayQuestions = (questions = this.state.questions, currQuestion, nextQuestion, prevQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (this.state.questions.length !== 0) {
            questions = this.state.questions;
            currQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            prevQuestion = questions[currentQuestionIndex - 1];
            const answer = currQuestion.correctAnswer;
            this.setState({
                currQuestion,
                nextQuestion,
                prevQuestion,
                numberOfQuestion: questions.length,
                answer
            }, () => {
                if (this.state.answersGiven[currentQuestionIndex] === "Not Answered") {
                    document.getElementById('optionA').checked = false;
                    document.getElementById('optionB').checked = false;
                    document.getElementById('optionC').checked = false;
                    document.getElementById('optionD').checked = false;
                }
                else {
                    var val = this.state.answersGiven[currentQuestionIndex];
                    document.getElementById(val).checked = true;
                }
            })
        }
    };

    // to play sound on option click
    handleOptionClick = (e) => {
        document.getElementById('answer-sound').play();
    }

    // to display next question 
    handleNextButtonClick = () => {
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion)
            })
        }
    }

    // to display previous question
    handlePrevButtonClick = () => {
        this.playButtonSound();
        if (this.state.prevQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion)
            })
        }
    }

    // to quit test
    handleQuitButtonClick = () => {
        this.playButtonSound();
        swal({
            title: "Are you sure?",
            text: "If you will quit the quiz you will be assigned marks based on attempted questions till now",
            icon: "warning",
        })
            .then(willLogout => {
                if (willLogout) {
                    this.submitQuiz();
                }
            });
    }

    // to end test
    handleEndButtonClick = () => {
        this.playButtonSound();
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to end the quiz",
            icon: "warning",
        })
            .then(willLogout => {
                if (willLogout) {
                    this.submitQuiz();
                }
            });
    }

    // to submit quiz
    submitQuiz = () => {
        var score = 0, correctAnswers = 0, numberOfAnsweredQuestions = 0, wrongAnswers = 0;
        for (var i = 0; i < this.state.numberOfQuestion; i++) {
            var currentQuestion = this.state.questions[i];
            var chosenOption = "";
            if (this.state.answersGiven[i] === "Not Answered") {
                chosenOption = "Not Answered";
            }
            else if (this.state.answersGiven[i] === "optionA") {
                chosenOption = currentQuestion.optionA;
            }
            else if (this.state.answersGiven[i] === "optionB") {
                chosenOption = currentQuestion.optionB;
            }
            else if (this.state.answersGiven[i] === "optionC") {
                chosenOption = currentQuestion.optionC;
            }
            else if (this.state.answersGiven[i] === "optionD") {
                chosenOption = currentQuestion.optionD;
            }
            if (chosenOption.toLowerCase() === this.state.questions[i].correctAnswer.toLocaleLowerCase()) {
                score++;
                correctAnswers++;
                numberOfAnsweredQuestions++;
            }
            else if (chosenOption !== "Not Answered") {
                wrongAnswers++;
                numberOfAnsweredQuestions++;
            }
        }
        this.setState(prevState => ({
            score,
            correctAnswers,
            wrongAnswers,
            numberOfAnsweredQuestions
        }), () => {
            const quizObj = {
                score: this.state.score.toString(),
                quizId: this.props.quiz._id,
                totalMarks: this.state.numberOfQuestion.toString()
            }
            setAuthToken();
            axios
                .post(`${getServerUrl()}/api/student/submit-quiz`, quizObj)
                .then((res) => {
                    swal("Submitted Successfully!",
                        "Your score : " + this.state.score + "/" + this.state.numberOfQuestion
                        + "\n Total Questions : " + this.state.numberOfQuestion
                        + "\n Answered Questions : " + this.state.numberOfAnsweredQuestions
                        + "\n Correct Answers : " + this.state.correctAnswers
                        + "\n Wrong Asnwers : " + this.state.wrongAnswers
                        , "success")
                        .then((value) => {
                            this.props.navigate("/student-dashboard")
                            if (window.document.fullscreenElement) {
                                window.document.exitFullscreen()
                                  .then(() => console.log("Document Exited from Full screen mode"))
                                  .catch((err) => console.error(err))
                              }
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    }

    // switch case for all button clicks 
    handleButtonClick = (e) => {
        if (document.getElementById('optionA').checked) {
            this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionA");
        } else if (document.getElementById('optionB').checked) {
            this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionB");
        }
        else if (document.getElementById('optionC').checked) {
            this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionC");
        }
        else if (document.getElementById('optionD').checked) {
            this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionD");
        }
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'prev-button':
                this.handlePrevButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            case 'end-button':
                this.handleEndButtonClick();
                break;
            default:
                break;
        }

    }

    // to play sound on button click
    playButtonSound = () => {
        document.getElementById('button-sound').play();
    }

    // to start timer for test
    startTimer = () => {
        const countDownTime = Date.now() + (this.props.quiz.questions.length) * 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.submitQuiz();
                })
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000)
    }

    render() {
        const { currQuestion, currentQuestionIndex, numberOfQuestion, time, numbers, answersGiven } = this.state;
        return (
            <>
                <Fragment>
                    <audio id="answer-sound" src={notification}></audio>
                    <audio id="button-sound" src={buttonSound}></audio>
                </Fragment>
                <section className="bg-light pt-6" style={{ height: "100%", textAlign: "center" }} >
                    <div style={{ position: "absolute", top: "0", right: "0" }} className="mt-2 mr-2" >
                        <button id="end-button" type="button" class="btn btn-sm btn-dark" onClick={this.handleButtonClick}>End Quiz</button>
                    </div>
                    <div className="row pb-6">
                        <div className="col-md-3 pt-2 pr-3 ml-3">
                            <div class="row row-cols-4">
                                {numbers.map(number => (
                                    <div class="col" id={number}>
                                        <button id="question-number-button" type="button" class={`btn ${answersGiven[number - 1] === "Not Answered" ? "btn-outline-dark" : "btn-success"} mb-1`} style={{ borderRadius: 0 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (document.getElementById('optionA').checked) {
                                                    this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionA");
                                                } else if (document.getElementById('optionB').checked) {
                                                    this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionB");
                                                }
                                                else if (document.getElementById('optionC').checked) {
                                                    this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionC");
                                                }
                                                else if (document.getElementById('optionD').checked) {
                                                    this.state.answersGiven.splice(this.state.currentQuestionIndex, 1, "optionD");
                                                }
                                                this.setState(prevState => ({
                                                    currentQuestionIndex: number - 1
                                                }), () => {
                                                    this.displayQuestions(this.state.state, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion)
                                                })
                                            }}>{number}</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-8" style={{ backgroundColor: "white", borderRadius: "1%", display: "inline-block" }} >
                            <div style={{ textAlign: "left" }} >
                                <span class="badge badge-pill">{currentQuestionIndex + 1} of {numberOfQuestion}</span>
                            </div>
                            <div style={{ textAlign: "right" }} >
                                <i class="far fa-clock"></i>
                                <span class="badge badge-pill">{time.minutes}:{time.seconds}</span>
                            </div>
                            <div class="card-body" style={{ textAlign: "center" }}>
                                <h5>{currQuestion.question}</h5>
                                <div>
                                    <form>
                                        <div className="row mt-5">
                                            <div class="radiobtn col-md-6">
                                                <input type="radio" id="optionA"
                                                    name={currentQuestionIndex} value={currQuestion.optionA} onClick={this.handleOptionClick} />
                                                <label for="optionA">{currQuestion.optionA}</label>
                                            </div>

                                            <div class="radiobtn col-md-6">
                                                <input type="radio" id="optionB"
                                                    name={currentQuestionIndex} value={currQuestion.optionB} onClick={this.handleOptionClick} />
                                                <label for="optionB">{currQuestion.optionB}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div class="radiobtn col-md-6">
                                                <input type="radio" id="optionC"
                                                    name={currentQuestionIndex} value={currQuestion.optionC} onClick={this.handleOptionClick} />
                                                <label for="optionC">{currQuestion.optionC}</label>
                                            </div>

                                            <div class="radiobtn col-md-6">
                                                <input type="radio" id="optionD"
                                                    name={currentQuestionIndex} value={currQuestion.optionD} onClick={this.handleOptionClick} />
                                                <label for="optionD">{currQuestion.optionD}</label>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="text-center mt-5">
                                        <button id="prev-button" type="button" class="btn btn-sm btn-secondary" onClick={this.handleButtonClick}>Previous Question</button>
                                        <button id="next-button" type="button" class="btn btn-sm btn-primary" onClick={this.handleButtonClick}>Next Question</button>
                                        <button id="quit-button" type="button" class="btn btn-sm btn-danger" onClick={this.handleButtonClick}>Quit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </>);
    }
}

export default AttemptQuiz;