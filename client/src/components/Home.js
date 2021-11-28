import React, { useEffect, useState } from "react";
import AdminLogin from "./Login/AdminLogin";
import FacultyLogin from "./Login/FacultyLogin";
import StudentLogin from "./Login/StudentLogin";
import { userType } from "../utils/auth";

function Home() {
    var [dashboard, setDashboard] = useState("");
    useEffect(() => {
        let type = userType();
        if (type === "STU") {
            setDashboard("/student-dashboard");
        }
        else if (type === "FAC") {
            setDashboard("/faculty-dashboard");
        }
        else if (type === "ADM") {
            setDashboard("/admin-dashboard");
        }
        else {
            setDashboard("none");
        }
    });
    return (
        <div>
            <nav class="navbar navbar-horizontal navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img style={{ width: "90px", height: "90px" }} alt="Image placeholder" src="../../assets/img/logo.png" id="navbar-logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-info" aria-controls="navbar-info" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar-info">

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#about">
                                    About
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#login">
                                    Login
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#contact">
                                    Contact
                                </a>
                            </li>
                        </ul>
                        <div class="order-lg-4 ml-lg-3">
                            <a class="" href={`${dashboard === "none" ? "/" : dashboard}`}>
                                <span class="avatar rounded-circle">
                                    <img alt="Image placeholder" src="../../assets/img/person-auth.jpg" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <section id="about" class="card bg-section-dark border-0 rounded-lg" style={{ maxWidth: "100%" }}>
                <div class="card-body px-5">
                    <div class="d-flex align-items-center align-items-center mb-3">
                        <div>
                            <div class="icon icon-sm icon-shape bg-warning text-white rounded-circle mr-3">
                                <i data-feather="airplay"></i>
                            </div>
                        </div>
                        <span class="h6 text-white mb-0">Reinforce</span>
                    </div>
                    <h5 class="text-white pt-4"> What is Lorem Reinforce?</h5>
                    <p class="text-white opacity-8">
                        This web project aim to facilitate posting and auto-grading the quizzes for students by faculties.
                        <br />It also has an admin panel that is the super user of the website.
                        <br /> Faculties can easily post their quizzes to a student group on a single mouse button click and students are notified via a email.
                        <br />Student can put their queries to faculties and fellow students.
                    </p>
                </div>
            </section>
            <section style={{ display: "flex", padding: "3rem", alignItems: "center", justifyContent: "center" }} id="login">
                <div style={{ margin: "1rem" }}>
                    <button type="button" class="btn btn-soft-dark" data-toggle="modal" data-target="#adminModal">
                        Login as Admin
                    </button>

                    <div class="modal fade" id="adminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Admin Login</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <AdminLogin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ margin: "1rem" }}>
                    <button type="button" class="btn btn-soft-dark" data-toggle="modal" data-target="#facultyModal">
                        Login as Faculty
                    </button>

                    <div class="modal fade" id="facultyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Faculty Login</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <FacultyLogin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ margin: "1rem" }}>
                    <button type="button" class="btn btn-soft-dark" data-toggle="modal" data-target="#studentModal">
                        Login as Student
                    </button>

                    <div class="modal fade" id="studentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <StudentLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="card shadow-lg border-0" style={{ maxWidth: "100%" }} id="contact">
                <div class="card-body px-5 py-5 text-center text-md-left">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h5 class="mb-2">Do you gave any questions about Reinforce.</h5>
                            <h6>
                                Email us on : <b className="text-dark">reinfrocereinforce@gmail.com</b>
                            </h6>
                            <p class="mb-0">
                                Our support team is available for you anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
