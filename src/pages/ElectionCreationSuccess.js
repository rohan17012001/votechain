import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ElectionCreationSuccess = () => {
  const navigate = useNavigate();
  const election_id = localStorage.getItem("createelection");
  const [election, setElection] = useState([]);
  useEffect(() => {
    getElection();
  }, []);
  const getElection = async () => {
    let response = await fetch("/api/getElection/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        election_id: parseInt(election_id),
      }),
    });
    let data = await response.json();
    console.log('Election created successfully');
    setElection(data);
  };
  // let choices=[]
  // for(let i=0; i<election.choices.length; i++){
  //     choices.push(election.choices_name[i])
  // }
  function goBack() {
    navigate("/admin-portal");
  }
  const date = new Date(election.created).toLocaleString();
  return (
    <div className="electionsuccess ">
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="section-header ">Election created successfully!</h1>
      </div>
      <div className="section-content">
        <h3>Election Title: {election.title}</h3>
        <h3>Date Created: {date}</h3>
        <h3>Number of Choices: {election.number_of_choices}</h3>
        <h3>
          Choices:{" "}
          <ul>
            {election.choices_name?.map((choice, key) => {
              return <li key={key}>{choice}</li>;
            })}
          </ul>
        </h3>
      
      <button type="button" class="btn btn-primary" onClick={goBack}>
        Back to Admin Panel
      </button>
      </div>
    </div>
  );
};

export default ElectionCreationSuccess;
