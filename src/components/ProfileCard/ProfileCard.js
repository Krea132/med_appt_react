import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";
import { Link, useNavigate } from 'react-router-dom';


function ProfileCard() {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();
  
  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate("/ProfileCard");
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div className="container-xl h-100 pt-4">
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <div className="card">
                    <div className="card-header">
                      {editMode ? (
                        <h5 className="m-0 py-2">Edit your personal information</h5>
                        ) : (
                          <h5 className="m-0 py-2">Welcome, {userDetails.name}</h5>
                          )}
                    </div>
                    <div className="card-body">
                        {editMode ? (
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label for="email" className="form-label">E-mail:</label>
                                    <input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    disabled />
                                </div>

                                <div className="mb-3">
                                    <label for="name" className="form-label">Name:</label>
                                    <input 
                                    name="name"
                                    id="name"
                                    type="text"
                                    value={updatedDetails.name}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label for="phone" className="form-label">Phone number:</label>
                                    <input 
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={updatedDetails.phone}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                    <button className="d-flex align-items-center" type="submit">
                                      <svg className="me-3" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                      Save
                                      </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <ul className="p-0 m-0">
                                    <li className='mb-3'>
                                        <strong>Name:</strong> {userDetails.name}
                                    </li>
                                    <li className='mb-3'>
                                        <strong>E-mail:</strong> {userDetails.email}
                                    </li>
                                    <li className='mb-3'>
                                        <strong>Phone number:</strong> {userDetails.phone}
                                    </li>
                                </ul>
                                <div className="d-flex justify-content-end align-items-center">
                                    <button className="d-flex align-items-center" onClick={handleEdit}>
                                      <svg className="me-3" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                                      Edit
                                      </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}


export default ProfileCard;
