import React, { Component, createContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

export const QuizProvider = createContext();

class QuizContext extends React.Component {
    constructor() {
        super();
        this.state = {
            isaddquestions: false,
            addQuiz: this.addQuiz,
            clickAddQuestions: this.clickAddQuestions,
            quizobj: {},
            questions: [],
            addQuestion: this.addQuestion,
            postQuiz: this.postQuiz,
        };
    }
    clickAddQuestions = () => {
        this.setState({ isaddquestions: true });
    };

    addQuiz = (quiz) => {
        Object.assign(this.state.quizobj, quiz);
        console.log(this.state.quizobj);
        this.clickAddQuestions();
    }

    // to post a new quiz
    postQuiz = (question, navigate) => {
        const newobj = this.state.quizobj;
        newobj.questions = this.state.questions;
        newobj.questions.push(question);
        Object.assign(this.state.quizobj, newobj);
        //console.log(this.state.quizobj);
        setAuthToken();
        axios.post(`${getServerUrl()}/api/faculty/add-quiz`, this.state.quizobj)
            .then((res) => {
                //console.log(res);
                swal("Quiz posted!", "You posted a new quiz!", "success")
                    .then((value) => navigate("/faculty-dashboard"));
            }).catch(err => {
                console.log(err);
                if (this.state.quizobj.purpose !== "") {
                    swal("Oops", "No student found in given semester and department", "error")
                }
                else {
                    swal("Oops", "Please add all quiz info fields", "error")
                }
            });
    }

    addQuestion = (question) => {
        this.setState({ questions: [...this.state.questions, question] });
    }

    render() {
        return (
            <QuizProvider.Provider value={{ ...this.state }}>
                {this.props.children}
            </QuizProvider.Provider>
        );
    }
}

export default QuizContext;