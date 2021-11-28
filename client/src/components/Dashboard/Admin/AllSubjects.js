import React, { useState, useEffect } from "react";
import axios from "axios";
import { userType } from "../../../utils/auth";
import NotAuthorized from "../../NotAuthorized";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function AllSubjects() {
    var [subjects, setSubjects] = useState([]);
    var [allSubjects, setAllSubjects] = useState([]);
    const [departmentChosen, setDepartmentChosen] = useState("");
    const [semesterChosen, setSemesterChosen] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-subjects`)
            .then((res) => {
                setAllSubjects(res.data.result);
                setSubjects(res.data.result);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    // to filter subjects based on chosen department and semester
    function searchByDeptSemester(e) {
        e.preventDefault();
        if (departmentChosen === "ALL" && semesterChosen === "ALL") {
            setAllSubjects(subjects);
        }
        else if (departmentChosen === "ALL" && semesterChosen !== "ALL") {
            var subjectsBySemester = subjects.filter(function (ele) {
                return ele.semester == semesterChosen;
            });
            setAllSubjects(subjectsBySemester);
        }
        else if (departmentChosen !== "ALL" && semesterChosen === "ALL") {
            var subjectsByDept = subjects.filter(function (ele) {
                return ele.department == departmentChosen;
            });
            setAllSubjects(subjectsByDept);
        }
        else {
            var subjectsByDeptAndSemester = subjects.filter(function (ele) {
                return ele.department == departmentChosen && ele.semester == semesterChosen;
            });
            setAllSubjects(subjectsByDeptAndSemester);
        }
    }
    const allSubjectList = allSubjects.map((ele, i) => {
        return (
            <tr>
                <th scope="row">{i}</th>
                <td>{ele.subjectCode}</td>
                <td>{ele.subjectName}</td>
                <td>{ele.department}</td>
                <td>{ele.year}</td>
                <td>{ele.semester}</td>
                <td>{ele.totalLectures}</td>
            </tr>
        );
    });
    return (
        <>
            {userType() === "ADM"? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> :
                <div>
                    <section class="pt-md-4 pb-3 ml-5 mr-5 mt-5" style={{ borderRadius: "1%" }}>
                        <div class="row">
                            <div class="col-md-4 mt-1">
                                <select class="custom-select" onChange={(e) => setDepartmentChosen(e.target.value)}>
                                    <option disabled selected>Coose Department</option>
                                    <option value="ALL">ALL</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                </select>
                            </div>
                            <div class="col-md-4 mt-1">
                                <select class="custom-select" onChange={(e) => setSemesterChosen(e.target.value)}>
                                    <option disabled selected>Choose Semester</option>
                                    <option value="ALL">ALL</option>
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
                            <div class="col-md-4 mt-1">
                                <button type="button" class="btn btn-dark" onClick={searchByDeptSemester}>
                                    Show Subjects
                                </button>
                            </div>
                        </div>
                    </section>

                    <section class="slice pt-md-4 pb-5 pb-0 ml-5 mr-5  mb-6" style={{ borderRadius: "1%",maxWidth:"100%", overflowX:"scroll" }}>
                        <table class="table table-cards ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Subject Code</th>
                                    <th scope="col">Subject Name</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Total Lectures</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSubjectList}
                            </tbody>
                        </table>
                    </section>
                </div> : <NotAuthorized />
            }
        </>
    );
}

export default AllSubjects;