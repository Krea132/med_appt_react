import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateAppointment, setDateAppointment] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber });
      setName('');
      setPhoneNumber('');
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
          <select id='timeSlot' class="form-select p-3"
            required
            value={selectedSlot}
            onChange={(e) => handleSlotSelection(e.target.value)}>
            <option selected>Select a time slot</option>
            <option value="1">08:00</option>
            <option value="2">09:45</option>
            <option value="3">11:15</option>
          </select>
        </div>
        <button className="btn btn-primary btn-lg w-100 mr-1 p-2" type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
