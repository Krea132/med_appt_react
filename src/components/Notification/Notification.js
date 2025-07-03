import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

// Function component Notification to display user notifications
const Notification = ({ children,appointmentUpdated }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }

    if (!storedAppointmentData) {
      setAppointmentData(null);
    }

  }, [appointmentUpdated]);

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div className='container-xl'>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData && (
        <>
          <div className="alert alert-success text-start mx-auto mt-4" role="alert">
              {/* Display title for appointment details */}
              <h4 className="alert-heading">Appointment Details</h4>
              <p>The following appointmnet has been booked</p>
              <hr></hr>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-xl-3'>
                <div className='col mb-1'>
                  <strong>Doctor:</strong> {appointmentData?.doctorName}
                </div>
                <div className='col mb-1'>
                  <strong>Specciality:</strong> {appointmentData?.doctorSpeciality}
                </div>
                <div className='col mb-1'>
                  <strong>Patient Name:</strong> {appointmentData?.patientName}
                </div>
                <div className='col mb-1'>
                  <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
                </div>
                <div className='col mb-1'>
                  <strong>Date of Appointment:</strong> {appointmentData?.dateAppointment}
                </div>
                <div className='col mb-1'>
                  <strong>Time Slot:</strong> {appointmentData?.selectedSlot}
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;