import React from 'react'
export default function Artical() {
  return (
        <div className='row m-auto shadow-lg  my-5 rounded bg-white'>
            <div className="col-lg-6">
                <img src="assets/blood-pressure.jpg" className='w-100' alt="blood-pressure" />
            </div>

            <div className='col-lg-6 d-flex align-items-center'>
                <div>
                <span>Article</span>
                <h2>What you need to know about blood pressure</h2>
                <a href="">Read More</a>
                </div>
            </div>
        </div>
  )
}
