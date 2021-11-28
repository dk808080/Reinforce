import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import NotAuthorized from "../../NotAuthorized";
import { userType } from "../../../utils/auth";
import getServerUrl from "../../../utils/ServerUrl";
import setAuthToken from "../../../utils/setAuthToken";

function AddStudent() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [dob, setDob] = useState('')
    const [year, setYear] = useState('')
    const [semester, setSemester] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [url, seturl] = useState(undefined);
    const [image, setimage] = useState("");

    useEffect(() => {
        if (url) {
            uploadFields();
        }
    }, [url]);

    /*
       Purpose = to upload image in cloudinary image store
       Input = image
       Output = url of uploaded image
   */
    const uploadPic = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Reinforce-app");
        data.append("cloud_name", "reinforce-image-store");
        fetch("https://api.cloudinary.com/v1_1/reinforce-image-store/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                seturl(data.url);
            })
            .catch(err => {
                console.log(err);
            });

    }

    const uploadFields = () => {
        const student = {
            name,
            email,
            department,
            dob,
            contactNumber,
            gender,
            year,
            semester,
            avatar: url
        };
        //console.log(student);
        if (contactNumber.length !== 10) {
            swal("", "Contact number must contain 10 digits", "info");
        }
        else {
            setAuthToken();
            axios
                .post(`${getServerUrl()}/api/admin/add-student`, student)
                .then((res) => {
                    swal("Student Added!", "You added a new student!", "success").then((value) => {
                        navigate("/admin-dashboard");
                    });

                })
                .catch((err) => {
                    console.log(err);
                    swal("", "All the fields are mandatory except photo", "info");
                });
        }
    }

    // for adding new student
    function addStudentFunc(e) {
        e.preventDefault();
        if (image) {
            uploadPic();
        }
        else {
            uploadFields();
        }

    }
    return (
        <div>
            {userType() === "ADM" ?
                <section class="slice pt-md-4 pb-5 pb-0 ml-5 mr-5 mt-4 mb-6" style={{ borderRadius: "1%" }}>
                    <form role="form" onSubmit={addStudentFunc}>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Student name</label>
                                    <input class="form-control" type="text" placeholder="Enter student's name" onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Year</label>
                                    <input class="form-control" type="text" placeholder="Year of study" onChange={(e) => setYear(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Date of birth</label>
                                    <input type="date" class="form-control" data-toggle="date" placeholder="Birth date" onChange={(e) => setDob(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Semester</label>
                                    <input class="form-control" type="text" placeholder="current semester" onChange={(e) => setSemester(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Gender</label>
                                    <select class="custom-select" onChange={(e) => setGender(e.target.value)}>
                                        <option disabled selected>Select option</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Rather not say">Rather not say</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Department</label>
                                    <select class="custom-select" onChange={(e) => setDepartment(e.target.value)}>
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
                                    <label class="form-control-label">Email</label>
                                    <input class="form-control" type="email" placeholder="abc@exmaple.com" onChange={(e) => setEmail(e.target.value)} />
                                    <small class="form-text text-muted mt-2">This is the main email address that we'll send notifications.</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Contact Number</label>
                                    <input class="form-control" type="text" placeholder="Enter admin's contact no." onChange={(e) => setContactNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label">Profile picture</label>
                                    <br />
                                    <div class="btn btn-secondary">
                                        <input type="file" name="myfile" id="myfile" onChange={(e) => setimage(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="text-right">
                                    <button type="submit" class="btn btn-sm btn-dark">Add Student</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </section> : <NotAuthorized />}
        </div>
    );
}
export default AddStudent;