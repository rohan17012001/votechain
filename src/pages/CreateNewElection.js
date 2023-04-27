import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import EnterCandidate from "./EnterCandidate";
const CreateNewElection = () => {
  const navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [choiceno, setChoiceNo] = useState();
  const [candidate, setCandidate] = useState([]);
  const [loading, setLoading] = useState(false);
  const setCandidates = (e) => {
    const candidateno = e.target.value;
    setChoiceNo(candidateno);
    if (candidateno > 0) {
      const generateArrays = Array.from(Array(Number(e.target.value)).keys());
      console.log(generateArrays);
      setCandidate(generateArrays);
    } else {
      setCandidate([]);
    }
  };
  function addCandidate() {
    return candidate.map((cand) => (
      <div className="form-group mt-3">
        <label>Candidate #{cand + 1}:</label>
        <input
          type="text"
          className="form-control mt-1 body-font"
          placeholder="Candidate Name"
          // value={title}
          onChange={(e) => {
            candidate[cand] = e.target.value;
            // console.log(candidate[cand])
          }}
        />
      </div>
    ));
  }
  const createElection = async (e) => {
    e.preventDefault();
    if (title.trim().length && choiceno) {
      setLoading(true);
      console.log(title + " " + choiceno + " " + candidate);
      let response = await fetch("/api/createNewElection/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          number_of_choices: parseInt(choiceno),
          choices: candidate,
        }),
      });
      let data = await response.json();
      console.log('New election created???');
      setLoading(false);
      // alert(data);

      setTitle("");
      setChoiceNo();
      if(response.status===200){
        localStorage.setItem('createelection', data.election.id)
        console.log('Election Created!!!!')
        navigate('/election-creation-success')
      }
    } else {
      alert("Please fill values");
    }
  };
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
        <div className="Auth-form-container mt-5">
          <form className="Auth-form">
            <div className="Auth-form-content ">
              <h3 className="Auth-form-title">Create New Election</h3>
              <div className="form-group mt-3">
                <label>Election Title:</label>
                <input
                  type="text"
                  className="form-control mt-1 body-font"
                  placeholder="e.g Student Council Elections"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label>No. of Choices</label>
                <input
                  type="number"
                  className="form-control mt-1 body-font"
                  placeholder="should be greater than 2"
                  value={choiceno}
                  onChange={setCandidates}
                />
              </div>
              <div>{candidate.length ? addCandidate() : null}</div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary body-font" onClick={createElection}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNewElection;
