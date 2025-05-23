import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import "./Navbar.css";

function Navbar() {
  return (
    <div>
    <nav className="main-header shadow-sm">
        <div className="container d-flex justify-content-between">
          <a className="nav__logo" href="/">
              <span style={{ display: "none" }}>Health care</span>
              <img className="d-block" src={logo} alt="Logo" />
          </a>

          <ul className="nav__links active m-0">
            <li className="link">
              <Link to="/">Home</Link>
            </li>
            <li className="link">
              <a href="#">Appointments</a>
            </li>
            <li className="link">
              <a href="#">Health Blog</a>
            </li>
            <li className="link">
              <a href="#">Reviews</a>
            </li>
            <li className="btn1">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="btn1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>   
    </nav>
    </div>
  );
}

export default Navbar;

