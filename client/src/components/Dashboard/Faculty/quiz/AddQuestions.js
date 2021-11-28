import React, { useState, useContext } from "react";
import { QuizProvider } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AddQuestion() {
    const obj = useContext(QuizProvider);
    const navigate = useNavigate();

    const [queNumber, setqueNumber] = useState(1);
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    function postQuizFunc(e) {
        e.preventDefault();
        if (question === "" || optionA === "" || optionB === "" || optionC === "" || optionD === "" || correctAnswer === "") {
            swal("Oops", "all fields are required", "warning")
        } else {
            const questionobj = {
                "question": question,
                "optionA": optionA,
                "optionB": optionB,
                "optionC": optionC,
                "optionD": optionD,
                "correctAnswer": correctAnswer
            }
            obj.postQuiz(questionobj, navigate);
        }
    }

    function nextQuestionFunc(e) {
        e.preventDefault();
        if (question === "" || optionA === "" || optionB === "" || optionC === "" || optionD === "" || correctAnswer === "") {
            swal("Oops", "all fields are required", "warning")
        } else {
            const questionobj = {
                "question": question,
                "optionA": optionA,
                "optionB": optionB,
                "optionC": optionC,
                "optionD": optionD,
                "correctAnswer": correctAnswer
            }
            obj.addQuestion(questionobj);
            setqueNumber(queNumber + 1);
            setQuestion("");
            setOptionA("");
            setOptionB("");
            setOptionC("");
            setOptionD("");
            setCorrectAnswer("");
        }
    }

    return (
        <div>
            <section class="slice bg-dark">
                <form role="form" className="pl-5 pr-5 pb-5 pt-5 ml-5 mr-5" style={{ backgroundColor: "white", borderRadius: "1%" }}>
                    <div>
                        <div class="form-group">
                            <label class="form-control-label">Question {queNumber}</label>
                            <input class="form-control" type="text" placeholder="Enter Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Option A</label>
                                    <input class="form-control" type="text" placeholder="OptionA" value={optionA} onChange={(e) => setOptionA(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Option B</label>
                                    <input class="form-control" type="text" placeholder="optionB" value={optionB} onChange={(e) => setOptionB(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Option C</label>
                                    <input class="form-control" type="text" placeholder="optionC" value={optionC} onChange={(e) => setOptionC(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Option D</label>
                                    <input class="form-control" type="text" placeholder="optionD" value={optionD} onChange={(e) => setOptionD(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Correct Answer</label>
                                    <input class="form-control" type="text" placeholder="answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="text-right mt-5">
                                    <button type="button" class="btn btn-sm btn-dark mb-2" onClick={nextQuestionFunc}>Next Question</button>
                                    <button type="button" class="btn btn-sm btn-dark mb-2" onClick={postQuizFunc}>Post quiz</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AddQuestion;