import Home from "./components/Home";

import { Route, BrowserRouter, Link, Routes } from "react-router-dom";

import FacultyDashboard from "./components/Dashboard/FacultyDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import StudentDashboard from "./components/Dashboard/StudentDashboard";

import AdminProfile from "./components/Dashboard/Admin/AdminProfile";
import AddAdmin from "./components/Dashboard/Admin/AddAdmin";
import AddStudent from "./components/Dashboard/Admin/AddStudent";
import AddFaculty from "./components/Dashboard/Admin/AddFaculty";
import Addsubject from "./components/Dashboard/Admin/AddSubject";
import AllStudents from "./components/Dashboard/Admin/AllStudents";
import AllAdmins from "./components/Dashboard/Admin/AllAdmins";
import AllFaculties from "./components/Dashboard/Admin/AllFaculties";
import AllSubjects from "./components/Dashboard/Admin/AllSubjects";
import StudentProfile from "./components/Dashboard/Student/StudentProfile";
import FacultyProfile from "./components/Dashboard/Faculty/FacultyProfile";
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";
import AddQuiz from "./components/Dashboard/Faculty/quiz/AddQuiz";
import QuizContext from "./components/Dashboard/Faculty/quiz/QuizContext";
import AllQuizzes from "./components/Dashboard/Faculty/quiz/AllQuizzes";
import CompletedQuizzes from "./components/Dashboard/Student/quiz/CompletedQuizzes";
import GiveQuiz from "./components/Dashboard/Student/quiz/GiveQuiz";
import QuizContextStudent from "./components/Dashboard/Student/quiz/QuizContext";
import SubmitQuery from "./components/Dashboard/Student/queries/SubmitQuery";
import UnsolvedQueries from "./components/Dashboard/Student/queries/UnsolvedQueries";
import SolvedQueries from "./components/Dashboard/Student/queries/SolvedQueries";
import QueriesSolvedByYou from "./components/Dashboard/Student/queries/QueriesSolvedByYou";
import QueriesSolved from "./components/Dashboard/Faculty/queries/QueriesSolved";
import QueriesWaiting from "./components/Dashboard/Faculty/queries/QueriesWaiting";
import QueriesWaitingForYou from "./components/Dashboard/Student/queries/QueriesWaitingForYou";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Routes related to admin */}
          <Route path="/admin-dashboard" element={<div><AdminDashboard /><AdminProfile /></div>}/>
          <Route path="/add-admin" element={<div><AdminDashboard /><AddAdmin /></div>}/>
          <Route path="/show-all-admins" element={<div><AdminDashboard /><AllAdmins /></div>}/>

          <Route path="/add-faculty" element={<div><AdminDashboard /><AddFaculty /></div>}/>
          <Route path="/show-all-faculties" element={<div><AdminDashboard /><AllFaculties/></div>} />

          <Route path="/add-student" element={<div><AdminDashboard /><AddStudent /></div>}/>
          <Route path="/show-all-students" element={<div><AdminDashboard /><AllStudents /></div>}/>

          <Route path="/add-subject" element={<div><AdminDashboard /><Addsubject /></div>}/>
          <Route path="/show-all-subjects" element={<div><AdminDashboard /><AllSubjects /></div>}/>


          {/* Routes related to faculty */}
          <Route path="/faculty-dashboard" element={<div><FacultyDashboard /><FacultyProfile /></div>} />

          {/* Routes related to student */}
          <Route path="/student-dashboard" element={<div><StudentDashboard /><StudentProfile /></div>} />

          {/*to add quiz*/}
          <Route path="/add-quiz" element={<QuizContext><FacultyDashboard /><AddQuiz /></QuizContext>} />

          {/* to retrieve all quizzes*/}
          <Route path="/all-quizzes" element={<><FacultyDashboard /><AllQuizzes /></>} />

          {/* to retrieve all completed quizzes*/}
          <Route path="/completed-quizzes" element={<><StudentDashboard /><CompletedQuizzes /></>} />

          {/* to retrieve all pending quizzes*/}
          <Route path="/pending-quizzes" element={<QuizContextStudent><GiveQuiz /></QuizContextStudent>} />

          {/* to retrieve all the queries solved by a faculty*/}
          <Route path="/queries-solved-by-faculty" element={<div><FacultyDashboard /><QueriesSolved /></div>} />

          {/* to retrieve all the queries waiting for a faculty*/}
          <Route path="/queries-waiting-for-faculty" element={<div><FacultyDashboard /><QueriesWaiting /></div>} />

          {/* to retrieve all solved queries */}
          <Route path="/solved-queries" element={<div><StudentDashboard /><SolvedQueries /></div>} />

          {/* to submit a query*/}
          <Route path="/submit-query" element={<div><StudentDashboard /><SubmitQuery /></div>} />

          {/* to retrieve all unsolved queries */}
          <Route path="/unsolved-queries" element={<div><StudentDashboard /><UnsolvedQueries /></div>} />

          {/* to retrieve all the queries solved by a student*/}
          <Route path="/queries-solved-by-student" element={<div><StudentDashboard /><QueriesSolvedByYou /></div>} />

          {/* to retrieve all the queries waiting for a  student*/}
          <Route path="/queries-waiting-for-student" element={<div><StudentDashboard /><QueriesWaitingForYou /></div>} />

          {/* not found for all other paths*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
