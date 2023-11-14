import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
export default function Layout() {

  return (
    <>
    <div className='container d-flex justify-content-center'>
    <Outlet></Outlet>
    </div>
    </>
  )
}
