import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import NotAuthorized from "../../NotAuthorized";
import { userType } from "../../../utils/auth";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function Addsubject() {
    const navigate = useNavigate();

    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [year, setYear] = useState('');
    const [totalLectures, setTotalLectures] = useState('');

    // for adding new subject 
    function addSubjectFunc(e) {
        e.preventDefault();
        const subject = {
            subjectCode,
            subjectName,
            department,
            semester,
            year,
            totalLectures
        };
        setAuthToken();
        axios
            .post(`${getServerUrl()}/api/admin/add-subject`, subject)
            .then((res) => {
                swal("Subject Added!", "You added a new subject!", "success").then((value) => {
                    navigate("/admin-dashboard");
                });

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {userType() === "ADM" ?
                <section class="slice pt-md-4 pb-5 pb-0 ml-5 mr-5 mt-4 mb-6" style={{ borderRadius: "1%" }}>
                    <form role="form" onSubmit={addSubjectFunc}>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Subject Name</label>
                                    <input class="form-control" type="text" placeholder="Enter subject name" onChange={(e) => setSubjectName(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Subject Code</label>
                                    <input class="form-control" type="text" placeholder="Enter subject code" onChange={(e) => setSubjectCode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Semester</label>
                                    <input class="form-control" type="text" placeholder="semester" onChange={(e) => setSemester(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Year</label>
                                    <input class="form-control" type="text" placeholder="year" onChange={(e) => setYear(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Total lectures</label>
                                    <input type="text" class="form-control" data-toggle="date" placeholder="Number of total lectures" onChange={(e) => setTotalLectures(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Department</label>
                                    <select class="custom-select" onChange={(e) => setDepartment(e.target.value)} >
                                        <option disabled selected>Select option</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <button type="submit" class="btn btn-sm btn-dark">Add Subject</button>
                        </div>
                    </form>
                </section> : <NotAuthorized />}
        </div>
    );
}

export default Addsubject;