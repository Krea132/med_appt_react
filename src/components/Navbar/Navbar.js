import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import "./Navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      // sessionStorage.setItem("email", "Michael@ejemplo.com");
      const storedEmail = sessionStorage.getItem("email");

      if (storedEmail) {
             setIsLoggedIn(true);
            setUsername(storedEmail);
            
            // Extraer la parte antes de la @
            const namePart = storedEmail.split("@")[0];
            setUsername(namePart);
          }
    }, []);
  return (
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
              <Link to="BookingConsultation">Booking consultation</Link>
            </li>            
            <li className="link">
              <a href="#">Appointments</a>
            </li>
            <li className="link">
              <a href="#">Health Blog</a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="link">
                  <Link to="reviewForm">Reviews</Link>
                </li>
                <li className="link">
                  {/* <span className="username">Hola, {username}</span> */}
                  <div className="dropdown">
                    <button className="btn btn-outline-danger rounded-pill px-4 py-2 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Hola, {username}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item" to="ProfileCard">Your Profile</Link></li>
                      <li><Link className="dropdown-item" to="ReportsLayout">Your Reports</Link></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <button className="btn btn-outline-danger rounded-pill px-4 py-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
              ) : (
              <>
                <li>
                  <Link className="btn btn-outline-danger rounded-pill px-4 py-2" to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link className="btn btn-outline-danger rounded-pill px-4 py-2" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>   
    </nav>
  );
};

export default Navbar;