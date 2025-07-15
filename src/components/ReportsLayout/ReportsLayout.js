import React, { useEffect, useState } from 'react';

function ReportsLayout() {

const reports = [
   { id: 1, dr: "Dr. Jiao Yang", speciality: "Dentist", url: "/reports/MEDICAL-REPORT.pdf" },
   { id: 2, dr: "Dr. Richard Pearson", speciality: "General Phsysician", url: "/reports/MEDICAL-REPORT.pdf" }
];

  return (
    <div className="container-xl h-100 pt-4">
      <h1 className='h1 fw-bold'>Reports</h1>      
      {reports.length === 0 ? (
        <div className='bg-light rounded p-4'>
          <h2>No reports have been found:</h2>
          <p>A doctor's report must be submitted, and you must be logged in to gain access to your personal reports.</p>
        </div>
      ) : (
        <table className="table mx-auto mb-5">
            <thead>
            <tr>
                <th className='text-center' scope="col" style={{ width: '58px' }}>S.No.</th>
                <th scope="col" style={{ width: '200px' }}>Doctor Name</th>
                <th scope="col">Doctor Speciality</th>
                <th scope="col" style={{ width: '190px' }}>View Report</th>
                <th scope="col" style={{ width: '230px' }}>Download Report</th>
            </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report.id}>
                        <td className='text-center'>{report.id}</td>
                        <td className=''>{report.dr}</td>
                        <td>{report.speciality}</td>
                        <td>
                            {/* View button opens PDF in new tab */}
                            <button
                                className="d-flex align-items-center"
                                onClick={() => window.open(report.url, "_blank")}
                            >
                                <i class="bi bi-eye me-3"></i>
                                View Report
                            </button>
                        </td>
                        <td>
                            {/* Download button triggers download */}
                            <a href={report.url} 
                            
                            download>
                                <button className="d-flex align-items-center">
                                    <i class="bi bi-download me-3"></i>
                                    Download Report
                                </button>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>
  );
}


export default ReportsLayout;
