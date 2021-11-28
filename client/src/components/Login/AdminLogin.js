import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Resetpassword from "../../utils/ResetPassword";
import getServerUrl from "../../utils/ServerUrl";

function AdminLogin() {
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [emailId, setEmailId] = useState("");

    const navigate = useNavigate();

    // validate admin credentials for login
    function validate(event) {
        event.preventDefault();
        const admin = {
            registrationNumber: registrationNumber,
            password: password
        };
        console.log(admin);
        axios.post(`${getServerUrl()}/api/admin/login`, admin).then((res) => {
            document.cookie = "jwt" + "=" + res.data.jwt + ";";
            document.cookie = "user" + "=" + JSON.stringify(res.data.user) + ";";
            swal("Great", "Logged in successfully!", "success").then((value) => {
                navigate("/admin-dashboard");
                window.location.reload(true);
            })
        }).catch((err) => {
            swal("Oops", "Wrong registration number or password!", "error")
            console.log(err);
        });
    }
    // to send otp for reseting password
    function forgotPasswordFunc(e) {
        e.preventDefault();
        const forgotPasswordObj = {
            email: emailId
        }
        axios
            .post(`${getServerUrl()}/api/admin/forgot-password`, forgotPasswordObj)
            .then((res) => {
                swal("Great", "check your registered email for OTP!", "success").then((value) => {
                    setResetPassword(true);
                })
            })
            .catch((err) => {
                swal("Oops Email not found", "Please provide registered email!", "error")
                console.log(err);
            });
    }
    return (
        <div>
            {!forgotPassword ? (
                <div>
                    <section class="slice pl-5 pr-5 pt-md-4 pb-5 pb-0 bg-section-dark">
                        <form onSubmit={validate}>
                            <div class="form-group">
                                <label class="form-control-label">Registration Number</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" id="input-regno" placeholder="XXXXXX" onChange={(e) => setRegistrationNumber(e.target.value)} />
                                </div>
                            </div>
                            <div class="form-group mb-0">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <label class="form-control-label">Password</label>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" id="input-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div class="mb-2 text-right">
                                <a href="#" class="small text-muted text-underline--dashed border-primary" onClick={(e) => {
                                    e.preventDefault();
                                    setForgotPassword(true);
                                }} >Forgot password</a>
                            </div>
                            <div class="mt-4"><button type="submit" class="btn btn-sm btn-primary btn-icon rounded-pill">
                                <span class="btn-inner--text">Sign in</span>
                                <span class="btn-inner--icon"><i class="fas fa-arrow-right"></i></span>
                            </button></div>
                        </form>
                    </section>
                </div>) : !resetPassword ?
                <div>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Forgot Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <section class="slice pl-5 pr-5 pt-md-4 pb-5 pb-0 bg-section-dark">
                            <form onSubmit={forgotPasswordFunc}>
                                <div class="form-group">
                                    <label class="form-control-label">EmailId</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" class="form-control" id="input-regno" placeholder="Enter your registered emailId" onChange={(e) => setEmailId(e.target.value)} />
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <button type="submit" class="btn btn-sm btn-primary btn-icon rounded-pill">
                                        <span class="btn-inner--text">Forgot Password</span>
                                        <span class="btn-inner--icon"><i class="fas fa-arrow-right"></i></span>
                                    </button></div>
                            </form>
                        </section>
                    </div>
                </div>
                : <Resetpassword email={emailId} userType="ADM"/>}
        </div>
    );
}

export default AdminLogin;
