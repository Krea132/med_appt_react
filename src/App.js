import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
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


function App() {
  const [appointmentUpdated, setAppointmentUpdated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Notification appointmentUpdated={appointmentUpdated} />
        
        {/* <GiveReviews /> */}

        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/reviewForm" element={<ReviewForm />} />

          <Route
            path="/BookingConsultation"
            element={<BookingConsultation onAppointmentChange={() => setAppointmentUpdated(prev => !prev)} />}
          />
          <Route path="/notifications" element={<Notification appointmentUpdated={appointmentUpdated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
