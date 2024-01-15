import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import VoterPortal from "./VoterPortal";
// import { Routes } from "react-router-dom";

const VotingArea = () => {
  const electionid = localStorage.getItem("electionid");
  const id = localStorage.getItem("id");
  const [election, setElection] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let getelection = async () => {
      let response = await fetch("/api/getElection/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          election_id: electionid,
        }),
      });
      let data = await response.json();
      if (response.status !== 200) {
        alert("Voting Failed!!!\n Redirecting.....");
        window.location.reload(false);
      }
      // console.log(data);
      setElection(data);
    };
    getelection();
  }, [electionid]);
  
  //   const [election, setElection] = useState();
  //   const poll = localStorage.getItem("electionchoicesname");
  const name = localStorage.getItem("electionname");
  //   const choiceno = localStorage.getItem("electionchoices")
  //   const choicename = localStorage.getItem("electionchoicesname")
  //   let choicess=[]
  //   for(let i=0; i<choicename.length; i++){
  //     choicess.push(choicename[i])
  //   }
  //   console.log(choicess)
  // async function fetchWithTimeout(resource, options = {}) {
  //   const { timeout = 31000 } = options;

  //   const controller = new AbortController();
  //   const id = setTimeout(() => controller.abort(), timeout);

  //   const response = await fetch(resource, {
  //     ...options,
  //     signal: controller.signal,
  //   });
  //   clearTimeout(id);

  //   return response;
  // }
  
  const pp = election.choices_name;
  // console.log(pp);
  const candidates = pp;
  const choices = candidates?.map((vote) => {
    function choiceChose() {
      let choiceid, i;
      for (i = 0; i < election.choices.length; i++) {
        if (election.choices_name[i] === vote) break;
      }
      // console.log(i)
      //   choiceid = election.choices[i];
      choiceid = i;
      // console.log(choiceid);
      localStorage.setItem("choiceid", choiceid);
    }
    return (
      <div class="form-check">
        <input
          className="form-check-input "
          type="radio"
          name="selectedCandidate"
          id={vote}
          value={vote}
          onClick={choiceChose}
        />
        <label class="form-check-label body-font" for="selectedCandidate">
          {vote}
        </label>
      </div>
    );
  });
  const castVote = async () => {
    setLoading(true);
    let timeoutId = setTimeout(() => {
      alert("Voting Failed!!!\nTimeout");
      setLoading(false);
    }, 120000); // 1 minute timeout

    try {
      let response = await Promise.race([
        fetch("/api/castVote/", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            election_id: parseInt(electionid),
            choice_id: parseInt(localStorage.getItem("choiceid")),
            voter_id: parseInt(id),
          }),
        }),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Timeout")), 60000) // 1 minute timeout
        ),
      ]);

      clearTimeout(timeoutId);

      if (response) {
        let data = await response.json();
        // console.log(data);
        alert("successfully vote casted");
        setLoading(false);
        localStorage.removeItem("choiceid");
        navigate("/vote-success");
        localStorage.setItem("votehashe", data.hash);
      } else {
        alert("Voting Failed!!!\n There is a congestion in the blockchain network, please try again later");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("The blockchain network is busy, please try after some time!!!");
      setLoading(false);
    }
  };

  //   console.log(poll);
  return (
    <div>
      {loading === true ? (
        <div className="loader">
          <main>
            <svg
              class="ip"
              viewBox="0 0 256 128"
              width="256px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#5ebd3e" />
                  <stop offset="33%" stop-color="#ffb900" />
                  <stop offset="67%" stop-color="#f78200" />
                  <stop offset="100%" stop-color="#e23838" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stop-color="#e23838" />
                  <stop offset="33%" stop-color="#973999" />
                  <stop offset="67%" stop-color="#009cdf" />
                  <stop offset="100%" stop-color="#5ebd3e" />
                </linearGradient>
              </defs>
              <g fill="none" stroke-linecap="round" stroke-width="16">
                <g class="ip__track" stroke="#ddd">
                  <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                  <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                </g>
                <g stroke-dasharray="180 656">
                  <path
                    class="ip__worm1"
                    stroke="url(#grad1)"
                    stroke-dashoffset="0"
                    d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                  />
                  <path
                    class="ip__worm2"
                    stroke="url(#grad2)"
                    stroke-dashoffset="358"
                    d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                  />
                </g>
              </g>
            </svg>
          </main>
        </div>
      ) : (
        <div>
          <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <h1 align="center"className="section-header">Cast Your Vote</h1>
          </div>
          <div className="row electiondetails">
            <div className="col-md-6">
              <h3 className="section-header">Election Name: {name}</h3>
            </div>
            <div className="col-md-6">
              <h3 className="section-header">Total Votes Cast: {election.number_of_votes}</h3>
            </div>
          </div>
          <div className="Auth-form-container mt-5">
            <form className="Auth-form">
              <div className="Auth-form-content ">
                <h3 className="Auth-form-title">Choose your candidate:</h3>
                <div className="form-group mt-3">{choices}</div>
                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-primary body-font" onClick={castVote}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingArea;
