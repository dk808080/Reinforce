import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getLoggedInUser, logOutUser, userType } from "../../utils/auth";

function StudentDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(getLoggedInUser());
  }, []);

  function logout(e) {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to logout from Reinforce?",
      icon: "warning",
    })
      .then(willLogout => {
        if (willLogout) {
            logOutUser();
            navigate("/");
        }
      });
  }
  return (
    <div style={{borderBottom:"1px solid #0a081f"}}>
      {userType() === "STU" ?
        <nav class="navbar navbar-horizontal navbar-expand-lg navbar-light">
          <div class="container">
            <a class="navbar-brand" href="/">
              <img style={{ width: "90px", height: "90px" }} alt="Reinforce logo" src="../../assets/img/logo.png" id="navbar-logo" />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-info" aria-controls="navbar-info" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-info">

              <ul class="navbar-nav ml-auto">
                <li class="nav-item nav-item-spaced dropdown dropdown-animate" data-toggle="hover">
                  <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Quiz
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/pending-quizzes">Pending Quizzes</a>
                    <a class="dropdown-item" href="/completed-quizzes">Completed Quizzes</a>
                  </div>
                </li>
                <li class="nav-item nav-item-spaced dropdown dropdown-animate" data-toggle="hover">
                  <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Query
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/submit-query">Submit a query</a>
                    <a class="dropdown-item" href="/unsolved-queries">Your unsolved queries</a>
                    <a class="dropdown-item" href="/solved-queries">Your solved queries</a>
                    <a class="dropdown-item" href="/queries-waiting-for-student">Queries waiting for you</a>
                    <a class="dropdown-item" href="/queries-solved-by-student">Queries solved by you</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
              <div class="order-lg-4 ml-lg-3">
                <a class="" href="/student-dashboard">
                  <span class="avatar rounded-circle">
                    <img alt="Image placeholder" src={profile.avatar ? profile.avatar : "../../assets/img/person-auth.jpg"} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav> : <></>}
    </div>
  );
}

export default StudentDashboard;
