// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div>
    <div className="container-xl pt-5">
        <div className="login-form bg-light mx-auto mb-5 p-3 text-center rounded" style={{"max-width": "510px"}}>
          
          <h2 className="fw-bold">Login</h2>

          <p>
            Are you a new member? <a href="../Sign_Up/Sign_Up.html" className="text-decoration-none" style={{color: "#E80320"}}> Sign Up Here</a>
          </p>
          
          <form onSubmit={login}>
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="email">Email</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required type="email" name="email" id="email" className="form-control p-3" placeholder="Enter your email" aria-describedby="helpId" />
            </div>
            
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="password">Password</label>
              <input
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                type="password"
                name="password"
                id="password"
                className="form-control p-3"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />
            </div>

            <div className="d-grid gap-3 mb-3">
              <button type="submit" className="btn btn-primary mr-1 p-2">Login</button> 
              <button type="reset" className="btn btn-danger p-2">Reset</button>
            </div>
            <a href="../Sign_Up/Sign_Up.html" className="text-decoration-none" style={{color: "#E80320"}}>Forgot Password?</a>
            
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;