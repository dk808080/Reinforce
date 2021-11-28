import React, { useState, useEffect } from "react";
import axios from "axios";
import { userType } from "../../../utils/auth";
import NotAuthorized from "../../NotAuthorized";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function AllFaculties() {
    var [faculties, setFaculties] = useState([]);
    var [allFaculties, setAllFaculties] = useState([]);
    const [departmentChosen, setDepartmentChosen] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-faculties`)
            .then((res) => {
                setAllFaculties(res.data.result);
                setFaculties(res.data.result);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    //to filter faculties based on chosen department
    function searchByDept(e) {
        e.preventDefault();
        if (departmentChosen === "ALL") {
            setAllFaculties(faculties);
        }
        else {
            var facultiesByDept = faculties.filter(function (ele) {
                return ele.department == departmentChosen;
            });
            setAllFaculties(facultiesByDept);
            console.log(facultiesByDept);
        }
    }
    const allFacultyList = allFaculties.map((ele, i) => {
        return (
            <tr>
                <th scope="row">{i}</th>
                <td>{ele.registrationNumber}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.contactNumber}</td>
                <td>{ele.dob}</td>
                <td>{ele.gender}</td>
                <td>{ele.department}</td>
                <td>{ele.designation}</td>
            </tr>
        );
    });
    return (
        <>
            {userType() === "ADM" ? loading ? <div style={{ textAlign: "center", height: "100vh" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> :
                <div>
                    <section class="pt-md-4 pb-3 ml-5 mr-5 mt-5" style={{ borderRadius: "1%" }}>
                        <div class="row">
                            <div class="col-md-4 mt-1">
                                <select class="custom-select" onChange={(e) => setDepartmentChosen(e.target.value)}>
                                    <option disabled selected>Choose Department</option>
                                    <option value="ALL">ALL</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                </select>
                            </div>
                            <div class="col-md-4 mt-1">
                                <button type="button" class="btn btn-dark" onClick={searchByDept}>
                                    Show Faculties
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
                                    <th scope="col">DOB</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Designation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFacultyList}
                            </tbody>
                        </table>
                    </section>
                </div> : <NotAuthorized />
            }
        </>
    );
}

export default AllFaculties;