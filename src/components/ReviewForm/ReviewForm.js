import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Cargar doctores con reservas pasadas
  useEffect(() => {
    const user = sessionStorage.getItem('email');
    if (!user) return;

    const now = new Date();
    const pastAppointments = [];

    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) continue;

      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data?.doctorName || !data?.doctorSpeciality || !data?.dateAppointment) continue;

        const date = new Date(data.dateAppointment);
        if (date < now) {
          pastAppointments.push({
            name: data.doctorName,
            speciality: data.doctorSpeciality
          });
        }
      } catch (err) {
        // ignorar claves que no son JSON válidos
      }
    }

    // eliminar duplicados por nombre
    const uniqueAppointments = pastAppointments.filter(
      (item, index, self) =>
        index === self.findIndex((d) => d.name === item.name)
    );

    // Guarda los doctores con citas pasadas en el estado.
    setAppointments(uniqueAppointments);

    // cargar posibles reviews guardadas
    const loadedReviews = uniqueAppointments.map((doc) => {
      const saved = localStorage.getItem(`review-${doc.name}`);
      if (saved) {
        return {
          submitted: true,
          formData: JSON.parse(saved)
        };
      } else {
        return {
          submitted: false,
          formData: {
            name: '',
            review: '',
            rating: ''
          }
        };
      }
    });

    setReviews(loadedReviews);
  }, []);

  const handleInputChange = (index, e) => {
    const updated = [...reviews];
    updated[index].formData[e.target.name] = e.target.value;
    setReviews(updated);
  };

  const handleSubmit = (index, close) => {
    const updated = [...reviews];
    const form = updated[index].formData;

    if (!form.name || !form.review || !form.rating) {
      alert("Please fill out all fields and select a rating.");
      return;
    }

    updated[index].submitted = true;
    setReviews(updated);

    const doctorKey = appointments[index].name;
    localStorage.setItem(`review-${doctorKey}`, JSON.stringify(form));

    close();
  };

  return (
    <div className='container-xl py-4 h-100"'>
      <h1 className='h1 fw-bold'>Reviews</h1>
      {appointments.length === 0 ? (
        <div className='bg-light rounded p-4'>
          <h2>No past appointments found:</h2>
          <p>You must be logged in and have past appointments in order to be able to make a review.</p>
        </div>
      ) : (
        <table className="table mx-auto mb-5">
          <thead>
            <tr>
              <th className='text-center' scope="col" style={{ width: '58px' }}>S.No.</th>
              <th scope="col" style={{ width: '200px' }}>Doctor Name</th>
              <th scope="col">Doctor Speciality</th>
              <th scope="col" style={{ width: '200px' }}>Provide Review</th>
              <th scope="col">Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((doctor, index) => (
              <tr key={index}>
                <td className='text-center'>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <Popup
                    modal
                    contentStyle={{ maxWidth: '500px', width: '90%', borderRadius: '10px' }}
                    trigger={
                      <button
                        className="btn btn-primary"
                        disabled={reviews[index]?.submitted}
                      >
                        {reviews[index]?.submitted ? "" : <i className="bi bi-pencil me-2"></i>}
                        {reviews[index]?.submitted ? "Review Submitted" : "Give Review"}
                      </button>
                    }
                  >
                    {(close) => (
                      <div className="bg-light p-4">
                        <h3>Feedback for {doctor.name}</h3>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(index, close);
                          }}
                        >
                          <div className="mb-3">
                            <label className="form-label">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              value={reviews[index]?.formData.name || ''}
                              onChange={(e) => handleInputChange(index, e)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Your Review</label>
                            <textarea
                              name="review"
                              value={reviews[index]?.formData.review || ''}
                              onChange={(e) => handleInputChange(index, e)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Rating</label>
                            <select
                              name="rating"
                              value={reviews[index]?.formData.rating || ''}
                              onChange={(e) => handleInputChange(index, e)}
                              className="form-select"
                              required
                            >
                              <option value="">Select Rating</option>
                              {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div className="d-grid gap-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </Popup>
                </td>
                <td>
                  {reviews[index]?.submitted && (
                    <div className="text-start">
                      <p className="mb-1"><strong>{reviews[index].formData.name}</strong>: "{reviews[index].formData.review}"</p>
                      <p className="mb-0"><strong>Rating:</strong> {reviews[index].formData.rating}/5</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewForm;
