import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const doctors = [
  { name: 'Dr. John Doe', speciality: 'Cardiology' },
  { name: 'Dr. Jane Smith', speciality: 'Dermatology' }
];

const ReviewForm = () => {

    const [reviews, setReviews] = useState(
    doctors.map(() => ({
      submitted: false,
      formData: {
        name: '',
        review: '',
        rating: ''
      }
    }))
  );

    const handleInputChange = (index, e) => {
    const updated = [...reviews];
    updated[index].formData[e.target.name] = e.target.value;
    setReviews(updated);
  };
    
  const handleSubmit = (index, close) => {
    const updated = [...reviews];
    const form = updated[index].formData;

    // Validación
    if (!form.name || !form.review || !form.rating) {
      alert("Please fill out all fields and select a rating.");
      return;
    }

    // Marcar como enviada
    updated[index].submitted = true;
    setReviews(updated);

    // Cerrar modal
    close();
  };

    
    
    return (
        <div className='container-xl py-4 h-100"'>
            <h1 className='h1 fw-bold'>Reviews</h1>
            <table class="table mx-auto mb-5">
                <thead>
                    <tr>
                        <th className='text-center' scope="col">S.No.</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Doctor Speciality</th>
                        <th scope="col">Provide Review</th>
                        <th scope="col">Review Given</th>
                    </tr>
                </thead>
                <tbody>

                  {doctors.map((doctor, index) => (
                    <tr key={index}>
                        <td className='text-center' scope="row">{index + 1}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.speciality}</td>
                        <td>

                          <Popup
                            modal
                            contentStyle={{ maxWidth: '500px', width: '90%', borderRadius: '10px' }}
                            trigger={
                              <button
                                className="btn btn-primary"
                                disabled={reviews[index].submitted}
                              >
                                {reviews[index].submitted ? "Review Submitted" : "Give Review"}
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
                                      value={reviews[index].formData.name}
                                      onChange={(e) => handleInputChange(index, e)}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">Your Review</label>
                                    <textarea
                                      name="review"
                                      value={reviews[index].formData.review}
                                      onChange={(e) => handleInputChange(index, e)}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">Rating</label>
                                    <select
                                      name="rating"
                                      value={reviews[index].formData.rating}
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
                          {reviews[index].submitted && (
                            <div className="text-start">
                              <p className="mb-1"><strong>{reviews[index].formData.name}</strong>: "{reviews[index].formData.review}"</p>
                              <p><strong>Rating:</strong> {reviews[index].formData.rating}/5</p>
                            </div>
                          )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReviewForm