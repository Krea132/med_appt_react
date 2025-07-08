import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic, onAppointmentChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');
        // Actualiza el estado con el email encontrado (o con null si no hay)
        setUser(userEmail); 
    
    const storedAppointment = localStorage.getItem(name);
    if (storedAppointment) {
      const parsed = JSON.parse(storedAppointment);
      setAppointments([{
        id: uuidv4(), 
        ...parsed
      }]);
    }
  }, [name]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    
    // Elimina la reserva guardada en localStorage
    localStorage.removeItem(name);
    localStorage.removeItem("doctorData");

    // Notifica a App que hubo un cambio (para que Notification se actualice)
    if (onAppointmentChange) onAppointmentChange(); // <-- Añade esto

    // Cierra el modal
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {

    localStorage.setItem(appointmentData.doctorName, JSON.stringify(appointmentData));

    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(name, JSON.stringify(newAppointment));
    localStorage.setItem("doctorData", JSON.stringify({ name }));
    if (onAppointmentChange) onAppointmentChange();
    setShowModal(false);
  };

  return (
    <div className='col mb-4'>
      <div className="card h-100">
          <div className="ratio ratio-1x1">
            <img className='w-100 mb-3' src="/dr-image.jpg" alt="Descripción de la imagen" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg> */}
          </div>
          <div className="card-body">
            <h4 className="fw-bold">{name}</h4>
            <div className="mb-1">{speciality}</div>
            <div style={{'color':'#888888'}} className="mb-2 fw-bold">{experience} years experience</div>
            <div className="fw-bold"><small>Ratings:</small> {ratings}</div>
          </div>
          {/* for reference  */}
          {/* <div>
                <button className='book-appointment-btn'>                    
                  <div>Book Appointment</div>
                <div>No Booking Fee</div>
              </button>
                </div> */}


        <div className="doctor-card-options-container">
        <Popup
            style={{ backgroundColor: '#FFFFFF' }}
            disabled={!user}
            trigger={
              <button 
              style={{ 'border-top-left-radius': '0', 'border-top-right-radius': '0'}} 
              className={`stretched-link btn w-100 btn-primary rounded-bottom mr-1 p-2 ${user && appointments.length > 0 ? 'btn-danger py-4' : ''}`}
              disabled={!user}
              >
           {
                !user ? (
                    // Estado 1: Usuario no logueado
                    <div>Log in to book</div>
                ) : appointments.length > 0 ? (
                    // Estado 2: Usuario logueado y con reserva
                    <div>Cancel Appointment</div>
                ) : (
                    // Estado 3: Usuario logueado y sin reserva
                    <div>
                      <p className='mb-2'>Book Appointment</p>
                      <p className='m-0'>No Booking Fee</p>
                    </div>
                )
            }
              </button>
            }
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            {(close) => (
              <div className="doctorbg p-4">
                <div className="text-center mb-5 pt-3">
                  <img className='mx-auto display-block mb-3' style={{'max-height':'150px'}} src="/dr-image.jpg" alt="Descripción de la imagen" />
                  <h4 className="fw-bold">{name}</h4>
                  <div className="mb-1">{speciality}</div>
                  <div style={{'color':'#888888'}} className="mb-2 fw-bold">{experience} years experience</div>
                  <div className="fw-bold"><small>Ratings:</small> {ratings}</div>
                </div>

                {appointments.length > 0 ? (
                  <>
                  <div className="text-center bg-light p-4 rounded">
                    <h3>Appointment Booked!</h3>
                    {appointments.map((appointment) => (
                      <div className="bookedInfo" key={appointment.id}>
                        <p className='mb-1'>For: <strong>{appointment.patientName}</strong></p>
                        <p>When: <strong>{appointment.dateAppointment},  at {appointment.selectedSlot}</strong></p>
                        <button className="btn btn-outline-danger p-2" onClick={() => {handleCancel(appointment.id);close();}}>Cancel Appointment</button>
                      </div>
                    ))}
                    </div>
                  </>
                ) : (
                  <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                )}
              </div>
            )}
          </Popup> 
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
