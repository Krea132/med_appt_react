import React from 'react';


const ReviewForm = () => {
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
                    <tr>
                        <td className='text-center' scope="row">1</td>
                        <td>Dr. John Doe</td>
                        <td>Cardiology</td>
                        <td><button type="button" class="btn btn-primary">Give Review</button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='text-center' scope="row">2</td>
                        <td>Dr. Jane Smith</td>
                        <td>Dermatology</td>
                        <td><button type="button" class="btn btn-primary">Give Review</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ReviewForm