import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './InstantConsultation/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './InstantConsultation/DoctorCard/DoctorCard';


const BookingConsultation = ({ onAppointmentChange }) => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                window.reload()
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }
    const handleSearch = (searchText) => {

        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
            } else {
                
            const filtered = doctors.filter(
                (doctor) =>
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
                
            );
                
            setFilteredDoctors(filtered);
            setIsSearched(true);
            window.location.reload()
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams])

  return (
    <div className="container-xl h-100">
        <FindDoctorSearch onSearch={handleSearch} />
        <div className="search-results-container">
        {isSearched ? (
            <center>
                <h2 className='fw-bold mb-2'>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                <p className='mb-5'>Book appointments with minimum wait-time & verified doctor details</p>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                        {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} onAppointmentChange={onAppointmentChange} />)
                        ) : (
                        <div className='col'><p>No doctors found.</p></div>
                        )}
                    </div>
            </center>
            ) : (
            ''
            )}
        </div>
    </div>
  );
};

export default BookingConsultation;