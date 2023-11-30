import React, { useState } from 'react'
import style from './instruction.module.css'
import { faWarning } from '../FontAwesomeIcons/FontAwesomeIcons.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n.js';

export default function Instructions() {
  const { i18n } = useTranslation ();

const [instruction,setInstruction] = useState({
  "header":"Our website provides you with a fast and accurate assessment of your symptoms",
  "li1":"Enter your details",
  "li2":"Answer some simple questions",
  "li3":"Done! your assessment will reveal your stage of your symptom",
  "warning":"This test does not replace the need to visit a doctor",
  "headerAr":"يوفر لك موقعنا تقييمًا سريعًا ودقيقًا لأعراضك",
  "li1Ar":"ادخل بياناتك",
  "li2Ar":"أجب بعض الاسئلة البسيطة",
  "li3Ar":"جاهز! سيظهر تقييمك عن المرحلة التي وصلت إليها الأعراض",
  "warningAr":"هذا الفحص لا يغنيك عن الحاجة لزيارة الطبيب"
})

const header = i18n.language === 'ar' ? instruction.headerAr : instruction.header;
const li1 = i18n.language === 'ar' ? instruction.li1Ar : instruction.li1;
const li2 = i18n.language === 'ar' ? instruction.li2Ar : instruction.li2;
const li3 = i18n.language === 'ar' ? instruction.li3Ar : instruction.li3;
const warning = i18n.language === 'ar' ? instruction.warningAr : instruction.warning;

  return (

    <div className={`${style.row} row bg-body-tertiary m-auto shadow-lg p-4 my-5 rounded`} style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
        <div className={`col-lg-6 ${style.leftSide} d-flex align-items-center`}>
            <div >
            <h2>{header}</h2>
            <ul className='mt-3'>
                <li>{li1}</li>
                <li>{li2}</li>
                <li>{li3}</li>
            </ul>
            </div>
        </div>

        <div className={`${style.rightSide} col-lg-6 d-flex justify-content-center`}>
            <img src="assets/robot.png" alt="robot" className={style.img} />
        </div>

        <div className='w-50 d-flex alert alert-danger align-items-center'>
        <FontAwesomeIcon icon={faWarning} className='text-danger me-3' />
        <span className='fw-bold'>{warning}</span> 
        </div>
    </div>
  )
}

