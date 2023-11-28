import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar({user,logOut}) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container pt-2">
        <Link className="navbar-brand" to="#">
          <img src="assets/robot.png" alt="" className={`${style.img}`} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                Home
              </Link>
            </li>
            {user && user.isAdmin === true && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="history">
                History
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn bg-primary text-white" to="register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn bg-primary text-white ms-2" to="login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link btn bg-danger text-white ms-2" onClick={logOut}>
                    Logout
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
