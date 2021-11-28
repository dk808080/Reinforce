import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NotAuthorized from "../../../NotAuthorized";
import { userType } from "../../../../utils/auth";
import getServerUrl from "../../../../utils/ServerUrl";
import setAuthToken from "../../../../utils/setAuthToken";

function QueriesSolvedByYou() {

    const [queries, setQueries] = useState([]);
    const [loading, setLaoding] = useState(true);
    const [searchTrem, setTerm] = useState("");

    useEffect(() => {
        setAuthToken();
        axios
            .get(`${getServerUrl()}/api/query/queries-solved-by-you`)
            .then((res) => {
                setQueries(res.data.result);
                setLaoding(false);
            })
            .catch((err) => {
                console.log(err);
                setLaoding(false);
            });
    }, []);

    // to filter list of queries based on searched term
    const queriesList = queries.filter((query) => {
        if (searchTrem === "") {
            return query;
        }
        else if (new Date(query.datePosted).toLocaleString().toString().includes(searchTrem.toLowerCase())
            || new Date(query.dateSolved).toLocaleString().toString().toLowerCase().includes(searchTrem.toLowerCase())
            || query.title.toLowerCase().includes(searchTrem.toLowerCase())
            || query.askedBy.toLowerCase().includes(searchTrem.toLowerCase())
            || query.body.toLowerCase().includes(searchTrem.toLowerCase())
            || query.solution.toLowerCase().includes(searchTrem.toLowerCase())) {
            return query;
        }
    }).map((query, i) => {
        return (
            <div id="accordion-2" class="accordion accordion-spaced">
                <div class="card">
                    <div class="card-header py-4" id={`heading-2-${i}`} data-toggle="collapse" role="button" data-target={`#collapse-2-${i}`} aria-expanded="false" aria-controls={`collapse-2-${i}`}>
                        <div className="mb-3">
                            Solved On : <span class="badge badge-soft-primary badge-pill">{new Date(query.dateSolved).toLocaleString()}</span>
                        </div>
                        <div className="mb-3">
                            Posted on : <span class="badge badge-soft-dark badge-pill">{new Date(query.datePosted).toLocaleString()}</span>
                        </div>
                        <p>Asked By : {query.askedBy}</p>
                    </div>
                    <div id={`collapse-2-${i}`} class="collapse" aria-labelledby={`heading-2-${i}`} data-parent="#accordion-2">
                        <div class="card-body">
                            <h6 class="mb-2">Title of query : {query.title}</h6>
                            <h6> Body of query : </h6>
                            <p>{query.body}</p>
                            <h6> Solution : </h6>
                            <p>{query.solution}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div class="ml-5 mr-5 mt-5">
            { userType() === "STU" ? loading ? <div style={{ textAlign: "center", height: "500px" }}><div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div> </div> : queries.length === 0 ?
                <div class="card bg-primary shadow-lg rounded-lg border-0">
                    <div class="px-4 py-5 text-center">
                        <div class="h3 text-white">
                            No queries solved by you yet!!
                        </div>
                        <Link to="/queries-waiting-for-student"><button type="button" class="btn btn-dark" >
                            See all queries waiting for you
                        </button></Link>
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

export default QueriesSolvedByYou;