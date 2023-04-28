import React from "react";
import Logo from "../assets/projectlogo.png";
import VoterLogin from "../pages/VoterLogin";
import { useNavigate } from "react-router-dom";
export default function Header() {
    let navigate = useNavigate()
    function logOut(){
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('admin')
        alert('Successfully Logged Out!')
        navigate('/login')
    }
  return (
    <div className="App-header" id="top">
      <nav class="navbar navbar-expand-lg bg-body-tertiary ">
        <div class="container-fluid">
          <a class="navbar-brand" href="https://rohan17012001.github.io/votechain">
            <img src={Logo} className="img img-fluid navlogo" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              {localStorage.getItem(
                "id") && (
                    <li class="nav-item">
                      <a className="nav-link text-danger" onClick={logOut}>
                        Log Out
                      </a>
                    </li>
                  )}
              {/* <li class="nav-item">
                                <a class="nav-link" href="abs.jj">pp</a>
                            </li> */}
              {/* <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
