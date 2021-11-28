import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { getLoggedInUser, userType } from "../../../../utils/auth";
import NotAuthorized from "../../../NotAuthorized";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

function SubmitQuery() {
    const [title, setTitle] = useState("");
    const [askedTo, setAskedTo] = useState("");
    const [recipient, setRecipient] = useState("");
    const [body, setBody] = useState("");
    const [profile, setProfile] = useState({});
    const [allStudents, setAllStudents] = useState([]);
    const [allFaculties, setAllFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setProfile(getLoggedInUser());
        setLoading(false);
    }, []);

    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-students`).then((res) => {
            setAllStudents(res.data.result);

        }).catch((err) => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-faculties`).then((res) => {
            setAllFaculties(res.data.result);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    // to remove currently loggedin student's name from list of student he can ask query to
    const studentList = allStudents.filter((student) => {
        if (student.registrationNumber !== profile.registrationNumber) {
            return student;
        }
    }).map((student) => {
        return (
            <option value={
                student.registrationNumber
            }>
                {
                    student.registrationNumber
                }
                ({
                    student.name
                })</option>
        );
    })

    const facultyList = allFaculties.map((faculty) => {
        return (
            <option value={
                faculty.registrationNumber
            }>
                {
                    faculty.registrationNumber
                }
                ({
                    faculty.name
                })</option>
        );
    })

    // to submit a new query
    function submitQueryFunc() {
        const query = {
            askedBy: profile.registrationNumber,
            recipient,
            askedTo,
            title,
            body
        }
        setAuthToken();
        // console.log(query);
        axios.post(`${getServerUrl()}/api/query/submit-query`, query).then((res) => {
            swal("Submitted Successfully!", "Your query is sumitted successfully", "success").then((value) => {
                navigate("/student-dashboard")
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <div style={{ textAlign: "center" }}>
            {userType() === "STU"? loading ? <div style={{ height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> :
                <section class="slice pl-4 pr-4 pt-md-4 pb-5 pb-0 mt-3" style={{ borderRadius: "1%", display: "inline-block" }}>
                    <form role="form" onSubmit={submitQueryFunc} style={{ textAlign: "justify" }}>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label text-dark">Your Registration Number</label>
                                    <input class="form-control" type="text"
                                        value={
                                            profile.registrationNumber
                                        }
                                        disabled />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label text-dark">Your Name</label>
                                    <input class="form-control" type="text"
                                        value={
                                            profile.name
                                        }
                                        disabled />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label text-dark">Ask query to</label>
                                    <select class="custom-select"
                                        onChange={
                                            (e) => setRecipient(e.target.value)
                                        }>
                                        <option disabled selected>Select option</option>
                                        <option value="Faculty">Faculty</option>
                                        <option value="Student">Student</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label text-dark">Choose {recipient}</label>
                                    {
                                        recipient === "Faculty" ? <select class="custom-select"
                                            onChange={
                                                (e) => setAskedTo(e.target.value)
                                            }>
                                            <option disabled selected>Select option</option>
                                            {facultyList} </select> : <select class="custom-select"
                                                onChange={
                                                    (e) => setAskedTo(e.target.value)
                                                }>
                                            <option disabled selected>Select option</option>
                                            {studentList} </select>
                                    } </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label text-dark">Title of query</label>
                            <input class="form-control" type="text" placeholder="Title of query"
                                onChange={
                                    (e) => setTitle(e.target.value)
                                } />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label text-dark">Query</label>
                            <textarea class="form-control" type="text" placeholder="Write your query here" rows="4" cols="50"
                                onChange={
                                    (e) => setBody(e.target.value)
                                } />
                        </div>
                        <div class="text-right">
                            <button type="button" class="btn btn-sm btn-dark"
                                onClick={submitQueryFunc}>Submit Query</button>
                        </div>
                    </form>
                </section> : <NotAuthorized />
            }
        </div>
    );
}

export default SubmitQuery;
