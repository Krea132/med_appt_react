import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children,appointmentUpdated }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    const now = new Date();
    const futureAppointments = [];

    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) continue;

      try {
        const data = JSON.parse(localStorage.getItem(key));

        if (
          data?.doctorName &&
          data?.doctorSpeciality &&
          data?.dateAppointment &&
          data?.email === storedUsername
        ) {
          const date = new Date(data.dateAppointment);

          if (date > now) {
            futureAppointments.push(data);
          }
        }
      } catch (err) {
        // Ignore invalid entries
      }
    }
    
    setAppointmentData(futureAppointments);
  }, [appointmentUpdated]);

  return (
    <div className='container-xl'>
      
      {children}

      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData?.length > 0 && (
          <div className="alert alert-success text-start mx-auto mt-4 pb-0" role="alert">
              <h4 className="alert-heading">Appointment Details</h4>
              {appointmentData.length > 0 && (
                <p>
                  {appointmentData.length === 1
                    ? 'The following appointment has been booked:'
                    : 'The following appointments have been booked:'}
                </p>
              )}

              {appointmentData.map((app, idx) => (
                <div key={idx} className='border-success border-top pt-2 pb-1'>
                  <p className='mb-1'>You have an appointment on <strong>{app?.dateAppointment}</strong>, at <strong>{app?.selectedSlot}</strong> with <strong>{app?.doctorName}</strong>, a specialist in <strong>{app?.doctorSpeciality}</strong>. </p>
                  <p className='mb-1'>The appointment is booked under the name <strong>{app?.patientName}</strong>, and the contact number provided is <strong>{app?.phoneNumber}</strong>.</p>
                </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default Notification;