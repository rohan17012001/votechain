import React, { useState, useEffect } from "react";
// import VotingArea from "./VotingArea";
// import ElectionResult from "./ElectionResult";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VoterPortal = () => {
  let navigate = useNavigate();
  
  const name = localStorage.getItem("name");
  let [runningpolls, setRunningpolls] = useState([]);
  let [completedpolls, setCompletedpolls] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    let getRunningpolls = async () => {
      try {
        let response = await fetchWithTimeout("/api/getOngoingVOterElections/", {
          timeout: 30000,
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
        console.log("Fetched some ongoing election for you!!!");
        setRunningpolls(data);
      } catch (error) {
        alert("Error: Request Timed out! Please try again");
        navigate("/voter-portal");
      }
    };
    let getCompletedpolls = async () => {
      let response = await fetch("/api/getClosedVoterElections/", {
        credentials: "include",
        method: "POST",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voter_id: parseInt(id),
        }),
      });
      let data = await response.json();
      console.log("Now you can see results for closed elections. Yippee!!");
      console.log(data)
      setCompletedpolls(data);
    };
    getRunningpolls();
    getCompletedpolls();
  }, []);
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 31000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    return response;
  }
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="section-header">Hello {name} !</h1>
      </div>
      {/* <h1>Hello {name} !</h1> */}
      <div className="castvote shadow p-2 mb-5 bg-body-tertiary rounded">
        <h3 className="my-3 section-header">
          Running Elections - Cast your vote here!
        </h3>
        {runningpolls.map((poll, key) => {
          function getElectionDetails() {
            localStorage.setItem("electionid", poll.id);
            localStorage.setItem("electionname", poll.title);
            localStorage.setItem("electiondate", poll.created);
            // localStorage.setItem("electionchoices", poll.choices);
            // localStorage.setItem("electionchoicesname", poll.choices_name);
            // localStorage.setItem(")
          }
          if (poll.has_voted === false) {
            return (
              <div className="adminpolls unvoted" key={key}>
                <Link to="/voting-area" className="electionlink">
                  <div
                    className="vote-list-item votechoices"
                    onClick={getElectionDetails}
                  >
                    <h3>{poll.title}</h3>
                  </div>
                </Link>
              </div>
            );
          } else {
            return (
              <div className="adminpolls voted" key={key}>
                <div
                  className="vote-list-item text-success electionlink"
                  onClick={getElectionDetails}
                >
                  <div>
                    <h3>{poll.title}{" "}</h3>
                    <h4>
                      <i>Already Voted</i>
                    </h4>
                  </div>
                </div>
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
          return (
            <div className="results" key={key}>
              <Link to="/election-result" className="electionlink">
                <div
                  className="vote-list-item"
                  onClick={getClosedElectionDetails}
                >
                  <h3>{poll.title}</h3>
                  {(poll.has_voted === true) && (
                    <h4>
                      <i>Already Voted</i>
                    </h4>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoterPortal;
