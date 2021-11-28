import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { QuizProvider } from "./QuizContext";
import { getLoggedInUser } from "../../../../utils/auth";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";
import swal from "sweetalert";

function AddQuizInfo() {
    const [profile, setProfile] = useState({});
    const [department, setDepartment] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [semester, setSemester] = useState("");
    const [purpose, setPurpose] = useState("");
    const [subjectCodes, setSubjectCodes] = useState([]);

    const obj = useContext(QuizProvider);

    useEffect(() => {
        setProfile(getLoggedInUser());
    }, []);


    useEffect(() => {
        setAuthToken();
        axios
            .get(`${getServerUrl()}/api/faculty/get-subject-codes`)
            .then((res) => {
                console.log(res);
                setSubjectCodes(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const subjectCodeList = subjectCodes.map((code) => {
        return (
            <option value={code.subjectCode}>{code.subjectCode + " (" + code.subjectName + ") "}</option>
        );
    })

    function addQuizFunc(e) {
        e.preventDefault();
        if (subjectCode === "" || department === "" || semester === "" || purpose === "") {
            swal("Oops", "all fields are required", "warning")
        } else {
            const quiz = {
                facultyRegistrationNumber: profile.registrationNumber,
                facultyName: profile.name,
                subjectCode,
                department,
                semester,
                purpose
            }
            obj.addQuiz(quiz);
        }
    }

    return (
        <div>
            <section class="slice pl-4 pr-4 pt-md-4 pb-5 pb-0 mt-3 mr-5 ml-5" style={{ borderRadius: "1%" }}>
                <form role="form" onSubmit={addQuizFunc}>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label">Faculty Registration Number</label>
                                <input class="form-control" type="text" value={profile.registrationNumber} disabled />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label">Faculty Name</label>
                                <input class="form-control" type="text" value={profile.name} disabled />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label">Purpose</label>
                                <input class="form-control" type="text" placeholder="purpose" onChange={(e) => setPurpose(e.target.value)} />
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
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label">Semester</label>
                                <select class="custom-select" onChange={(e) => setSemester(e.target.value)} >
                                    <option disabled selected>Select option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label">Subject Code</label>
                                <select class="custom-select" onChange={(e) => setSubjectCode(e.target.value)} >
                                    <option disabled selected>Select option</option>
                                    {subjectCodeList}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-sm btn-dark" onClick={addQuizFunc}>Add Questions</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AddQuizInfo;