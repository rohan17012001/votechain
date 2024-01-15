import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  let [runningpolls, setRunningpolls] = useState([]);
  let [completedpolls, setCompletedpolls] = useState([]);
  useEffect(() => {
    getRunningpolls();
    getCompletedpolls();
  }, []);
  let getRunningpolls = async () => {
    let response = await fetch("/api/getOngoingVOterElections/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voter_id: parseInt(id),
      }),
    });
    let data = await response.json();
    console.log("Received ongoing elections");
    setRunningpolls(data);
  };
  let getCompletedpolls = async () => {
    let response = await fetch("/api/getClosedVoterElections/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voter_id: parseInt(id),
      }),
    });
    let data = await response.json();
    console.log("Received closed polls");
    setCompletedpolls(data);
  };
  const adminname = localStorage.getItem("name");
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="section-header">Hello Admin {adminname} !</h1>
      </div>
      <div className="onlyadmins">
        <h2 className="section-header">
          Access Exclusive Admin-only functions:
        </h2>
        <div>
          <Link to="/create-new-election" className="electionlink">
            <h3>Create a new election</h3>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <div className="castvote shadow p-2 mb-5 bg-body-tertiary rounded mt-3">
            <h3 className="my-3 section-header">
              Running Elections - Cast your vote here!
            </h3>
            {runningpolls.map((poll, key) => {
              function getElectionDetails() {
                localStorage.setItem("electionid", poll.id);
                localStorage.setItem("electionname", poll.title);
                localStorage.setItem("electiondate", poll.created);
                // localStorage.setItem("electionchoices", poll.choices);
                localStorage.setItem("electionchoicesname", poll.choices_name);
              }
              let closePoll = async () => {
                if (poll.number_of_votes === 0) {
                  alert(
                    "No votes have been cast in this election, can't close it for now."
                  );
                } else {
                  let response = await fetch("/api/closePoll/", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      voter_id: parseInt(id),
                      election_id: poll.id,
                    }),
                  });
                  let data = await response.json();
                  // alert('Election titled '+poll.title+' ended!')
                  window.location.reload(false);
                }
              };
              if (poll.has_voted === false) {
                return (
                  <div className="adminpolls unvoted">
                    <Link to="/voting-area" className="electionlink">
                      <div
                        key={poll.id}
                        className="vote-list-item votechoices"
                        onClick={getElectionDetails}
                      >
                        <h3>{poll.title}</h3>
                      </div>
                    </Link>
                    {/* <i
                      className="fa-solid fa-xmark fa-lg"
                      onClick={closePoll}
                    ></i> */}
                    <i
                      className="fa-sharp fa-regular fa-circle-xmark fa-2xl voteclose"
                      onClick={closePoll}
                    ></i>
                  </div>
                );
              } else {
                return (
                  <div className="adminpolls voted">
                    <div
                      key={key}
                      className="vote-list-item text-success electionlink"
                      onClick={getElectionDetails}
                    >
                      <h3>
                        {poll.title}{" "}
                        <h4>
                          <i>Already Voted</i>
                        </h4>
                      </h3>
                    </div>
                    {/* <i
                      className="fa-solid fa-xmark fa-lg voteclose"
                      onClick={closePoll}
                    ></i> */}
                    <i
                      className="fa-sharp fa-regular fa-circle-xmark fa-2xl voteclose"
                      onClick={closePoll}
                    ></i>
                  </div>
                );
              }
            })}
          </div>
          <div className="resultportal shadow p-2 mb-5 bg-body-tertiary rounded">
            <h3 className="my-3 section-header">
              Completed Elections - Check Results Now!!!
            </h3>
            {completedpolls.map((poll, key) => {
              function getClosedElectionDetails() {
                localStorage.setItem("closedelectionid", poll.id);
                localStorage.setItem("electionname", poll.title);
                localStorage.setItem("electiondate", poll.created);
                localStorage.setItem("hasvoted", poll.has_voted);
              }
              if (poll.has_voted === false) {
                return (
                  <div className="results">
                    <Link to="/election-result" className="electionlink">
                      <div
                        key={key}
                        className="vote-list-item"
                        onClick={getClosedElectionDetails}
                      >
                        <h3>{poll.title}</h3>
                      </div>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div className="results">
                    <Link to="/election-result" className="electionlink">
                      <div
                        key={key}
                        className="vote-list-item"
                        onClick={getClosedElectionDetails}
                      >
                        <h3>{poll.title}</h3>
                        <h4>
                          <i>Already Voted</i>
                        </h4>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
