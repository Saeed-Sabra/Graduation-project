          import { Form, Formik } from "formik";
          import React, { useEffect, useState } from "react";
          import {
            Button,
            Card,
            CardContent,
            FormControlLabel,
            Radio,
            RadioGroup,
            TextField,
            Typography,
            Rating,
          } from "@mui/material";
          import { number, object } from "yup";
          import axios from "axios";
          import style from "./Diagnosis.module.css";
          import { useNavigate } from "react-router-dom";
          import '../../index.css'

import BounceLoader from "react-spinners/BounceLoader";
import { useTranslation } from "react-i18next";

          export default function Diagnosis() {

            const { i18n } = useTranslation ();

            const [diagnosis,setDiagnosis] = useState({
              //questions
              "q1":"How old are you?",
              "q2":"Select Your Gender",
              "q3":"Enter your height",
              "q4":"Enter your weight",
              "q5":"Enter your high blood pressure",
              "q6":"Enter your low blood pressure",
              "q7":"Your Cholestrol",
              "q8":"Your Glucose",
              "q9":"Do you smoke?",
              "q10":"Do you drink Alcohol?",
              "q11":"Do you do any Activities?",
              "button1":"Next",
              "button2":"Back",
              "button3":"Submit",

              "q1Ar":"كم عمرك؟",
              "q2Ar":"ما هو جنسك؟",
              "q3Ar":"ادخل طولك",
              "q4Ar":"ادخل وزنك",
              "q5Ar":"ادخل ضغط الدم العالي لديك",
              "q6Ar":"ادخل ضغط الدك المنخفض لديك",
              "q7Ar":"نسبة الكولسترول لديك",
              "q8Ar":"نسبة الجلوكوز لديك",
              "q9Ar":"هل انت مدخن؟",
              "q10Ar":"هل تشرب الكحول؟",
              "q11Ar":"هل تقوم بأي أنشطة بدنية؟",
              "button1Ar":"التالي",
              "button2Ar":"السابق",
              "button3Ar":"ارسال",

              //asnwers
              "a1":"Normal",
              "a2":"Above Normal",
              "a3":"Well Above Normal",
              "a4":"Don't Know",
              "yes":"Yes",
              "no":"No",

              "a1Ar":"طبيعي",
              "a2Ar":"فوق الطبيعي",
              "a3Ar":"أعلى بكثير من الطبيعي",
              "a4Ar":"لا أعرف",
              "yesAr":"نعم",
              "noAr":"لا",

              //placeholders
              "l1":"Your Age",
              "l2":"Your height",
              "l3":"Your weight",
              "l4":"Your high blood pressure",
              "l5":"Your low blood pressure",
    
              "l1Ar":"عمرك",
              "l2Ar":"طولك",
              "l3Ar":"وزنك",
              "l4Ar":"ضغط الدم العالي",
              "l5Ar":"ضغط الدم المنخفض",


              //error messages
              "ageErr":"Age is requiered",
              "genderErr":"Gender is requiered",
              "HeightErr":"Height is requiered",
              "WeightErr":"Weight is requiered",
              "HighBPErr":"High blood pressure is requiered",
              "LowBPErr":"Low blood pressure is requiered",
              "CholesterolErr":"Your Cholestrol is requiered",
              "GlucoseErr":"Your Glucose is requiered",
              "qErr":"Question is requiered",

              "qErrAr":"يرجى الاجابة على السؤال",

              //resuls

              "yourResult":"Your Result",

              "normal":`You seem to have a Normal Blood Pressure and you are NOT at
              risk for Hypertension (high blood pressure). 
              Repeat the measurement a couple of times so that similar
              values are consistently obtained. Also check the measuring
              instrument/apparatus for the correct calibration. The reading
              should not be taken after a meal or exercise or after any
              stressful event. When measuring the blood pressure, the cuff
              should be properly placed and fixed on the arm.`,

              "elevated":`
              Your Blood Pressure reading is higher than the acceptable
              limits and is considered in the long term unhealthy. You can
              take simple measures to bring down your blood pressure like
              cutting down of your salt intake and starting daily brisk
              walks for 15 minutes. 
              Repeat the measurement a couple of times so that similar
              values are consistently obtained. Also check the measuring
              instrument/apparatus for the correct calibration. The reading
              should not be taken after a meal or exercise or after any
              stressful event. When measuring the blood pressure, the cuff
              should be properly placed and fixed on the arm.
              If on repeated testing the value is similar to the one that
              was indicated previously we recommend that you confirm this
              diagnosis with your doctor.
              Some people with high blood pressure (Hypertension) may
              experience chest pain, shortness of breath, nausea and blurred
              vision. However in the majority, hypertension doesn’t show any
              symptoms until complications like heart attack, heart failure,
              kidney failure and stroke develop.
              If diagnosed with hypertension you may require a few blood
              tests and ECG.
            `,
              
            "stage1":`Your Blood Pressure reading is quite high and needs to be
            controlled with medication.
            Repeat the measurement a couple of times so that similar
            values are consistently obtained. Also check the measuring
            instrument/apparatus for the correct calibration. The reading
            should not be taken after a meal or exercise or after any
            stressful event. When measuring the blood pressure, the cuff
            should be properly placed and fixed on the arm.
            If on repeated testing the value is similar to the one that
            was indicated previously we recommend that you confirm this
            diagnosis with your doctor.
            Some people with high blood pressure (Hypertension) may
            experience chest pain, shortness of breath, nausea and blurred
            vision. However in the majority, hypertension doesn’t show any
            symptoms until complications like heart attack, heart failure,
            kidney failure and stroke develop.
            If diagnosed with hypertension you may require a few blood
            tests and ECG.`,

            "stage2":`  Your Blood Pressure reading is too high and this can be
            dangerous for your health and you should seek an immediate
            appointment with your doctor.
            Repeat the measurement a couple of times so that similar
            values are consistently obtained. Also check the measuring
            instrument/apparatus for the correct calibration. The reading
            should not be taken after a meal or exercise or after any
            stressful event. When measuring the blood pressure, the cuff
            should be properly placed and fixed on the arm.
            If on repeated testing the value is similar to the one that
            was indicated previously we recommend that you confirm this
            diagnosis with your doctor.
            Some people with high blood pressure (Hypertension) may
            experience chest pain, shortness of breath, nausea and blurred
            vision. However in the majority, hypertension doesn’t show any
            symptoms until complications like heart attack, heart failure,
            kidney failure and stroke develop.
            If diagnosed with hypertension you may require a few blood
            tests and ECG.`,

            "rate":"Rate us",

            "done":"Done",
            "close":"close",

            "yourResultAr": "نتيجتك",

            "normalAr":`يبدو أن ضغط دمك طبيعي ولست معرضًا لخطر الإصابة بارتفاع ضغط الدم (ارتفاع ضغط الدم).
            كرر القياس ويتم الحصول على قيم الزوجين باستمرار. تحقق أيضًا من أداة/جهاز
             القياس للحصول على المعايرة الصحيحة. لا ينبغي أن تؤخذ
              القراءة بعد تناول وجبة أو ممارسة الرياضة أو بعد أي حدث مرهق. عند قياس ضغط الدم، يجب وضع الكفة بشكل صحيح وتثبيتها على الذراع.`,

            "elevatedAr":`قراءة ضغط الدم لديك أعلى من المستوى المقبول
              حدود ويعتبر على المدى الطويل غير صحي. أنت تستطيع
              اتخاذ تدابير بسيطة لخفض ضغط الدم مثل
              قلل من تناول الملح وابدأ بنشاط يومي
              يمشي لمدة 15 دقيقة.
              كرر القياس عدة مرات بحيث يكون مشابهًا
              يتم الحصول على القيم باستمرار. تحقق أيضًا من القياس
              أداة/جهاز للمعايرة الصحيحة. القراءة
              لا ينبغي أن تؤخذ بعد وجبة الطعام أو ممارسة الرياضة أو بعد أي
              حدث مرهق. عند قياس ضغط الدم، الكفة
              ينبغي وضعها بشكل صحيح وثابتة على الذراع.
              إذا كانت القيمة مشابهة لتلك التي عند الاختبار المتكرر
              تمت الإشارة إليه سابقًا ونوصيك بتأكيد ذلك
              التشخيص مع طبيبك.
              بعض الأشخاص الذين يعانون من ارتفاع ضغط الدم (ارتفاع ضغط الدم) قد
              تجربة ألم في الصدر، وضيق في التنفس، والغثيان وعدم وضوح الرؤية
              رؤية. ولكن في الأغلبية، لا يظهر ارتفاع ضغط الدم أي شيء
              الأعراض حتى حدوث مضاعفات مثل النوبة القلبية، وفشل القلب،
              يتطور الفشل الكلوي والسكتة الدماغية.
              إذا تم تشخيص إصابتك بارتفاع ضغط الدم، فقد تحتاج إلى القليل من الدم
              الاختبارات وتخطيط القلب.`,

              "stage1Ar":`قراءة ضغط الدم لديك مرتفعة جدًا ويجب أن تكون كذلك
              السيطرة عليها بالأدوية.
              كرر القياس عدة مرات بحيث يكون مشابهًا
              يتم الحصول على القيم باستمرار. تحقق أيضًا من القياس
              أداة/جهاز للمعايرة الصحيحة. القراءة
              لا ينبغي أن تؤخذ بعد وجبة الطعام أو ممارسة الرياضة أو بعد أي
              حدث مرهق. عند قياس ضغط الدم، الكفة
              ينبغي وضعها بشكل صحيح وثابتة على الذراع.
              إذا كانت القيمة مشابهة لتلك التي عند الاختبار المتكرر
              تمت الإشارة إليه سابقًا ونوصيك بتأكيد ذلك
              التشخيص مع طبيبك.
              بعض الأشخاص الذين يعانون من ارتفاع ضغط الدم (ارتفاع ضغط الدم) قد
              تجربة ألم في الصدر، وضيق في التنفس، والغثيان وعدم وضوح الرؤية
              رؤية. ولكن في الأغلبية، لا يظهر ارتفاع ضغط الدم أي شيء
              الأعراض حتى حدوث مضاعفات مثل النوبة القلبية، وفشل القلب،
              يتطور الفشل الكلوي والسكتة الدماغية.
              إذا تم تشخيص إصابتك بارتفاع ضغط الدم، فقد تحتاج إلى القليل من الدم
              الاختبارات وتخطيط القلب.`,

              "stage2Ar":`قراءة ضغط الدم لديك مرتفعة جدًا، وهذا يمكن أن يكون كذلك
              خطر على صحتك ويجب عليك طلب المساعدة فورًا
              موعد مع طبيبك.
              كرر القياس عدة مرات بحيث يكون مشابهًا
              يتم الحصول على القيم باستمرار. تحقق أيضًا من القياس
              أداة/جهاز للمعايرة الصحيحة. القراءة
              لا ينبغي أن تؤخذ بعد وجبة الطعام أو ممارسة الرياضة أو بعد أي
              حدث مرهق. عند قياس ضغط الدم، الكفة
              ينبغي وضعها بشكل صحيح وثابتة على الذراع.
              إذا كانت القيمة مشابهة لتلك التي عند الاختبار المتكرر
              تمت الإشارة إليه سابقًا ونوصيك بتأكيد ذلك
              التشخيص مع طبيبك.
              بعض الأشخاص الذين يعانون من ارتفاع ضغط الدم (ارتفاع ضغط الدم) قد
              تجربة ألم في الصدر، وضيق في التنفس، والغثيان وعدم وضوح الرؤية
              رؤية. ولكن في الأغلبية، لا يظهر ارتفاع ضغط الدم أي شيء
              الأعراض حتى حدوث مضاعفات مثل النوبة القلبية، وفشل القلب،
              يتطور الفشل الكلوي والسكتة الدماغية.
              إذا تم تشخيص إصابتك بارتفاع ضغط الدم، فقد تحتاج إلى القليل من الدم
              الاختبارات وتخطيط القلب.`,

              "rateAr":"قيمنا",

              "doneAr":"حسنا",
              "closeAr":"اغلاق",
              
            })
            //questions
            const q1 = i18n.language === 'ar' ? diagnosis.q1Ar : diagnosis.q1;
            const q2 = i18n.language === 'ar' ? diagnosis.q2Ar : diagnosis.q2;
            const q3 = i18n.language === 'ar' ? diagnosis.q3Ar : diagnosis.q3;
            const q4 = i18n.language === 'ar' ? diagnosis.q4Ar : diagnosis.q4;
            const q5 = i18n.language === 'ar' ? diagnosis.q5Ar : diagnosis.q5;
            const q6 = i18n.language === 'ar' ? diagnosis.q6Ar : diagnosis.q6;
            const q7 = i18n.language === 'ar' ? diagnosis.q7Ar : diagnosis.q7;
            const q8 = i18n.language === 'ar' ? diagnosis.q8Ar : diagnosis.q8;
            const q9 = i18n.language === 'ar' ? diagnosis.q9Ar : diagnosis.q9;
            const q10 = i18n.language === 'ar' ? diagnosis.q10Ar : diagnosis.q10;
            const q11 = i18n.language === 'ar' ? diagnosis.q11Ar : diagnosis.q11;
            const button1 = i18n.language === 'ar' ? diagnosis.button1Ar : diagnosis.button1;
            const button2 = i18n.language === 'ar' ? diagnosis.button2Ar : diagnosis.button2;
            const button3 = i18n.language === 'ar' ? diagnosis.button3Ar : diagnosis.button3;

            //answers
            const a1 = i18n.language === 'ar' ? diagnosis.a1Ar : diagnosis.a1;
            const a2 = i18n.language === 'ar' ? diagnosis.a2Ar : diagnosis.a2;
            const a3 = i18n.language === 'ar' ? diagnosis.a3Ar : diagnosis.a3;
            const a4 = i18n.language === 'ar' ? diagnosis.a4Ar : diagnosis.a4;
            const yes = i18n.language === 'ar' ? diagnosis.yesAr : diagnosis.yes;
            const no = i18n.language === 'ar' ? diagnosis.noAr : diagnosis.no;
          
     
            //placeholders
            const l1 = i18n.language === 'ar' ? diagnosis.l1Ar : diagnosis.l1;
            const l2 = i18n.language === 'ar' ? diagnosis.l2Ar : diagnosis.l2;
            const l3 = i18n.language === 'ar' ? diagnosis.l3Ar : diagnosis.l3;
            const l4 = i18n.language === 'ar' ? diagnosis.l4Ar : diagnosis.l4;
            const l5 = i18n.language === 'ar' ? diagnosis.l5Ar : diagnosis.l5;


            //error messages
            const ageErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.ageErr;
            const genderErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.genderErr;
            const HeightErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.HeightErr;
            const WeightErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.WeightErr;
            const HighBPErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.HighBPErr;
            const LowBPErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.LowBPErr;
            const CholesterolErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.CholesterolErr;
            const GlucoseErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.GlucoseErr;
            const qErr = i18n.language === 'ar' ? diagnosis.qErrAr : diagnosis.qErr;
         
            //results
            const yourResult = i18n.language === 'ar' ? diagnosis.yourResultAr : diagnosis.yourResult;
            const rate = i18n.language === 'ar' ? diagnosis.rateAr : diagnosis.rate;
            const done = i18n.language === 'ar' ? diagnosis.doneAr : diagnosis.done;
            const close = i18n.language === 'ar' ? diagnosis.closeAr : diagnosis.close;

            const getTranslatedContent = () => {
              if (result === "Normal") {
                return i18n.language === 'ar' ? diagnosis.normalAr : diagnosis.normal;
              } else if (result === "Elevated") {
                return i18n.language === 'ar' ? diagnosis.elevatedAr : diagnosis.elevated;
              } else if (result === "Stage1") {
                return i18n.language === 'ar' ? diagnosis.stage1Ar : diagnosis.stage1;
              } else if (result === "Stage2") {
                return i18n.language === 'ar' ? diagnosis.stage2Ar : diagnosis.stage2;
              }
            
              return '';
            };

            const navigate = useNavigate();

            const token = localStorage.getItem("UserToken");
            const [result, setResult] = useState(null);
            const sendDiagnosisData = async (values) => {
              const { data } = await axios.post(
                "http://localhost:3001/users/prediction",
                values,
                { headers: { Authorization: `Bearer ${token}` } }
              );
         
              setResult(data.predictions[0]);
            };

            const goHome = ()=>{
              navigate("/")
            }

            const [loading,setLoading] = useState(false);
            let [color, setColor] = useState("#36a6d6");
          
            useEffect(() =>{
              setLoading(true);
              setTimeout(()=>{
                setLoading(false);
              },2000)
            },[])

            return (
              <>
              <div>
            {loading ? (
              <div className={'loaderContainer'}>
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
    
<div
  style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
  className="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabIndex={-1}
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">
          {yourResult}
        </h1>
        {result ==="Stage2"?
      <img src="assets/harmful.webp" width={50}/>:""}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>

      <div className="modal-body">
        {result === "Normal" ? (
        <p>{getTranslatedContent()}</p>
        ) : null}

        {result === "Elevated" ? (
        <p>{getTranslatedContent()}</p>
        ) : null}

        {result === "Stage1" ? (
          <p>{getTranslatedContent()}</p>
        ) : null}

        {result === "Stage2" ? (
          <p>{getTranslatedContent()}</p>
        ) : null}
      </div>
      <h3 className="text-center">{rate}</h3>
      <Rating
        name="size-large"
        className="m-auto mb-4"
        defaultValue={0}
        size="large"
      />
      <div className="modal-footer m-auto">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          {close}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-dismiss="modal"
          onClick={goHome}
        >
          {done}
        </button>
      </div>
    </div>
  </div>
</div>

<Card sx={{ width: 1100, height: 500, mt: 12, boxShadow: 3 }}>
  <CardContent>
    <Formik
      validationSchema={object().shape({
        Age: number()
          .required(ageErr)
          .positive()
          .integer()
          .min(15, "minimum age must be 15")
          .max(90, "maximum age must be 90"),
        Gender: number().positive().required(genderErr),
        Height: number().positive().required(HeightErr),
        Weight: number().positive().required(WeightErr),
        HighBP: number()
          .positive()
          .required(HighBPErr),
        LowBP: number()
          .positive()
          .required(LowBPErr),
        Cholesterol: number().required(CholesterolErr),
        Glucose: number().required(GlucoseErr),
        Smoking: number().required(qErr),
        Alcohol: number().required(qErr),
        Activity: number().required(qErr),
      })}
      initialValues={{
        Age: undefined,
        Gender: undefined,
        Height: undefined,
        Weight: undefined,
        HighBP: undefined,
        LowBP: undefined,
        Cholesterol: undefined,
        Glucose: undefined,
        Smoking: undefined,
        Alcohol: undefined,
        Activity: undefined,
      }}
      onSubmit={(values) => {
        sendDiagnosisData(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateField,
        setFieldTouched,
      }) => (
        <Form onSubmit={handleSubmit} className="m-auto text-center">
          <FormSteps
            isSubmitting={isSubmitting}
            validateField={validateField}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            values={values}
            button1={button1}  
            button2={button2}
            button3={button3}
          >
            <div>
              <Typography
                variant="h6"
                sx={{ mt: 15, mb: 3 }}
                component="legend"
              >
                {q1}
              </Typography>
              <TextField
              style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                fullWidth
                name="Age"
                id="Age"
                type="number"
                value={values.Age === undefined ? "" : values.Age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={l1}
                InputProps={{
                  inputProps: {
                    min: 15,
                    max: 80,
                  },
                }}
                error={errors.Age ? true : false}
                helperText={errors.Age && errors.Age}
              />
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mb: 3 }}>
                {q2}
              </Typography>
              <RadioGroup
                sx={{ width: "150%", mt: 10 }}
                row
                name="Gender"
                id="Gender"
                value={
                  values.Gender === undefined ? "" : String(values.Gender)
                }
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Gender",
                      value: numericValue,
                    },
                  });
                }}
              >
                <Radio
                  checked={values.Gender === 2}
                  onChange={(event) => {
                    const numericValue = parseInt(event.target.value);
                    handleChange({
                      target: {
                        name: "Gender",
                        value: numericValue,
                      },
                    });
                  }}
                  value={2}
                  style={{ display: "none" }}
                />
                <label
                  className={`${style.gender_option} ${
                    values.Gender === 2 ? style.selected : ""
                  } me-5`}
                  htmlFor="gender-male"
                  onClick={() => {
                    const numericValue = 2;
                    handleChange({
                      target: {
                        name: "Gender",
                        value: numericValue,
                      },
                    });
                  }}
                >
                  <img
                    src="assets/male.webp"
                    alt="Male"
                    width={170}
                    className="me-4"
                  />
                </label>

                <Radio
                  checked={values.Gender === 1}
                  onChange={(event) => {
                    const numericValue = parseInt(event.target.value);
                    handleChange({
                      target: {
                        name: "Gender",
                        value: numericValue,
                      },
                    });
                  }}
                  value={1}
                  style={{ display: "none" }}
                />
                <label
                  className={`${style.gender_option} ${
                    values.Gender === 1 ? style.selected : ""
                  }`}
                  htmlFor="gender-female"
                  onClick={() => {
                    const numericValue = 1;
                    handleChange({
                      target: {
                        name: "Gender",
                        value: numericValue,
                      },
                    });
                  }}
                >
                  <img
                    src="assets/female.webp"
                    alt="Female"
                    width={170}
                  />
                </label>
              </RadioGroup>
              {errors.Gender && (
                <div style={{ color: "red" }}>{errors.Gender}</div>
              )}
            </div>

            <div>
              <Typography
                variant="h6"
                component="legend"
                sx={{ mt: 15, mb: 3 }}
              >
                {q3}
              </Typography>
              <TextField
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                fullWidth
                name="Height"
                id="Height"
                type="number"
                value={values.Height === undefined ? "" : values.Height}
                onChange={handleChange}
                placeholder={l2}
                error={errors.Height ? true : false}
                helperText={errors.Height && errors.Height}
              />
            </div>

            <div>
              <Typography
                variant="h6"
                component="legend"
                sx={{ mt: 15, mb: 3 }}
              >
                {q4}
              </Typography>
              <TextField
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                fullWidth
                name="Weight"
                id="Weight"
                type="number"
                value={values.Weight === undefined ? "" : values.Weight}
                onChange={handleChange}
                placeholder={l3}
                error={errors.Weight ? true : false}
                helperText={errors.Weight && errors.Weight}
              />
            </div>

            <div>
              <Typography
                variant="h6"
                component="legend"
                sx={{ mt: 15, mb: 3 }}
              >
                {q5}
              </Typography>
              <TextField
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                fullWidth
                name="HighBP"
                id="HighBP"
                type="number"
                value={values.HighBP === undefined ? "" : values.HighBP}
                onChange={handleChange}
                placeholder={l4}
                InputProps={{
                  inputProps: {
                    min: 90,
                    max: 190,
                  },
                }}
                error={errors.HighBP ? true : false}
                helperText={errors.HighBP && errors.HighBP}
              />
            </div>

            <div>
              <Typography
                variant="h6"
                component="legend"
                sx={{ mt: 15, mb: 3 }}
              >
                {q6}
              </Typography>
              <TextField
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                fullWidth
                name="LowBP"
                id="LowBP"
                type="number"
                value={values.LowBP === undefined ? "" : values.LowBP}
                onChange={handleChange}
                placeholder={l5}
                InputProps={{
                  inputProps: {
                    min: 60,
                    max: 130,
                  },
                }}
                error={errors.LowBP ? true : false}
                helperText={errors.LowBP && errors.LowBP}
              />
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
              {q7}
              </Typography>
              <RadioGroup
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                name="Cholesterol"
                id="Cholesterol"
                type="radio"
                value={
                  values.Cholesterol === undefined
                    ? ""
                    : values.Cholesterol
                }
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Cholesterol",
                      value: numericValue,
                    },
                  });
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={a1}
                  name="Cholesterol"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={a2}
                  name="Cholesterol"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={a3}
                  name="Cholesterol"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={a4}
                  name="Cholesterol"
                />
              </RadioGroup>
              {errors.Cholesterol && (
                <div style={{ color: "red" }}>{errors.Cholesterol}</div>
              )}
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
              {q8}
              </Typography>
              <RadioGroup
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                name="Glucose"
                id="Glucose"
                type="radio"
                value={values.Glucose === undefined ? "" : values.Glucose}
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Glucose",
                      value: numericValue,
                    },
                  });
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={a1}
                  name="Glucose"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={a2}
                  name="Glucose"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={a3}
                  name="Glucose"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={a4}
                  name="Glucose"
                />
              </RadioGroup>
              {errors.Glucose && (
                <div style={{ color: "red" }}>{errors.Glucose}</div>
              )}
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
              {q9}
              </Typography>
              <RadioGroup
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                sx={{ ml: 15 }}
                row
                name="Smoking"
                id="Smoking"
                type="radio"
                value={values.Smoking === undefined ? "" : values.Smoking}
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Smoking",
                      value: numericValue,
                    },
                  });
                }}
              >
                <FormControlLabel
                  className="me-5"
                  value="1"
                  control={<Radio />}
                  label={yes}
                  name="Smoking"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={no}
                  name="Smoking"
                />
              </RadioGroup>
              {errors.Smoking && (
                <div style={{ color: "red" }}>{errors.Smoking}</div>
              )}
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
              {q10}
              </Typography>
              <RadioGroup
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                sx={{ ml: 17 }}
                row
                name="Alcohol"
                id="Alcohol"
                type="radio"
                value={values.Alcohol === undefined ? "" : values.Alcohol}
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Alcohol",
                      value: numericValue,
                    },
                  });
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={yes}
                  name="Alcohol"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={no}
                  name="Alcohol"
                />
              </RadioGroup>
              {errors.Alcohol && (
                <div style={{ color: "red" }}>{errors.Alcohol}</div>
              )}
            </div>

            <div>
              <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
              {q11}
              </Typography>
              <RadioGroup
                style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                sx={{ ml: 15 }}
                row
                name="Activity"
                id="Activity"
                type="radio"
                value={
                  values.Activity === undefined ? "" : values.Activity
                }
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value);
                  handleChange({
                    target: {
                      name: "Activity",
                      value: numericValue,
                    },
                  });
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={yes}
                  name="Activity"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={no}
                  name="Activity"
                />
              </RadioGroup>
              {errors.Activity && (
                <div style={{ color: "red" }}>{errors.Activity}</div>
              )}
            </div>
          </FormSteps>
        </Form>
      )}
    </Formik>
  </CardContent>
</Card>
    </>
            )}
          </div>
</>
);
}

const FormSteps = (props) => {
const childrenArray = React.Children.toArray(props.children);
const [step, setStep] = useState(0);
console.log(childrenArray[step]);
console.log(props.errors);

const currentChild = childrenArray[step];
const name = currentChild.props.name;

const goBack = () => {
setStep(step - 1);
};

const goNext = () => {
const fieldValue = childrenArray[step].props.children[1].props.value;
console.log(fieldValue);
if (
fieldValue === undefined ||
fieldValue === "" ||
childrenArray[step].props.children[1].props.error === true
) {
props.validateField(name);
props.setFieldTouched(name, true);
} else {
setStep(step + 1);
console.log("test");
}
};

const popUp = (values) => {
alert(JSON.stringify(values, null, 2));
};

return (
<>
{childrenArray[step]}

{step > 0 && (
  <Button
    sx={{ mt: 15, mr: 5 }}
    disabled={props.isSubmitting}
    variant="contained"
    color="secondary"
    onClick={goBack}
  >
    {props.button2}
  </Button>
)}

{step < childrenArray.length - 1 && (
  <Button
    sx={{ mt: 15 }}
    disabled={props.isSubmitting}
    variant="contained"
    onClick={goNext}
  >
    {props.button1}
  </Button>
)}

{step === childrenArray.length - 1 && (
  <Button
    sx={{ mt: 15 }}
    type="submit"
    disabled={props.isSubmitting}
    variant="contained"
    color="primary"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
    // onClick={() => popUp(props.values)}
  >
    {props.button3}
  </Button>
)}



              </>
            );
          };
