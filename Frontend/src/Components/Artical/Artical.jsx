import React, { useState } from 'react';
import i18n from '../../i18n.js';
import style from './Artical.module.css';
import { useTranslation } from 'react-i18next';

export default function Artical() {
  const { i18n } = useTranslation ();

  const [article,setArticle] = useState({
    "title": "Artical",
    "header": "What you need to know about blood pressure",
    "button":"Read More",
    "titleAr": "مقالة",
    "headerAr": "ما تريد ان تعرفه عن ضغط الدم",
    "buttonAr":"اقرأ المزيد"
  })

  const title = i18n.language === 'ar' ? article.titleAr : article.title;
  const header = i18n.language === 'ar' ? article.headerAr : article.header;
  const button = i18n.language === 'ar' ? article.buttonAr : article.button;


  return (
    <div className='row m-auto shadow-lg my-5 rounded bg-white' style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="col-lg-6">
        <img src="assets/blood-pressure.jpg" className='w-100' alt="blood-pressure" />
      </div>

      <div className='col-lg-6 d-flex align-items-center'>
        <div className="p-4"> 
          <span>{title}</span>
          <h2 className="mb-4">{header}</h2>
          <a href="https://www.medicalnewstoday.com/articles/327151?fbclid=IwAR0lRBYqOS6asCnY_73tms7m8CJSv5rgRyjosp-aKr4pNhyXOIOcWTnX3Fo#prevention-and-control" target='blank' className="btn btn-primary">{button}</a>
        </div>
      </div>
    </div>
  );
}
