import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { userType } from "../../../../utils/auth";
import NotAuthorized from "../../../NotAuthorized";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

function QueriesWaiting() {

    const [queries, setQueries] = useState([]);
    const [loading, setLaoding] = useState(true);
    const [solution, setSolution] = useState("");
    const [searchTrem, setTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setAuthToken();
        axios
            .get(`${getServerUrl()}/api/query/queries-waiting`)
            .then((res) => {
                console.log(res);
                setQueries(res.data.result);
                setLaoding(false);
            })
            .catch((err) => {
                console.log(err);
                setLaoding(false);
            });
    }, []);

    // to submit solution of a query
    function SolveQueryFunc(queryId) {
        const querySolution = {
            queryId,
            solution
        }
        setAuthToken();
        axios
            .post(`${getServerUrl()}/api/query/solve-query`, querySolution)
            .then((res) => {
                swal("Solution submitted successfully!", "Your solution for the query is sumitted successfully", "success")
                    .then((value) => {
                        navigate("/faculty-dashboard")
                        window.location.reload(true);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // to filter list of queries based on searched term
    const queriesList = queries.filter((query) => {
        if (searchTrem === "") {
            return query;
        }
        else if (new Date(query.datePosted).toLocaleString().toString().includes(searchTrem.toLowerCase())
            || query.title.toLowerCase().includes(searchTrem.toLowerCase())
            || query.askedBy.toLowerCase().includes(searchTrem.toLowerCase())
            || query.body.toLowerCase().includes(searchTrem.toLowerCase())) {
            return query;
        }
    }).map((query, i) => {
        return (
            <div class="card">
                <div class="card-header py-4">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                Posted on : <span class="badge badge-soft-dark badge-pill">{new Date(query.datePosted).toLocaleString()}</span>
                            </div>
                            <p>Asked By : {query.askedBy}</p>
                        </div>
                        <div className="col-md-3">

                            <button type="button" class="btn btn-soft-dark" data-toggle="modal" data-target="#exampleModal">
                                See and Answer Query
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <h6 class="mb-2">Title of query : {query.title}</h6>
                                            <h6> Body of query : </h6>
                                            <p>{query.body}</p>
                                            <form role="form">
                                                <div class="form-group">
                                                    <h6> Enter Solution : </h6>
                                                    <textarea class="form-control" type="text" placeholder="Write your query here" rows="4" cols="50" onChange={(e) => {
                                                        setSolution(e.target.value);
                                                    }} />
                                                </div>
                                                <div className="text-right">
                                                    <button type="submit" class="btn btn-dark" onClick={(e) => {
                                                        e.preventDefault();
                                                        SolveQueryFunc(query._id)
                                                    }}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div class="ml-5 mr-5 mt-5">
            {userType() === "FAC" ? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> : queries.length === 0 ?
                <div class="card bg-primary shadow-lg rounded-lg border-0">
                    <div class="px-4 py-5 text-center">
                        <div class="h3 text-white">
                            No queries waiting for you!!
                        </div>
                        <p className="text-white">
                            You will be able to see queries here when students will send some query to you!!
                        </p>
                    </div>
                </div>
                :
                <div>
                    <div class="input-group" style={{ width: "18rem", margin: "0 auto 2rem auto" }} >
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search queries" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setTerm(e.target.value)} />
                    </div>
                    {queriesList}
                </div> : <NotAuthorized />
            }
        </div>
    );
}

export default QueriesWaiting;