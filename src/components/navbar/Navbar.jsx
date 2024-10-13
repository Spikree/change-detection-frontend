import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar p-2 border-b border-gray-800">
      <div className="nav-logo">
        <a href="/">
          <h1 className="text-2xl">ASHS</h1>
        </a>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <a href="#about">About us</a>
          </li>
          <li>
            <a href="#demo">Demo</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
