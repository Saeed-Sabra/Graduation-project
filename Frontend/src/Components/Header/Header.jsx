import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({user}) {
  return (
        <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
                <div>
                    <span className='text-primary'>Health Care</span>
                    <h1>Your Health is our priority</h1>
                    <p>Check on your health by answering some questions honestly to get an accurate result</p>
                    <Link className='btn bg-primary text-white p-2 me-4 px-3' to='diagnosis'>Get Started</Link>
                    <Link className='btn bg-primary p-2 text-black px-3'>Learn More</Link>
                </div>
            </div>

            <div className="col-lg-6">
                <div className='mt-5 ms-5'>
                    <img src="assets/4807695.png" alt="Header image icon"/>
                </div>
            </div>
        </div>
  )
}