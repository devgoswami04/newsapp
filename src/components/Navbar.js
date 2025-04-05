import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="brand" to="/">Chronicle</Link>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/entertainment">Entertainment</Link></li>
            <li><Link to="/general">General</Link></li>
            <li><Link to="/health">Health</Link></li>
            <li><Link to="/science">Science</Link></li>
            <li><Link to="/sports">Sports</Link></li>
            <li><Link to="/technology">Technology</Link></li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}
