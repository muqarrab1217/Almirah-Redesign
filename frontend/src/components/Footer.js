import React, { useState } from "react";
import logo from "../assets/logo_white.png"; // Ensure the path is correct
import "../styles/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
      setIsFocused(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-center">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-left">
          <button>FAQs</button>
          <button>Login/Signup</button>
          <button>How to Buy</button>
          <button>Delivery Info</button>
          <button>Exchange & Return</button>
        </div>
        <div className="footer-right">
          <button>About Us</button>
          <button>Terms & Conditions</button>
          <button>Security & Privacy</button>
          <button>Store Locator</button>
        </div>
      </div>

      {/* Subscription Form */}
      <div className="footer-subscribe">
        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !email && setIsFocused(false)}
            required
          />
          
        </form>
        <p>Subscribe to our Newsletter</p>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="Copyright">© 2025 Alimrah. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
