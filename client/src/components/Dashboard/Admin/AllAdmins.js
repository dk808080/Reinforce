import axios from "axios";
import React, { useEffect, useState } from "react";
import { userType } from "../../../utils/auth";
import NotAuthorized from "../../NotAuthorized";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function AllAdmins() {

    var [admins, setAdmins] = useState([]);
    var [allAdmins, setAllAdmins] = useState([]);
    const [departmentChosen, setDepartmentChosen] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAuthToken();
        axios.get(`${getServerUrl()}/api/admin/all-admins`)
            .then((res) => {
                setAllAdmins(res.data.result);
                setAdmins(res.data.result);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    // to fiilter admins based on chosen department
    function searchByDept(e) {
        e.preventDefault();
        if (departmentChosen === "ALL") {
            setAllAdmins(admins);
        }
        else {
            var adminsByDept = admins.filter(function (ele) {
                return ele.department == departmentChosen;
            });
            setAllAdmins(adminsByDept);
            console.log(adminsByDept);
        }
    }
    const allAdminList = allAdmins.map((ele, i) => {
        return (
            <tr>
                <th scope="row">{i}</th>
                <td>{ele.registrationNumber}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.contactNumber}</td>
                <td>{ele.dob}</td>
                <td>{ele.department}</td>
            </tr>
        );
    });
    return (
        <>
            {userType() === "ADM" ? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> :
                <div>
                    <section class="pt-md-4 pb-3 ml-5 mr-5 mt-4" style={{ borderRadius: "1%" }}>
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
                                    Show Admins
                                </button>
                            </div>
                        </div>
                    </section>

                    <section class="slice pt-md-4 pb-5 pb-0 ml-5 mr-5  mb-6" style={{ borderRadius: "1%",maxWidth:"100%", overflowX:"scroll"}}>
                        <table class="table table-cards ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Registration Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAdminList}
                            </tbody>
                        </table>
                    </section>
                </div> : <NotAuthorized />
            }
        </>
    );
}

export default AllAdmins;