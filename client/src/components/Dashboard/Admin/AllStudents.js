import React, { useEffect, useState } from "react";
import axios from "axios";
import { userType } from "../../../utils/auth";
import NotAuthorized from "../../NotAuthorized";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function AllStudents() {
    var [students, setStudents] = useState([]);
    var [allStudents, setAllStudents] = useState([]);
    const [departmentChosen, setDepartmentChosen] = useState("");
    const [yearChosen, setYearChosen] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-students`)
            .then((res) => {
                setAllStudents(res.data.result);
                setStudents(res.data.result);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    // to filter students based on chosen department and year
    function searchByDeptYear(e) {
        e.preventDefault();
        if (departmentChosen === "ALL" && yearChosen === "ALL") {
            setAllStudents(students);
        }
        else if (departmentChosen === "ALL" && yearChosen !== "ALL") {
            var studentsByYear = students.filter(function (ele) {
                return ele.year == yearChosen;
            });
            setAllStudents(studentsByYear);
        }
        else if (departmentChosen !== "ALL" && yearChosen === "ALL") {
            var studentsByDept = students.filter(function (ele) {
                return ele.department == departmentChosen;
            });
            setAllStudents(studentsByDept);
        }
        else {
            var studentsByDeptAndYear = students.filter(function (ele) {
                return ele.department == departmentChosen && ele.year == yearChosen;
            });
            setAllStudents(studentsByDeptAndYear);
        }
    }
    const allStudentList = allStudents.map((ele, i) => {
        return (
            <tr>
                <th scope="row">{i}</th>
                <td>{ele.registrationNumber}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.contactNumber}</td>
                <td>{ele.gender}</td>
                <td>{ele.dob}</td>
                <td>{ele.year}</td>
                <td>{ele.semester}</td>
                <td>{ele.department}</td>
            </tr>
        );
    });
    return (
        <>
            {userType() === "ADM"? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> :
                <div>
                    <section class="pt-md-4 pb-3 ml-5 mr-5 mt-4" style={{ borderRadius: "1%" }}>
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
                                <select class="custom-select" onChange={(e) => setYearChosen(e.target.value)}>
                                    <option disabled selected>Choose Year</option>
                                    <option value="ALL">ALL</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div class="col-md-4 mt-1">
                                <button type="button" class="btn btn-dark" onClick={searchByDeptYear}>
                                    Show students
                                </button>
                            </div>
                        </div>
                    </section>

                    <section class="slice pt-md-4 pb-5 pb-0 ml-5 mr-5  mb-6" style={{ borderRadius: "1%",maxWidth:"100%", overflowX:"scroll" }}>
                        <table class="table table-cards ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Registration Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allStudentList}
                            </tbody>
                        </table>
                    </section>
                </div> : <NotAuthorized />
            }
        </>
    );
}

export default AllStudents;