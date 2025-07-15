import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, Navigate } from 'react-router-dom';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/BookingConsultation?speciality=${encodeURIComponent(speciality)}`);
    }
    return (
        <div className='finddoctor bg-light mx-auto text-start p-4 mt-4 mb-5' style={{'maxWidth':'480px'}}>
            <h1 className='mt-0 mb-3 fw-bold h2' style={{'lineHeight':'1.3lh'}}>Find a doctor at your own ease</h1>
            <img className='w-100 mb-3' src="/search.jpg" alt="Descripción de la imagen" />
            <div className="home-search-container">
                <div className="doctor-search-box">

                    <div className='position-relative w-100'>
                        <input type="text" className="form-control w-100 py-3 pe-5" placeholder="Search doctors, clinics, hospitals, etc." onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
                        <i style={{'top':'19px','right':'14px'}} className='bi bi-search position-absolute'></i>
                    </div>

                    <div style={{'borderColor':'#cccccc'}} className="search-doctor-input-results" hidden={doctorResultHidden}>
                        {
                            specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                <span>
                                    <i class="bi bi-search"></i>
                                </span>
                                <span>{speciality}</span>
                                <span>SPECIALITY</span>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindDoctorSearch