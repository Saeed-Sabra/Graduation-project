import React from 'react';

export default function Artical() {
  return (
    <div className='row m-auto shadow-lg my-5 rounded bg-white'>
      <div className="col-lg-6">
        <img src="assets/blood-pressure.jpg" className='w-100' alt="blood-pressure" />
      </div>

      <div className='col-lg-6 d-flex align-items-center'>
        <div className="p-4"> {/* Added padding to the content */}
          <span>Article</span>
          <h2 className="mb-4">What you need to know about blood pressure</h2>
          <a href="#" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
}
