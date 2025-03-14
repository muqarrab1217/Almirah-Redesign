import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faStore } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css"; 
import logo from "../assets/logo.png"; // Import logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <FontAwesomeIcon icon={faBars} className="menu-icon" /> {/* Bars Icon */}

      {/* Center Logo */}
      <div className="logo-container">
        <img src={logo} alt="Almirah Logo" className="logo" />
      </div>

      {/* Icons */}
      <ul className="nav-links">
        <li><FontAwesomeIcon icon={faMagnifyingGlass} className="nav-icon" /></li> {/* Search Icon */}
        
        {/* Link to Login Page */}
        <li>
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faUser} className="nav-icon" />
          </Link>
        </li>

        <li><FontAwesomeIcon icon={faStore} className="nav-icon" /></li> {/* Store Icon */}
      </ul>
    </nav>
  );
};

export default Navbar;
