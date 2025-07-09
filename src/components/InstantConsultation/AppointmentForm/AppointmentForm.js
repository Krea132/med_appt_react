import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateAppointment, setDateAppointment] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const userEmail = sessionStorage.getItem("email");

  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();


      // Create object with form + doctor data
      const appointmentDetails = {
        patientName: name,
        phoneNumber,
        dateAppointment,
        selectedSlot,
        doctorName,
        doctorSpeciality,
        email: userEmail
      };

      // Save in localStorage using doctor's name as key
      localStorage.setItem(doctorName, JSON.stringify(appointmentDetails));

      // If a callback exists to handle the booking, call it
      if (onSubmit) {
        onSubmit(appointmentDetails);
      }

      // Clear form fields
      setName('');
      setPhoneNumber('');
      setDateAppointment('');
      setSelectedSlot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form bg-light mx-auto mb-5 p-3 rounded">
        <div className="form-group mb-3">
          <label  className="fw-bold mb-2" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control p-3"
          />
        </div>
        <div className="form-group mb-3">
          <label  className="fw-bold mb-2" htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="form-control p-3"
          />
        </div>        
        <div className="form-group mb-3">
          <label  className="fw-bold mb-2" htmlFor="phoneNumber">Date of Appointment:</label>
          <input
            type="date"
            id="phoneNumber"
            value={dateAppointment}
            onChange={(e) => setDateAppointment(e.target.value)}
            required
            className="form-control p-3"
          />
        </div>
        <div className="form-group mb-3">
          <label className="fw-bold mb-2" htmlFor="timeSlot">Book Time Slot:</label>
          <select id='timeSlot' className="form-select p-3"
            required
            value={selectedSlot}
            onChange={(e) => handleSlotSelection(e.target.value)}>
            <option value="" disabled>Select a time slot</option>
            <option value="08:00">08:00</option>
            <option value="09:45">09:45</option>
            <option value="11:15">11:15</option>
          </select>
        </div>
        <button className="btn btn-primary btn-lg w-100 mr-1 p-2" type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
