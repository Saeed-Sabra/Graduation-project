import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';

export default function Layout({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('UserToken');
    setUser(null);
    navigate('/login');
  }

  const isAdminPage = location.pathname.startsWith('/admin');
  const showNavbar = !isAdminPage;

  return (
    <>
      {showNavbar && <Navbar user={user} logOut={logOut} />}
      <div className='container d-flex justify-content-center'>
        <Outlet />
      </div>
    </>
  );
}
