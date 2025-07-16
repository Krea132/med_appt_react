import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sign_Up from './components/Sign_up/Sign_Up';
import Login from './components/Login/Login';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Landing_Page from './components/Landing_Page/Landing_Page';
import BookingConsultation from './components/BookingConsultation';
import Notification from './components/Notification/Notification';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ReportsLayout from './components/ReportsLayout/ReportsLayout';


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
          <Route path="/ReportsLayout" element={<ReportsLayout />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
