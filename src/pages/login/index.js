import React from "react";
import axios from 'axios';


// check for token
if (localStorage.userData) {
  window.location.href = "/auth";
}

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else {
      // axios.post('http://54.145.61.200:5000/users/login', {
      axios.post('http://localhost:5000/users/login', {
        username: e.target.email.value,
        password: e.target.password.value
      })
        .then(res => {
          //save to local storage
          const { access_token, refresh_token } = res.data;
          // set token to localstorage
          localStorage.setItem("userData", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          alert("Successfully logged in");
          window.location.href = "/auth";
        })
        .catch(err => console.log(err));
      e.target.email.value = "";
      e.target.password.value = "";
    }



  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="name@email.com" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button className="primary">LOGIN</button>
    </form>
  );
};
export default Login;
