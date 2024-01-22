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
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} className="img img-fluid navlogo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              {localStorage.getItem(
                "id") && (
                    <li className="nav-item">
                      <a className="nav-link text-danger" onClick={logOut}>
                        Log Out
                      </a>
                    </li>
                  )}
              {/* <li className="nav-item">
                                <a className="nav-link" href="abs.jj">pp</a>
                            </li> */}
              {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
