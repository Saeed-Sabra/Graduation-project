import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function NotFound() {
  const { i18n } = useTranslation ();

  const [notFound,setNotFound] = useState({
    "header":"Page Not Found",
    "home":"Home",
    "headerAr":"الصفحة غير موجودة",
    "homeAr":"الصفحة الرئيسية"
  })
  
  const header = i18n.language === 'ar' ? notFound.headerAr : notFound.header;
  const home = i18n.language === 'ar' ? notFound.homeAr : notFound.home;


  return (
    <div className='text-center mt-4'>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
            </Helmet>
        <img src={require('./Notfound.png')} alt="notFound" width={500} />
        <h2>{header}</h2>
        <Link className='btn btn-primary' to='/'>{home}</Link>
    </div>
  )
}
