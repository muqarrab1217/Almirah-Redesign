import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for redirection

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await axios.post("http://localhost:5008/api/auth/register", {
        firstname,
        lastname,
        email,
        password,
      });

      if (response.data.success) {
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">CREATE ACCOUNT</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          className="input-field"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <Link to="/login" className="create-account">
        ALREADY HAVE AN ACCOUNT?
      </Link>
    </div>
  );
};

export default Signup;
