import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-title">CREATE ACCOUNT</h2>

      <input type="text" placeholder="First Name" className="input-field" />
      <input type="text" placeholder="Last Name" className="input-field" />
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />

      <button className="signup-button">Sign Up</button>

      {/* Link to Login Page */}
      <Link to="/login" className="create-account">
        ALREADY HAVE AN ACCOUNT?
      </Link>
    </div>
  );
};

export default Signup;
