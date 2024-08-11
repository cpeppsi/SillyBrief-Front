import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close state
  };

  const closeMenu = () => {
    setMenuOpen(false); // Ensure menu closes when a link is clicked
  };

  return (
    <div className="navbar-container">
      <div className="copyright">
        Created by Cooper and Casey Epps &#169; 2024
      </div>
      <div className="navbar-content">
        <div className={`hamburger-menu ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
        {menuOpen && (
          <div className="mobile-nav-links">
            <Link to="/copy" onClick={closeMenu}>Copy</Link>
            <Link to="/art" onClick={closeMenu}>Art</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/instruction" onClick={closeMenu}>Instructions</Link>
          </div>
        )}
        <div className="nav-links left">
          <Link to="/copy">Copy</Link>
          <Link to="/art">Art</Link>
        </div>
        <header className="holy-grail-header">Silly Brief</header>
        <div className="nav-links right">
          <Link to="/about">About</Link>
          <Link to="/instruction">Instructions</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
