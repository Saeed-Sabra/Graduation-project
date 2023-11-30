import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from '../../i18n.js';
import { useTranslation } from 'react-i18next';
export default function Navbar({user,logOut}) {

  const { i18n } = useTranslation ();

  const [nav,setNav] = useState({
    "home":"Home",
    "dashboard":"Dashboard",
    "about":"About",
    "history":"History",
    "profile":"Profile",
    "logout":"Logout",
    "register":"Register",
    "login":"Login",
    "homeAr":"الصفحة الرئيسية",
    "dashboardAr":"لوحة المعلومات",
    "aboutAr":"حول",
    "historyAr":"الفحوصات",
    "profileAr":"الصفحة الشخصية",
    "logoutAr":"تسجيل الخروج",
    "registerAr":"انشاء حساب",
    "loginAr":"تسجيل الدخول",
  })
  
  const home = i18n.language === 'ar' ? nav.homeAr : nav.home;
  const dashboard = i18n.language === 'ar' ? nav.dashboardAr : nav.dashboard;
  const about = i18n.language === 'ar' ? nav.aboutAr : nav.about;
  const history = i18n.language === 'ar' ? nav.historyAr : nav.history;
  const profile = i18n.language === 'ar' ? nav.profileAr : nav.profile;
  const logout = i18n.language === 'ar' ? nav.logoutAr : nav.logout;
  const register = i18n.language === 'ar' ? nav.registerAr : nav.register;
  const login = i18n.language === 'ar' ? nav.loginAr : nav.login;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
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
                {home}
              </Link>
            </li>
            {user && user.isAdmin === true && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  {dashboard}
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="about">
                {about}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="history">
                {history}
              </Link>
            </li>
            {!user ? (
              <>
                {/* ... (other imports) */}

<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <FontAwesomeIcon icon={faGlobe} className='me-3' />
  </button>
  <ul className="dropdown-menu">
    <li>
      <span className='flag-icon flag-icon-us'></span>
      <span onClick={() => i18n.changeLanguage('en')}>English</span>
    </li>
    <li>
      <span className='flag-icon flag-icon-sa'></span>
      <span onClick={() => i18n.changeLanguage('ar')}>Arabic</span>
    </li>
  </ul>
</div>


                <li className="nav-item">
                  <Link className="nav-link btn bg-primary text-white" to="register">
                    {register}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn bg-primary text-white ms-2" to="login">
                    {login}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="profile">
                    {profile}
                  </Link>
                </li>
                 <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faGlobe} className='me-3 text-primary w-50' />
                  </button>
                  <ul class="dropdown-menu">
                    <li className='d-flex btn' onClick={()=>i18n.changeLanguage('en')}>
                    <img src="assets/US-flag.webp" alt="" width={30} height={20} className='mt-1'/>
                      <p className='ms-2'>English</p>
                    </li>
                    <li className='d-flex btn' onClick={()=>i18n.changeLanguage('ar')}>
                     <img src="assets/Saudi_Arabia_Flag.jpg" alt="" width={30} height={20} className='mt-1'/>
                      <p className='ms-2 mb-1'>Arabic</p>
                    </li>
                  </ul>
                </div>
                <li className="nav-item">
                  <p className="nav-link btn bg-danger text-white ms-2" onClick={logOut}>
                    {logout}
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
