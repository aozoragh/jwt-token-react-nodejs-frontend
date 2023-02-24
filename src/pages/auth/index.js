import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Auth = () => {

  const userData = jwt_decode(localStorage.getItem('userData'));
  const user = {
    email: userData.name,
    password: userData.password,
  };

  const logout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userData');
    window.location.href = "/";
  }

  return (
    <React.Fragment>
      <div>{`Successfully Logged In`}</div>
      <div style={{ marginTop: "10px" }}>Email:{user.email}</div>
      <Link>
        <button className="primary" style={{ marginTop: "10px" }} onClick={() => logout()}>
          Logged Out
        </button>
      </Link>
    </React.Fragment>
  );
};
export default Auth;
