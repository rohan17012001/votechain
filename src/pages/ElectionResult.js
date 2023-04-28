import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const ElectionResult = () => {
  const electionid = localStorage.getItem("closedelectionid");
  const hasvoted=localStorage.getItem("hasvoted");
  const [electionresults, setElectionResults] = useState([]);
  const [hash, setHash] =useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getElectionResults();
  }, []);
  // let voteanalytics
  const data = [["Candidates", "No. of votes"]];
  let getElectionResults = async () => {
    setLoading(true);
    let response = await fetch("/api/getElectionResult/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        election_id: parseInt(electionid),
      }),
    });
    const elecres = await response.json();
    setElectionResults(elecres);
    setLoading(false);
    console.log('Received Election Result');
  };
  let getChoicefromhash = async()=>{
    let response=await fetch("/api/verifyVote/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        election_id: parseInt(electionid),
        hash: hash
      }),
    })
    let data=await response.json()
    if(response.status===200){
    alert('You voted for '+data.choice.name)}
    else{
      alert('Please enter the hash of the vote which you received after casting vote in THIS election.')
    }
  }
  // console.log(electionresults);
  const votes = electionresults.votes;
  const candidates = electionresults.choices;
  // console.log(candidates)
  // console.log(votes)
  let winnervotes = 0;
  let winnername = [];
  // alert(voteanalytics["choices"])
  let totalvotes = 0;
  for (let i = 0; i < votes?.length; i++) {
    data.push([candidates[i].name, votes[i]]);
    // console.log(candidates[i].name);
    // console.log(votes[i]);
    totalvotes += votes[i];
    if (winnervotes < votes[i]) {
      winnervotes = votes[i];
    }
  }
  for (let i = 0; i < votes?.length; i++) {
    if (votes[i] == winnervotes) {
      winnername.push(candidates[i].name);
      if(i<votes?.length -1)
      winnername.push(', ')
    }
  }
  // console.log(winnername);
  // console.log(winnervotes);
  // for(let i=0; i<votes?.length; i++){
  //   console.log(votes[i])
  // }
  const options = {
    title: "Votes",
  };
  // let maxvote = 11;
  // let winner = "Work";
  const electionname = localStorage.getItem("electionname");
  const resgisteredvoters = totalvotes;
  const dateofelection = new Date(
    localStorage.getItem("electiondate")
  ).toLocaleString();
  // console.log(voteresult)
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 align="center" className="section-header">Results</h1>
      </div>
      <div className="election-info shadow p-2 mb-5 bg-body-tertiary rounded">
        <div className="row mx-5">
          <div className="col-md-6">
            <h5 className="body-font">Election Name: {electionname}</h5>
          </div>
          <div className="col-md-6">
            <h5 className="body-font">Registered Voters: {resgisteredvoters}</h5>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-md-6">
            <h5 className="body-font">Date: {dateofelection}</h5>
          </div>
          <div className="col-md-6">
            <h5 className="body-font">Total Votes: {totalvotes}</h5>
          </div>
        </div>
      </div>
      <div className="row mx-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="col-md-6 charts">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="col-md-6 charts">
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
            classname="bargraph"
          />
        </div>
      </div>
      <div className="row body-font">
        <div className="col-md-6 winners">
          <h3>Winner: {winnername}</h3>
        </div>
        <div className="col-md-6 winners">
          <h3>Votes: {winnervotes}</h3>
        </div>
      </div>
      <div>
        {(localStorage.getItem('hasvoted')==="true") && (
          <div className="successvote">
          <input
            type="email"
            className="form-control mt-1 body-font"
            placeholder="Enter your vote hash"
            onChange={(e)=>{
              setHash(e.target.value)
            }}
          />
          <button type="button" class="btn btn-primary body-font" onClick={getChoicefromhash}>
            Check your vote!
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

// return (
//   <div>
//     {loading === true ? (
//       <div className="loader">
//         <main>
//           <svg
//             class="ip"
//             viewBox="0 0 256 128"
//             width="256px"
//             height="128px"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stop-color="#5ebd3e" />
//                 <stop offset="33%" stop-color="#ffb900" />
//                 <stop offset="67%" stop-color="#f78200" />
//                 <stop offset="100%" stop-color="#e23838" />
//               </linearGradient>
//               <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
//                 <stop offset="0%" stop-color="#e23838" />
//                 <stop offset="33%" stop-color="#973999" />
//                 <stop offset="67%" stop-color="#009cdf" />
//                 <stop offset="100%" stop-color="#5ebd3e" />
//               </linearGradient>
//             </defs>
//             <g fill="none" stroke-linecap="round" stroke-width="16">
//               <g class="ip__track" stroke="#ddd">
//                 <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
//                 <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
//               </g>
//               <g stroke-dasharray="180 656">
//                 <path
//                   class="ip__worm1"
//                   stroke="url(#grad1)"
//                   stroke-dashoffset="0"
//                   d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
//                 />
//                 <path
//                   class="ip__worm2"
//                   stroke="url(#grad2)"
//                   stroke-dashoffset="358"
//                   d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
//                 />
//               </g>
//             </g>
//           </svg>
//         </main>
//       </div>
//     ) : (
//       <div>
//         <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
//           <h1 align="center">Results</h1>
//         </div>
//         <div className="election-info shadow p-2 mb-5 bg-body-tertiary rounded">
//           <div className="row mx-5">
//             <div className="col-md-6">
//               <p>Election Name: {electionname}</p>
//             </div>
//             <div className="col-md-6">
//               <p>Registered Voters: {resgisteredvoters}</p>
//             </div>
//           </div>
//           <div className="row mx-5">
//             <div className="col-md-6">
//               <p>Date: {dateofelection}</p>
//             </div>
//             <div className="col-md-6">
//               <p>Total Votes: {totalvotes}</p>
//             </div>
//           </div>
//         </div>
//         <div className="row mx-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
//           <div className="col-md-6 charts">
//             <Chart
//               chartType="PieChart"
//               data={data}
//               options={options}
//               width={"100%"}
//               height={"400px"}
//             />
//           </div>
//           <div className="col-md-6 charts">
//             <Chart
//               chartType="Bar"
//               width="100%"
//               height="400px"
//               data={data}
//               options={options}
//               classname="bargraph"
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6 winners">
//             <h3>Winner: {winnername}</h3>
//           </div>
//           <div className="col-md-6 winners">
//             <h3>Votes: {winnervotes}</h3>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );


export default ElectionResult;
