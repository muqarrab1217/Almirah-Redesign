import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>

      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />

      <p className="forgot-password">FORGOT YOUR PASSWORD?</p>

      <button className="login-button">Login</button>

      {/* Link to Signup Page */}
      <Link to="/signup" className="create-account">
        <FontAwesomeIcon icon={faUserPlus} className="icon" /> CREATE ACCOUNT
      </Link>
    </div>
  );
};

export default Login;
