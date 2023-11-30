import React, { useEffect, useState } from 'react'
import '../../index.css'
import BounceLoader from 'react-spinners/BounceLoader';
import { useTranslation } from 'react-i18next';

export default function About() {

  const { i18n } = useTranslation ();

  const [instruction,setInstruction] = useState({
    "h1":"Welcome to Our Graduation Project Website",
    "h2":"Interactive Blood Pressure Test",
    "h3":"Healthy Lifestyle Tips",
    "p1":`Dedicated to providing valuable information and tools for understanding and monitoring
     blood pressure. Our team of four students has collaborated to create a user-friendly platform to raise awareness
     about the importance of maintaining healthy blood pressure.`,
    "p2":`Our primary mission is to empower individuals with knowledge about blood pressure 
    and its impact on overall health. We believe that informed individuals are better equipped 
    to make lifestyle choices that contribute to their well-being.`,
    "p3":`Our website offers a user-friendly blood pressure test, providing instant results 
    and interpretations. It is a convenient tool for individuals to regularly monitor their blood pressure.`,
    "p4":`Discover a wealth of information on lifestyle modifications that can positively impact blood pressure. 
    From dietary recommendations to stress management techniques, we've got you covered.`,
    
    "h1Ar":"مرحباً بكم في موقع مشروع التخرج الخاص بنا",
    "h2Ar":"اختبار ضغط الدم التفاعلي",
    "h3Ar":"نصائح لنمط حياة صحي",
    "p1Ar":`مخصص لتوفير معلومات وأدوات قيمة لفهم ومراقبة ضغط الدم.
     لقد تعاون فريقنا المكون من أربعة طلاب لإنشاء منصة سهلة الاستخدام لرفع مستوى الوعي حول أهمية الحفاظ على ضغط دم صحي.`,
    "p2Ar":`مهمتنا الأساسية هي تمكين الأفراد بالمعرفة حول ضغط الدم 
    وتأثيره على الصحة العامة. نحن نؤمن بأن الأفراد المطلعين مجهزون بشكل أفضل لاتخاذ خيارات نمط الحياة التي تساهم في رفاهيتهم.`,
    "p3Ar":`يقدم موقعنا الإلكتروني اختبار ضغط الدم سهل الاستخدام،
     ويقدم نتائج وتفسيرات فورية. إنها أداة مناسبة للأفراد لمراقبة ضغط الدم بانتظام.`,
    "p4Ar":`اكتشف ثروة من المعلومات حول تعديلات نمط الحياة التي يمكن
     أن تؤثر بشكل إيجابي على ضغط الدم. بدءًا من التوصيات الغذائية وحتى تقنيات إدارة التوتر، فإننا نوفر لك كل ما تحتاجه.`,

  })
  
  const h1 = i18n.language === 'ar' ? instruction.h1Ar : instruction.h1;
  const h2 = i18n.language === 'ar' ? instruction.h2Ar : instruction.h2;
  const h3 = i18n.language === 'ar' ? instruction.h1Ar : instruction.h3;
  const p1 = i18n.language === 'ar' ? instruction.p1Ar : instruction.p1;
  const p2 = i18n.language === 'ar' ? instruction.p2Ar : instruction.p2;
  const p3 = i18n.language === 'ar' ? instruction.p3Ar : instruction.p3;
  const p4 = i18n.language === 'ar' ? instruction.p4Ar : instruction.p4;



  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36a6d6");

  useEffect(() =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2000)
  },[])


  return (
    <div>
    {loading ? (
      <div className='loaderContainer'>
        <BounceLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="BounceLoader"
          data-testid="loader"
        />
      </div>
    ) : (
    <>
    <div className='mt-5' style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
    <h1>{h1}</h1>
    <p>{p1}</p>
    <p>{p2}</p>
    <h2>{h2}</h2>
    <p>{p3}</p>
    <h2>{h3}</h2>
    <p>{p4}</p>
  </div>
    
    </>)}
    </div>
);
};

