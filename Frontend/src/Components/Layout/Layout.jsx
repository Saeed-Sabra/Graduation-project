import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
export default function Layout({user,setUser,signedUp}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('UserToken');
    setUser(null);
    navigate('/login');
  }

  return (
    <>
    <Navbar user={user} logOut={logOut}/>
    <div className='container d-flex justify-content-center'>
    <Outlet></Outlet>
    </div>
    </>
  )
}
