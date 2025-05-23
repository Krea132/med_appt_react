import React from "react";
import "./Login.css";

function Login() {
  return (
    <div>
    <div className="container-xl pt-5">
        <div className="login-form bg-light mx-auto mb-5 p-3 text-center rounded" style={{"max-width": "510px"}}>
          
          <h2 className="fw-bold">Login</h2>

          <p>
            Are you a new member? <a href="../Sign_Up/Sign_Up.html" className="text-decoration-none" style={{color: "#E80320"}}> Sign Up Here</a>
          </p>
          
          <form>
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="email">Email</label>
              <input required type="email" name="email" id="email" className="form-control p-3" placeholder="Enter your email" aria-describedby="helpId" />
            </div>
            
            <div className="form-group text-start mb-3">
              <label className="fw-bold mb-2" for="password">Password</label>
              <input
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