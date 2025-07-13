import React, { useEffect, useState } from 'react';

function ReportsLayout() {


  return (
    <div className="container-xl h-100 pt-4">
      <h1 className='h1 fw-bold'>Reports</h1>
        <table className="table mx-auto mb-5">
            <thead>
            <tr>
                <th className='text-center' scope="col">S.No.</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Doctor Speciality</th>
                <th scope="col">View Report</th>
                <th scope="col">Download Report</th>
            </tr>
            </thead>
            <tbody>
            
                <tr>
                <td className='text-center'>1</td>
                <td>Dr. Jiao Yang</td>
                <td>Dentist</td>
                <td>
                    <button className="d-flex align-items-center" type="submit">
                        View Report
                    </button>
                </td>
                <td>
                    <button className="d-flex align-items-center" type="submit">
                        Download Report
                    </button>
                </td>
                </tr>

            {/* {appointments.map((doctor, index) => (
                <tr key={index}>
                <td className='text-center'>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                    <button className="d-flex align-items-center" type="submit">
                        View Report
                    </button>
                </td>
                <td>
                    <button className="d-flex align-items-center" type="submit">
                        Download Report
                    </button>
                </td>
                </tr>
            ))} */}
            </tbody>
        </table>
    </div>
  );
}


export default ReportsLayout;
