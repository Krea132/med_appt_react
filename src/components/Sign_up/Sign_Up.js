import React from "react";
import "./Sign_Up.css";

function Sign_Up() {
  return (
    <div>
    <div className="container-xl pt-5">
        <div className="login-form bg-light mx-auto mb-5 p-3 text-center rounded" style={{"max-width": "510px"}}>
          
          <h2 className="fw-bold">Sign Up</h2>

          <p>
            Already a member? <a href="../Login/Login.html" className="text-decoration-none" style={{color: "#E80320"}}> Login</a>
          </p>
          
          <form>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="role">Role</label>
                <select type="text" name="role" id="role" required className="form-select p-3" aria-describedby="helpId">
                    <option selected>Select your role</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>   
                </select>
            </div>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="name">Name</label>
                <input type="text" name="name" id="name" required className="form-control p-3" placeholder="Enter your name" aria-describedby="helpId" />
            </div>
            
            <div className="form-group text-start mb-3">
                <label className="fw-bold mb-2" for="phone">Phone</label>
                <input pattern="\d{10}" type="tel" name="phone" id="phone" required className="form-control p-3" placeholder="Enter your phone number" aria-describedby="helpId" />
            </div>

            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="email">Email</label>
              <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" name="email" id="email" className="form-control p-3" placeholder="Enter your email" aria-describedby="helpId" />
            </div>
            
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="password">Password</label>
              <input
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
              <button type="submit" className="btn btn-primary mr-1 p-2">Login</button> 
              <button type="reset" className="btn btn-danger p-2">Reset</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Sign_Up;

