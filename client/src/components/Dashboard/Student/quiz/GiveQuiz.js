import React, { useContext } from "react";
import { QuizProvider } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import PendingQuizzes from "./PendingQuizzes";
import AttemptQuiz from "./AttemptQuiz";
import StudentDashboard from "../../StudentDashboard";

function GiveQuiz() {
    const obj = useContext(QuizProvider);
    const navigate = useNavigate();
    return (<div>
        {!obj.isattempt ? (
            <>
                <StudentDashboard />
                <PendingQuizzes />
            </>
        ) : (
            <AttemptQuiz 
            quiz={obj.quizobj}
            navigate={navigate}
             />
        )}
    </div>);
}

export default GiveQuiz;