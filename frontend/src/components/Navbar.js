// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand on the left */}
        <Link className="navbar-brand" to="/ems">Employee Management System</Link>

        {/* Slightly left center links */}
        <ul className="navbar-nav d-flex flex-row" style={{ marginLeft: '50px' }}>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/admin">Admin</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/employee">Employees</Link>
          </li>
        </ul>

        {/* Login on the right */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
