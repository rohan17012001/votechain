import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Logo from "../assets/background.png";
// import { Link } from "react-router-dom";

export default function VoterLogin(props) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  // useEffect(() => {
  //   var user_token = token["mytoken"];
  //   console.log("Login User token is", user_token);
  //   console.log("Data type", typeof token["mytoken"]);
  //   if (String(user_token) === "undefined") {
  //     navigate("/voter-login");
  //   } else {
  //     navigate("/active-elections");
  //   }
  // }, [token]);

  // let loginUser = async () => {
  //   fetch(`/api/login/`, {
  //     credentials: "include",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email_id: email,
  //       password: password,
  //     }),
  //   });
  // };

  const loginBtn = async (e) => {
    e.preventDefault();
    if (email.endsWith("@iiitl.ac.in")) {
      if (email.trim().length && password.trim().length) {
        console.log("here", email);
        let response = await fetch(`/api/login/`, {
          // credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_id: email,
            password: password,
          }),
        });
        let data = await response.json();
        if (response.status === 400) {
          alert(data.message);
        } else {
          localStorage.setItem("id", data?.id);
          localStorage.setItem("name", data?.name);
          localStorage.setItem("admin", data?.admin);
          console.log(
            // localStorage.getItem("id"),
            localStorage.getItem("name"),
            localStorage.getItem("admin")
          );
          console.log('Login successful!');
          if (localStorage.getItem("admin") === "false") {
            // alert("redirecting");
            navigate("/voter-portal");
          } else {
            navigate("/admin-portal");
          }
        }
        // .then((response) => response.json())
        // .then((result)=>{
        //   if(result.ok){
        //     alert("Welcome "+email)
        //   }
        //   else{
        //     alert("Error while login!!! "+result.message)
        //   }
        // })
        // .then((response) => setToken("mytoken", response.token))
      } else {
        alert("No field must be empty");
      }
    } else {
      alert("You can only access this portal using your IIIT Lucknow email ID");
    }
  };
  const signUpbtn = async (e) => {
    e.preventDefault();
    if (email.endsWith("@iiitl.ac.in")) {
      if (name.trim().length && email.trim().length && password.trim().length) {
        console.log("here", email);
        let response = await fetch(`/api/createVoter/`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            user_email: email,
            password: password,
          }),
        });
        let data = await response.json();
        console.log('Welcome new user!!');
        if (response.status !== 201) {
          let err = [];
          for (const [key, value] of Object.entries(data)) {
            err.push([key, value + "\n"]);
            console.log(key, value);
            // alert(key, value);
          }
          // console.log(err);
          alert(err);
        } else {
          localStorage.setItem("newid", data.id);
          navigate("/voter-creation-success");
        }
      } else {
        alert("All fields are required");
      }
    } else {
      alert(
        "You can only sign up to this portal using your IIIT Lucknow email ID"
      );
    }
  };

  // Sign In with Google
  const signInwithgoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((data) => {
      // console.log(data);
      setValue(data.user.email);
      localStorage.setItem("googleemail", data.user.email);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem("googleemail"));
  });

  if (authMode === "signin") {
    return (
      <div className="loginportal">
        <div className="Auth-form-container mt-5 loginform">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-cente body-font">
                Not registered yet?{" "}
                <span className="link-primary body-font" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label className="body-font">Email address</label>
                <input
                  type="email"
                  className="form-control mt-1 body-font"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label className="body-font">Password</label>
                <input
                  type="password"
                  className="form-control mt-1 body-font"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary body-font" onClick={loginBtn}>
                  Submit
                </button>
              </div>
              {/* <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={signInwithgoogle}>
                  <i class="fa-brands fa-google"></i>
                </button>
              </div> */}
              {/* <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p> */}
            </div>
          </form>
        </div>
        <div className="loginimage">
          <img src={Logo} className="loginimg" />
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="loginportal">
      <div className="Auth-form-container mt-5 loginform">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center body-font">
              Already registered?{" "}
              <span className="link-primary body-font" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label className="body-font">Full Name</label>
              <input
                type="text"
                className="form-control mt-1 body-font"
                placeholder="e.g Jane Doe"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="body-font">Email address</label>
              <input
                type="email"
                className="form-control mt-1 body-font"
                placeholder="Email Address"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="body-font">Password</label>
              <input
                type="password"
                className="form-control mt-1 body-font"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary body-font" onClick={signUpbtn}>
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
          </div>
        </form>
      </div>
      <div className="loginimage">
        <img src={Logo} className="loginimg"/>
      </div>
    </div>
    <div className="fixit"></div>
    </div>
  );
}

// import React from 'react'
// export default function VoterLogin() {
//     const [login, setLogin]=React.useState({
//         userEmail:"",
//         passWord:""
//     });
//     function handleChange(event){
//         const {name, value} = event.target
//         setLogin(prevLogin => ({
//             ...prevLogin,
//             [name]:value
//         }))
//     }
//     return (
//         <div className='voter-login'>
//             <h3>Voter Login</h3>
//             <div class="mb-3">
//                     <label for="exampleInputEmail1" class="form-label">Email address</label>
//                     <input type="email"
//                         class="form-control"
//                         id="exampleInputEmail1"
//                         aria-describedby="emailHelp"
//                         name="userEmail"
//                         value={login.userEmail}
//                         onChange={handleChange}
//                     />
//                     <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div class="mb-3">
//                     <label for="exampleInputPassword1" class="form-label">Password</label>
//                     <input type="password"
//                         class="form-control"
//                         id="exampleInputPassword1"
//                         name="passWord"
//                         value={login.passWord}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div class="mb-3 form-check">
//                     <input type="checkbox" class="form-check-input" id="exampleCheck1" />
//                     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//                 </div>
//                 <button class="btn btn-primary" onC>Submit</button>
//         </div>
//     )
// }
