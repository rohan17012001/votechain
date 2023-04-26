import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPortal = () => {
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  let [runningpolls, setRunningpolls] = useState([]);
  let [completedpolls, setCompletedpolls] = useState([]);
  useEffect(() => {
    getRunningpolls();
    getCompletedpolls();
  }, []);
  let getRunningpolls = async () => {
    let response = await fetch("/api/getRunningPolls/");
    let data = await response.json();
    console.log(data);
    setRunningpolls(data);
  };
  let getCompletedpolls = async () => {
    let response = await fetch("/api/getClosedPolls/");
    let data = await response.json();
    console.log(data);
    setCompletedpolls(data);
  };
  const adminname = localStorage.getItem("name");
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1>Hello Admin {adminname} !</h1>
      </div>
      <div className="onlyadmins">
        <h2>Access Exclusive Admin-only functions:</h2>
        <div>
          <Link to="/create-new-election" className="electionlink">
            <h3>Create a new election</h3>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <div className="castvote shadow p-2 mb-5 bg-body-tertiary rounded mt-3">
            <h3>Running Elections - Cast your vote here!</h3>
            {runningpolls.map((poll, key) => {
              function getElectionDetails() {
                localStorage.setItem("electionid", poll.id);
                localStorage.setItem("electionname", poll.title);
                localStorage.setItem("electiondate", poll.created);
                // localStorage.setItem("electionchoices", poll.choices);
                localStorage.setItem("electionchoicesname", poll.choices_name);
              }
              if (poll.has_voted === false) {
                return (
                  <Link to="/voting-area" className="electionlink">
                    <div
                      key={key}
                      className="vote-list-item votechoices"
                      onClick={getElectionDetails}
                    >
                      <h3>{poll.title}</h3>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <div
                    key={key}
                    className="vote-list-item text-success"
                    onClick={getElectionDetails}
                  >
                    <h3>
                      {poll.title}{" "}
                      <h4>
                        <i>Already Voted</i>
                      </h4>
                    </h3>
                  </div>
                );
              }
            })}
          </div>
          <div className="resultportal shadow p-2 mb-5 bg-body-tertiary rounded">
            <h3>Completed Elections - Check Results Now!!!</h3>
            {completedpolls.map((poll, key) => {
              function getClosedElectionDetails() {
                localStorage.setItem("closedelectionid", poll.id);
                localStorage.setItem("electionname", poll.title);
                localStorage.setItem("electiondate", poll.created);
              }
              return (
                <Link to="/election-result" className="electionlink">
                  <div
                    key={key}
                    className="vote-list-item"
                    onClick={getClosedElectionDetails}
                  >
                    <h3>{poll.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
