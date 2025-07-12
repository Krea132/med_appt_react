import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sign_Up from './Components/Sign_up/Sign_Up';
import Login from './Components/Login/Login';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ProfileCard from './Components/ProfileCard/ProfileCard';


function App() {
  const [appointmentUpdated, setAppointmentUpdated] = useState(0);

  const handleAppointmentChange = () => {
    const timestamp = Date.now();
    setAppointmentUpdated(timestamp);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        
        <Notification appointmentUpdated={appointmentUpdated} />

        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/reviewForm" element={<ReviewForm />} />

          <Route
            path="/BookingConsultation"
            element={<BookingConsultation onAppointmentChange={handleAppointmentChange} />}
          />

          <Route path="/ProfileCard" element={<ProfileCard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
