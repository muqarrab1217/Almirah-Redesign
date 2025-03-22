import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import bcrypt from "bcryptjs"; // Import bcrypt to compare passwords
import Navbar from "../components/Navbar"; // Ensure correct path
import Footer from "../components/Footer"; // Ensure correct path
import "../styles/Login.css";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5008/api/auth/users") // Adjust API URL if necessary
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle login
  const handleLogin = async () => {
    const user = users.find((u) => u.email === email);
    
    if (!user) {
      setError("User not found!");
      return;
    }

    try {
      // Compare entered password with hashed password from database
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        setError("Incorrect password!");
        return;
      }

      // Successful login
      setError("");
      navigate("/dashboard"); // Redirect to dashboard or home page
    } catch (error) {
      console.error("Error during password verification:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>

        <input 
          type="email" 
          placeholder="Email" 
          className="input-field" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <input 
          type="password" 
          placeholder="Password" 
          className="input-field" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {error && <p className="error-message">{error}</p>}

        <p className="forgot-password">FORGOT YOUR PASSWORD?</p>

        <button className="login-button" onClick={handleLogin}>Login</button>

        {/* Link to Signup Page */}
        <Link to="/signup" className="create-account">
          <FontAwesomeIcon icon={faUserPlus} className="icon" /> CREATE ACCOUNT
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Login;
