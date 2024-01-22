import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const VoteSuccess = () => {
  const hash = localStorage.getItem("votehashe");
  let copyHash = () => {
    navigator.clipboard.writeText(hash);
  };
  const navigate = useNavigate();
  function goBack() {
    if (localStorage.getItem("admin") === "true") {
      navigate("/admin-portal");
    } else {
      navigate("/voter-portal");
    }
  }
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 align="center" className="section-header">Your Vote was successful!!!</h1>
      </div>
      <div className="successvote body-font">
        <h4>Vote Hash: {hash}</h4>
        <button type="button" className="btn btn-primary" onClick={copyHash}>
          Copy Hash
        </button>
      </div>
      <div className="sepolia my-5 body-font">
        <h4>
          Go to{" "}
          <a
            href="https://sepolia.etherscan.io/"
            target="_blank"
            rel="noopener"
            onClick={goBack}
            className="linknoline"
          >
            sepolia etherscan
          </a>{" "}
          to check your transaction status
        </h4>
      </div>
      <div className="sepolia my-5">
      <button type="button" className="btn btn-primary body-font" onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};

export default VoteSuccess;
