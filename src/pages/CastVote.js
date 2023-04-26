import React from "react";

const candidates = ["Work", "Eat", "Commute", "Watch TV", "Sleep", "Potty"];
const choices = candidates.map((vote) => (
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="selectedCandidate"
      id={vote}
    />
    <label class="form-check-label" for="selectedCandidate">
      {vote}
    </label>
  </div>
));
const CastVote = () => {
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1 align="center">Cast Your Vote</h1>
      </div>
      <div className="row electiondetails">
        <div className="col-md-6">
          <h3>Election Name: Leader Election</h3>
        </div>
        <div className="col-md-6">
          <h3>Total Votes Cast: 69</h3>
        </div>
      </div>
      <div className="Auth-form-container mt-5">
        <form className="Auth-form">
          <div className="Auth-form-content ">
            <h3 className="Auth-form-title">Choose your candidate:</h3>
            <div className="form-group mt-3">{choices}</div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CastVote;
