import React, { createContext } from "react";

export const QuizProvider = createContext();

class QuizContext extends React.Component {
    constructor() {
        super();
        this.state = {
            isattempt: false,
            attemptQuiz: this.attemptQuiz,
            quizobj: {}
        };
    }

    attemptQuiz = (quiz) => {
        this.setState({ isattempt: true });
        Object.assign(this.state.quizobj, quiz);
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        requestFullScreen.call(docEl);
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