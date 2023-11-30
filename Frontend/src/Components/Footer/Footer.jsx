import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function Footer() {

  const { i18n } = useTranslation ();

  const [footer,setFooter] = useState({
    "paragraph": "Health assessor and triage technology is powered by",
    "span": "PTUK Team!",
    "link1":"About",
    "link2":"Contact",
    "paragraphAr": "يتم نطوير تقنية التقييم الصحي والتحليل بواسطة",
    "spanAr": "!PTUK فريق",
    "link1Ar":"حول",
    "link2Ar":"تواصل معنا"
  })

  const paragraph = i18n.language === 'ar' ? footer.paragraphAr : footer.paragraph;
  const span = i18n.language === 'ar' ? footer.spanAr : footer.span;
  const link1 = i18n.language === 'ar' ? footer.link1Ar : footer.link1;
  const link2 = i18n.language === 'ar' ? footer.link2Ar : footer.link2;

  return (
    <div className='shadow-lg p-4 my-5 rounded w-50 m-auto bg-white' style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <p>{paragraph} <span className='text-primary'>{span}</span> </p>
      <div>
        <a href="" >{link1}</a>
        <a href="" className='me-4'>{link2}</a>
      </div>
    </div>
  )
}
