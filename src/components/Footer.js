import React from "react";
// import { ReactComponent as Logo } from '../assets/projectlogo.png'
import Logo from "../assets/projectlogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <section class="footer_sec pt-5 pb-2 mt-5" id="footer-sec">
        <footer>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3 col-6 pl-5 pl-small-15">
                <div class="footertitle">
                  <a href="/">
                    <img
                      src={Logo}
                      width="100px"
                      class="img img-fluid"
                      alt="logo"
                    />
                  </a>
                </div>
                <div>
                  Votechain: E-Voting System
                  <br />
                  {/* Email: info@sastaaa.com */}
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="footertitle pt-3 mb-3">
                  <h3>Quick Nav</h3>
                  <ul>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="footertitle pt-3 mb-3">
                  <h3>Coming soon</h3>
                  <ul>
                    <li>
                      Admin only- stop election
                    </li>
                    <li>
                      Firebase Login
                    </li>
                    {/* <li>
                      <a href="javascript:;">Kids Fashion</a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="footertitle pt-3 mb-3">
                  <h3>Developed by</h3>
                  <ul>
                    <li>
                      Ravi Maurya
                    </li>
                    <li>
                      Mohd Shaban
                    </li>
                    <li>
                      Maurya Abhishek Kumar
                    </li>
                    <li>
                      Rohan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <h6 class="text-center mt-3">
              Copyright @2023 All rights reserved
            </h6>
          </div>
        </footer>
        <div class="backtotop">
          <a
            id="button"
            href="#top"
            class="btn btn-lg btn-outline-danger"
            role="button"
          >
            <i class="fas fa-chevron-up text-dark"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
