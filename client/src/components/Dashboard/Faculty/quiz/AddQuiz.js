import React, { useContext, useState, useEffect } from "react";
import { QuizProvider } from "./QuizContext";
import AddQuizInfo from "./AddQuizInfo";
import AddQuestion from "./AddQuestions";
import { userType } from "../../../../utils/auth";
import NotAuthorized from "../../../NotAuthorized";

function AddQuiz() {
  const obj = useContext(QuizProvider);

  return (<div>
    { userType() === "FAC"? !obj.isaddquestions ? (
      <AddQuizInfo />
    ) : (
      <AddQuestion />
    ) : <NotAuthorized />}
  </div>);
}

export default AddQuiz;