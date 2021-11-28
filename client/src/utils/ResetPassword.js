import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import getServerUrl from "./ServerUrl";

function Resetpassword(props) {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const navigate = useNavigate();

    // to reset password 
    function resetPasswordFunc(e) {
        e.preventDefault();
        const resetPasswordObj = {
            otp,
            newPassword,
            confirmNewPassword,
            email: props.email
        }
        if (newPassword !== confirmNewPassword) {
            swal("Oops", "Password mismatch!!", "error");
        }
        else if (newPassword.length < 6) {
            swal("Oops", "Password must contain at least six character!!", "info");
        }
        else {
            let requesturl = "";
            if (props.userType === "STU") {
                requesturl = `${getServerUrl()}/api/student/reset-password`;
            }
            else if (props.userType === "FAC") {
                requesturl = `${getServerUrl()}/api/faculty/reset-password`;
            }
            else if (props.userType === "ADM") {
                requesturl = `${getServerUrl()}/api/admin/reset-password`;
            }
            axios
                .post(requesturl, resetPasswordObj)
                .then((res) => {
                    swal("Great", "Password Changed successfully!", "success").then((value) => {
                        navigate("/");
                        window.location.reload(true);
                    })
                })
                .catch((err) => {
                    swal("Oops", "Invalid OTP, check your email again", "error")
                    console.log(err);
                });
        }
    }

    return (
        <div style={{ textAlign: "center" }} >
            <section class="slice pl-4 pr-4 pt-md-4 pb-5 pb-0 mt-3" style={{ borderRadius: "1%", display: "inline-block" }}>
                <form role="form" style={{ textAlign: "justify" }} >
                    <div class="form-group">
                        <label class="form-control-label text-dark">New password</label>
                        <input class="form-control" type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label text-dark">Confirm new password</label>
                        <input class="form-control" type="password" placeholder="Confirm new password" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label text-dark">OTP</label>
                        <input class="form-control" type="text" placeholder="Enter OTP here" onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-sm btn-dark" onClick={resetPasswordFunc}>Reset Password</button>
                    </div>
                </form >
            </section >
        </div >
    );
}

export default Resetpassword;