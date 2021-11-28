import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLoggedInUser, userType } from "../../../utils/auth";
import NotAuthorized from "../../NotAuthorized";

function FacultyProfile() {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(getLoggedInUser());
  }, []);

  return (
    <>
      {userType() === "FAC" ?
        <div class="row" style={{ margin: "3rem" }}>
          <div class="card text-center pt-4 col-md-4">
            <img alt="Image placeholder" src={profile.avatar ? profile.avatar : "../../assets/img/person-auth.jpg"} class="avatar rounded-circle avatar-lg" style={{ width: "15rem", height: "15rem", marginLeft: "auto", marginRight: "auto" }} />
            <div class="card-body">
              <h5 class="card-title">{profile.name}</h5>
              <p class="card-text">{profile.registrationNumber}</p>
            </div>
          </div>
          <div className="col-md-8" style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <table class="table table-dark col-md-8" style={{ borderRadius: "1%" }}>
              <tbody>
                <tr>
                  <td style={{ fontSize: "17px" }}>Name</td>
                  <td style={{ fontSize: "17px" }}>{profile.name}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Registration Number</td>
                  <td style={{ fontSize: "17px" }}>{profile.registrationNumber}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Email</td>
                  <td style={{ fontSize: "17px" }}>{profile.email}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Contact Number</td>
                  <td style={{ fontSize: "17px" }}>{profile.contactNumber}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Gender</td>
                  <td style={{ fontSize: "17px" }}>{profile.gender}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>DOB</td>
                  <td style={{ fontSize: "17px" }}>{profile.dob}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Department</td>
                  <td style={{ fontSize: "17px" }}>{profile.department}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "17px" }}>Designation</td>
                  <td style={{ fontSize: "17px" }}>{profile.designation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> : <NotAuthorized />}
    </>
  );
}

export default FacultyProfile;