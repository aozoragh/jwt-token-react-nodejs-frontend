import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
// check refresh token
if (localStorage.refresh_token) {
  const decoded = jwt_decode(localStorage.refresh_token);

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    alert('Auto logout.');
    window.location.href = "/";
  }
}
const check = async () => {
  console.log("This is check function");

  const instance = await axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const decoded = jwt_decode(localStorage.getItem('refresh_token'));
  const refresh_token = localStorage.getItem('refresh_token');
  console.log(decoded);
  const data = await instance.post('/users/refresh-token', [refresh_token, decoded]);

  console.log("response: ", data);
}
// check access token
if (localStorage.userData) {
  //set the auth token header auth
  // setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.userData);

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    check();
  }
}


const Login = React.lazy(() => import("./pages/login"));
const Auth = React.lazy(() => import("./pages/auth"));
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
