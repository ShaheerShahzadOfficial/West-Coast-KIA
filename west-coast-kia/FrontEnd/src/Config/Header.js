import React, { useState } from "react";
import "./header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>

      <button
        className={`hamburger ${isOpen === true? "is-active" :""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="32" height="32">
          <rect id="line1" y="8" width="32" height="4" />
          <rect id="line2" y="16" width="32" height="4" />
          <rect id="line3" y="24" width="32" height="4" />
        </svg>
      </button>

      <div className={`site-navigation ${isOpen ? "is-open" : ""}`}>
        <nav>
          <ul>
            <li>
              <Link to="/About">ABOUT</Link>
            </li>
            <li>
              <Link to="/">CARS</Link>
            </li>
            <li>
              <Link to="/">SHOPPING TOOLS</Link>
            </li>
            <li>
              <Link to="/">CONTACT</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
