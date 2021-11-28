import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getLoggedInUser, logOutUser, userType } from "../../utils/auth";

function AdminDashboard() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        setProfile(getLoggedInUser());
    }, []);

    function logout(e) {
        e.preventDefault();
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
        <div style={{ borderBottom: "1px solid #0a081f" }}>
            {userType() === "ADM" ?
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
                                        Admin
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="/add-admin">Add admin</a>
                                        <a class="dropdown-item" href="/show-all-admins">Show all admins</a>
                                    </div>
                                </li>
                                <li class="nav-item nav-item-spaced dropdown dropdown-animate" data-toggle="hover">
                                    <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Faculty
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="/add-faculty">Add faculty</a>
                                        <a class="dropdown-item" href="/show-all-faculties">Show all faculties</a>
                                    </div>
                                </li>
                                <li class="nav-item nav-item-spaced dropdown dropdown-animate" data-toggle="hover">
                                    <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Student
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="/add-student">Add student</a>
                                        <a class="dropdown-item" href="/show-all-students">Show all student</a>
                                    </div>
                                </li>
                                <li class="nav-item nav-item-spaced dropdown dropdown-animate" data-toggle="hover">
                                    <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subject
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="/add-subject">Add subject</a>
                                        <a class="dropdown-item" href="/show-all-subjects">Show all subjects</a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false"
                                        onClick={logout}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                            <div class="order-lg-4 ml-lg-3">
                                <a class="" href="/admin-dashboard">
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

export default AdminDashboard;
