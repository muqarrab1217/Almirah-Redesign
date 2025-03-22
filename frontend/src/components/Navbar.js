import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faStore, faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Added Cart Icon
import "../styles/Navbar.css"; 
import logo from "../assets/logo.png"; // Import logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <FontAwesomeIcon icon={faBars} className="menu-icon" /> {/* Bars Icon */}

      {/* Center Logo (Clickable to Home) */}
      <div className="logo-container">
        <Link to="/"> {/* Link to Home Page */}
          <img src={logo} alt="Almirah Logo" className="logo" />
        </Link>
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

        {/* Link to Cart Page with Cart Icon */}
        <li>
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
          </Link>
        </li>

        <li><FontAwesomeIcon icon={faStore} className="nav-icon" /></li> {/* Store Icon */}

        
      </ul>
    </nav>
  );
};

export default Navbar;
