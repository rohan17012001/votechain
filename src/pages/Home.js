import React from "react";
import Img1 from "../assets/Voting_made_secure_and_reliable.png";
import Img2 from "../assets/Theproblemwearesolving.png";
import Img3 from "../assets/Whyisvotechainbetter.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h1>Welcome to Votechain</h1>
      </div>
      {/* <h1>Welcome to Voting System!</h1> */}
      {/* <div className="mainstage">
        <img src={Img1} className="mainimg"/>
      </div> */}
      <div id="carouselExample" className="carousel slide mainimg">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Img1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Img2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Img3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="hometext1">
        <h2>Welcome to the world of secure and immutable voting</h2>
        <h2><Link to="/login" >Join now!</Link></h2>
      </div>
      {/* <a href="/login">Sign-In</a> */}
    </div>
  );
};

export default Home;
