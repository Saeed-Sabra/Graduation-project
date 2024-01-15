import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
   const { i18n } = useTranslation();
   const [heading, setHeading] = useState({
      id: 1,
      title: "Health Care",
      header: "Your Health is our priority",
      paragraph: "Check on your health by answering some questions honestly to get an accurate result",
      button1:"Get Started",
      button2:"Learn More",
      titleAr: "الرعاية الصحية",
      headerAr: "صحتك هي أولويتنا",
      paragraphAr: "اطمئن على صحتك من خلال الإجابة على بعض الأسئلة بصراحة للحصول على نتيجة دقيقة",
      button1Ar:"ابدأ الفحص",
      button2Ar:"اعرف المزيد",
   });

   const title = i18n.language === 'ar' ? heading.titleAr : heading.title;
   const header = i18n.language === 'ar' ? heading.headerAr : heading.header;
   const paragraph = i18n.language === 'ar' ? heading.paragraphAr : heading.paragraph;
   const button1 = i18n.language === 'ar' ? heading.button1Ar : heading.button1;
   const button2 = i18n.language === 'ar' ? heading.button2Ar : heading.button2;

   return (
      <div className="row">
         <div className="col-lg-6 d-flex align-items-center">
            <div style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
               <span className= 'text-primary'>{title}</span>
               <h1>{header}</h1>
               <p>{paragraph}</p>
               <Link className= 'btn bg-primary text-white p-2 px-3'  to='diagnosis'>{button1}</Link>
               <Link className='btn bg-primary p-2 text-black ms-4 me-4 px-3' to='About'>{button2}</Link>
            </div>
         </div>
         <div className="col-lg-6">
            <div className='mt-5 ms-5'>
               <img src="assets/4807695.png" alt="Header image icon"/>
            </div>
         </div>
      </div>
   );
}
