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
                                      <i className="bi bi-floppy me-3"></i>
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
                                      <i className="bi bi-pencil me-3"></i>
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
