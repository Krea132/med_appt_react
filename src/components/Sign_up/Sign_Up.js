// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
              const messages = json.errors.map((error) => error.msg).join(', ');
              setShowerr(messages);
            }
            else {
                setShowerr(json.error);
            }
        }
    };
    // JSX to render the Sign Up form
  return (
    <div className="container-xl h-100 pt-5 d-flex flex-columnn align-items-center">
        <div className="login-form w-100 bg-light mx-auto mb-5 p-3 text-center rounded" style={{"max-width": "510px"}}>
          
          <h2 className="fw-bold">Sign Up</h2>

          <p>
            Already a member? <a to="/login" className="text-decoration-none" style={{color: "#E80320"}}> Login</a>
          </p>
          
          {showerr && (
            <div className="alert alert-danger text-start" role="alert">
              {showerr}
            </div>
          )}

          <form onSubmit={register}>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="role">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  type="text" name="role" id="role" required className="form-select p-3" aria-describedby="helpId">
                    <option selected>Select your role</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>   
                </select>
            </div>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="name">Name</label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text" name="name" id="name" required className="form-control p-3" placeholder="Enter your name" aria-describedby="helpId" 
                />
            </div>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="phone">Phone (10 digits)</label>
                <input 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="\d{10}" type="tel" name="phone" id="phone" required className="form-control p-3" placeholder="Enter your phone number" aria-describedby="helpId" 
                />
            </div>

            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="email">Email</label>
              <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" name="email" id="email" className="form-control p-3" placeholder="Enter your email" aria-describedby="helpId" />
            </div>
            
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                type="password"
                name="password"
                id="password"
                className="form-control p-3"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />
            </div>

            <div className="d-grid gap-3 mb-3">
              <button type="submit" className="btn btn-primary mr-1 p-2">Sign Up</button> 
            </div>

          </form>

        </div>
      </div>
  );
}

export default Sign_Up;

