import { Form, Formik } from "formik";
import React, { useState } from "react";
import {Button, Card, CardContent, FormControlLabel, Radio, RadioGroup, TextField, Typography, Rating } from "@mui/material";
import { number, object } from "yup";
import axios from "axios";
import style from './Diagnosis.module.css'



export default function Diagnosis() {
  const token = localStorage.getItem('UserToken')
  const [result,setResult] = useState(null)
  const sendDiagnosisData = async (values)=>{
    const {data} = await axios.post('http://localhost:3001/users/prediction',values,{headers:{Authorization:`Bearer ${token}`}})
    // console.log(data)
    setResult(data.predictions[0])
    console.log('Result set:', data.predictions[0]);
}

  return(
    <>
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Result</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <div className="modal-body">
        {result === "Normal" ? 
          <p>
            You seem to have a Normal Blood Pressure and you are NOT at risk for Hypertension (high blood pressure). <br />
            <br />
            Repeat the measurement a couple of times so that similar values are consistently obtained. Also check the measuring
            instrument/apparatus for the correct calibration. The reading should not be taken after a meal or exercise or 
            after any stressful event. When measuring the blood pressure, the cuff should be properly placed and fixed on the arm.
          </p>
         : null}

          {result === "Elevated" ? 
                    <p>
                              Your Blood Pressure reading is higher than the acceptable limits and is considered in the long term unhealthy. 
                              You can take simple measures to bring down your blood pressure like cutting down of your salt intake and starting daily 
                              brisk walks for 15 minutes. <br /><br />
                            Repeat the measurement a couple of times so that similar values are consistently obtained. 
                            Also check the measuring instrument/apparatus for the correct calibration. The reading should not be taken after a meal or exercise or after any stressful event. When measuring the blood pressure, 
                            the cuff should be properly placed and fixed on the arm.
                            <br /> <br />

                            If on repeated testing the value is similar to the one that was indicated previously
                            we recommend that you confirm this diagnosis with your doctor.
                            <br /> <br />

                            Some people with high blood pressure (Hypertension) may experience chest pain, shortness 
                            of breath, nausea and blurred vision. However in the majority, hypertension doesn’t show any symptoms until
                            complications like heart attack, heart failure, kidney failure and stroke develop.
                            <br /> <br />

                            If diagnosed with hypertension you may require a few blood tests and ECG.
                    </p>
                  : null}

          {result === "Stage1" ? 
                    <p>
           Your Blood Pressure reading is quite high and needs to be controlled with medication.
<br /> <br />
Repeat the measurement a couple of times so that similar values are consistently obtained. Also check the measuring instrument/apparatus for the correct calibration. The reading should not be taken after a meal or exercise or after any stressful event. When measuring the blood pressure, the cuff should be properly placed and fixed on the arm.
<br /> <br />
If on repeated testing the value is similar to the one that was indicated previously we recommend that you confirm this diagnosis with your doctor.
<br /> <br />
Some people with high blood pressure (Hypertension) may experience chest pain, shortness of breath, nausea and blurred vision. However in the majority, hypertension doesn’t show any symptoms until complications like heart attack, heart failure, kidney failure and stroke develop.
<br /> <br />
If diagnosed with hypertension you may require a few blood tests and ECG.
                    </p>
                  : null}

          {result === "Stage2" ? 
                    <p>
Your Blood Pressure reading is too high and this can be dangerous for your health and you should seek an immediate appointment with your doctor.
<br /><br />
Repeat the measurement a couple of times so that similar values are consistently obtained. Also check the measuring instrument/apparatus for the correct calibration. The reading should not be taken after a meal or exercise or after any stressful event. When measuring the blood pressure, the cuff should be properly placed and fixed on the arm.
<br /><br />

If on repeated testing the value is similar to the one that was indicated previously we recommend that you confirm this diagnosis with your doctor.
<br /> <br />
Some people with high blood pressure (Hypertension) may experience chest pain, shortness of breath, nausea and blurred vision. However in the majority, hypertension doesn’t show any symptoms until complications like heart attack, heart failure, kidney failure and stroke develop.
<br /> <br />
If diagnosed with hypertension you may require a few blood tests and ECG.
                    </p>
                  : null}

      </div>
      <h3 className="text-center">Rate us</h3>
      <Rating name="size-large" className="m-auto mb-4" defaultValue={0} size="large" />
      <div className="modal-footer m-auto">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>


      {/* <Typography variant="h5" className="text-center mt-1">Diagnosis Page</Typography> */}
    <Card sx={{width:1100,height:500, mt: 12, boxShadow: 3}}>
    <CardContent>


      
    <Formik

      validationSchema={object().shape({
        Age: number().required("Age is requiered").positive().integer().min(15,"minimum age must be 15").max(90,"maximum age must be 90"),
        Gender: number().positive().required("Gender is requiered"),
        Height: number().positive().required("Height is requiered"),
        Weight: number().positive().required("Weight is requiered"),
        HighBP: number().positive().required("High blood pressure is requiered"),
        LowBP: number().positive().required("Low blood pressure is requiered"),
        Cholesterol: number().required("Your cholesterol rate is requiered"),
        Glucose: number().required("Your glucose rate is requiered"),
        Smoking: number().required("Question is requiered"),
        Alcohol: number().required("Question is requiered"),
        Activity: number().required("Question is requiered")
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
         setFieldTouched
       }) => (

         
        
         <Form onSubmit={handleSubmit} className="m-auto text-center">

           <FormSteps
              isSubmitting={isSubmitting}
              validateField={validateField}
              setFieldTouched={setFieldTouched}
              errors={errors}
              touched={touched}
              values={values}
            >
    
    <div>
          <Typography variant="h6" sx={{mt: 15, mb:3}} component="legend">How old are you?</Typography>
            <TextField
                  fullWidth
                  name="Age"
                  id="Age"
                  type="number"
                  value={values.Age === undefined ? '' : values.Age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Age"
                  InputProps={{
                    inputProps: {
                      min: 15,
                      max: 80,
                    },
                  }}
                  error={errors.Age? true: false}
                  helperText={errors.Age && errors.Age}
                  />
    </div>
        
    <div>
  <Typography variant="h6" component="legend" sx={{ mb: 3 }}>
    Select Your Gender
  </Typography>
  <RadioGroup
    sx={{ width: '150%', mt: 10 }}
    row
    name="Gender"
    id="Gender"
    value={values.Gender === undefined ? '' : String(values.Gender)}
    onChange={(event) => {
      const numericValue = parseInt(event.target.value);
      handleChange({
        target: {
          name: 'Gender',
          value: numericValue,
        },
      });
    }}
  >
    <Radio
      checked={values.Gender === 1}
      onChange={(event) => {
        const numericValue = parseInt(event.target.value);
        handleChange({
          target: {
            name: 'Gender',
            value: numericValue,
          },
        });
      }}
      value={1}
      style={{ display: 'none' }}
    />
    <label
  className={`${style.gender_option} ${values.Gender === 1 ? style.selected : ''} me-5`}
  htmlFor="gender-male"
      onClick={() => {
        const numericValue = 1;
        handleChange({
          target: {
            name: 'Gender',
            value: numericValue,
          },
        });
      }}
    >
      <img src="assets/male.webp" alt="Male" width={170} className="me-4" />
    </label>

    <Radio
      checked={values.Gender === 2}
      onChange={(event) => {
        const numericValue = parseInt(event.target.value);
        handleChange({
          target: {
            name: 'Gender',
            value: numericValue,
          },
        });
      }}
      value={2}
      style={{ display: 'none' }}
    />
    <label
  className={`${style.gender_option} ${values.Gender === 2 ? style.selected : ''}`}
  htmlFor="gender-female"
      onClick={() => {
        const numericValue = 2;
        handleChange({
          target: {
            name: 'Gender',
            value: numericValue,
          },
        });
      }}
    >
      <img src="assets/female.webp" alt="Female" width={170} />
    </label>
  </RadioGroup>
  {errors.Gender && (
    <div style={{ color: 'red' }}>{errors.Gender}</div>
  )}
</div>



<div>

      <Typography variant="h6" component="legend" sx={{mt: 15, mb:3}}>Enter your height</Typography>
          <TextField
                  fullWidth
                  name="Height"
                  id="Height"
                  type="number"
                  value={values.Height === undefined ? '' : values.Height}
                  onChange={handleChange}
                  placeholder="Your Height"
                  error={errors.Height? true: false}
                  helperText={errors.Height && errors.Height}
                />
</div>
   

          <div>
            <Typography variant="h6" component="legend" sx={{mt: 15, mb:3}}>Enter your weight</Typography>
            <TextField
                  fullWidth
                  name="Weight"
                  id="Weight"
                  type="number"
                  value={values.Weight === undefined ? '' : values.Weight}
                  onChange={handleChange}
                  placeholder="Your Weight"
                  error={errors.Weight? true: false}
                  helperText={errors.Weight && errors.Weight}
                />
                  </div>




<div>

            <Typography variant="h6" component="legend" sx={{mt: 15, mb:3}}>Enter your hight blood pressure</Typography>
            <TextField
                  fullWidth
                  name="HighBP"
                  id="HighBP"
                  type="number"
                  value={values.HighBP === undefined ? '' : values.HighBP}
                  onChange={handleChange}
                  placeholder="Your High Blood Pressure"
                  InputProps={{
                    inputProps: {
                      min: 90,
                      max: 190,
                    },
                  }}
                  error={errors.HighBP? true: false}
                  helperText={errors.HighBP && errors.HighBP}
                />
</div>

                    <div>
                    <Typography variant="h6" component="legend" sx={{mt: 15, mb:3}}>Enter your low blood pressure</Typography>
            <TextField
                  fullWidth
                  name="LowBP"
                  id="LowBP"
                  type="number"
                  value={values.LowBP === undefined ? '' : values.LowBP}
                  onChange={handleChange}
                  placeholder="Your Low Blood Pressure"
                  InputProps={{
                    inputProps: {
                      min: 60,
                      max: 130,
                    },
                  }}
                  error={errors.LowBP? true: false}
                  helperText={errors.LowBP && errors.LowBP}
                />
                    </div>


<div>
<Typography variant="h6" component="legend" sx={{mt: 5}}>Your Cholestrol</Typography>
  <RadioGroup
  name="Cholesterol"
  id="Cholesterol"
  type="radio"
  value={values.Cholesterol === undefined ? '' : values.Cholesterol}
  onChange={(event) => {
    const numericValue = parseInt(event.target.value);
    handleChange({
      target: {
        name: 'Cholesterol',
        value: numericValue,
      },
    });
  }}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label="Normal"
    name="Cholesterol" 
  />
  <FormControlLabel
    value="2"
    control={<Radio />}
    label="Above Normal"
    name="Cholesterol" 
  />
    <FormControlLabel
    value="3"
    control={<Radio />}
    label="Well Above Normal"
    name="Cholesterol" 
  />
    <FormControlLabel
    value="0"
    control={<Radio />}
    label="Don't Know"
    name="Cholesterol" 
  />
</RadioGroup>
{errors.Cholesterol && (
  <div style={{ color: 'red' }}>{errors.Cholesterol}</div>
)}
</div>



<div>
<Typography variant="h6" component="legend" sx={{mt: 5}}>Your Glucose</Typography>
  <RadioGroup
  name="Glucose"
  id="Glucose"
  type="radio"
  value={values.Glucose === undefined ? '' : values.Glucose}
  onChange={(event) => {
    const numericValue = parseInt(event.target.value);
    handleChange({
      target: {
        name: 'Glucose',
        value: numericValue,
      },
    });
  }}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label= "Normal"
    name="Glucose" 
  />
  <FormControlLabel
    value="2"
    control={<Radio />}
    label="Above Normal"
    name="Glucose" 
  />
    <FormControlLabel
    value="3"
    control={<Radio />}
    label= "Well Above Normal"
    name="Glucose" 
  />
    <FormControlLabel
    value="0"
    control={<Radio />}
    label="Don't Know"
    name="Glucose" 
  />
</RadioGroup>
{errors.Glucose && (
  <div style={{ color: 'red' }}>{errors.Glucose}</div>
)}
</div>



<div>
  <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
    Do you smoke?
  </Typography>
  <RadioGroup
    sx={{ ml: 15 }}
    row
    name="Smoking"
    id="Smoking"
    type="radio"
    value={values.Smoking === undefined ? '' : values.Smoking}
    onChange={(event) => {
      const numericValue = parseInt(event.target.value);
      handleChange({
        target: {
          name: 'Smoking',
          value: numericValue,
        },
      });
    }}
  >
    <FormControlLabel
      className="me-5"
      value="1"
      control={<Radio />}
      label={"yes"}
      name="Smoking"
    />
    <FormControlLabel
      value="0"
      control={<Radio />}
      label={"No"}
      name="Smoking"
    />
  </RadioGroup>
  {errors.Smoking && (
    <div style={{ color: 'red' }}>{errors.Smoking}</div>
  )}
</div>



<div>
<Typography variant="h6" component="legend" sx={{mt: 5}}>Do You Drink Alcohol?</Typography>
<RadioGroup
  className="ms-5"
  row
  name="Alcohol"
  id="Alcohol"
  type="radio"
  value={values.Alcohol === undefined ? '' : values.Alcohol}
  onChange={(event) => {
    const numericValue = parseInt(event.target.value);
    handleChange({
      target: {
        name: 'Alcohol',
        value: numericValue,
      },
    });
  }}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label={"Yes"}
    name="Alcohol" 
  />
  <FormControlLabel
    value="0"
    control={<Radio />}
    label={"No"}
    name="Alcohol" 
  />
</RadioGroup>
{errors.Alcohol && (
  <div style={{ color: 'red' }}>{errors.Alcohol}</div>
)}
</div>



<div>
  <Typography variant="h6" component="legend" sx={{ mt: 5 }}>
    Do You Do Any Activities?
  </Typography>
  <RadioGroup
  className="ms-5"
  //  sx={{ width: '100%', mt: 10 , ml:5}}
    row
    name="Activity"
    id="Activity"
    type="radio"
    value={values.Activity === undefined ? '' : values.Activity}
    onChange={(event) => {
      const numericValue = parseInt(event.target.value);
      handleChange({
        target: {
          name: 'Activity',
          value: numericValue,
        },
      });
    }}
  >
    <FormControlLabel
      value="1"
      control={<Radio />}
      label={"Yes"}
      name="Activity"
    />
    <FormControlLabel
      value="0"
      control={<Radio />}
      label={"No"}
      name="Activity"
    />
  </RadioGroup>
  {errors.Activity && (
    <div style={{ color: 'red' }}>{errors.Activity}</div>
  )}
</div>

         </FormSteps>
         </Form>
       )}
     </Formik>
    </CardContent>
  </Card>
    </>
  )
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
    if (fieldValue === undefined || fieldValue === "" ||  childrenArray[step].props.children[1].props.error === true) {
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
          sx={{mt:15 , mr: 5}}
          disabled={props.isSubmitting}
          variant="contained"
          color="secondary"
          onClick={goBack}
        >
          Back
        </Button>
      )}

      {step < childrenArray.length - 1 && (
        <Button
        sx={{mt: 15}}
        disabled={props.isSubmitting}
        variant="contained"
        onClick={goNext}
        >
          Next
        </Button>
      )}

      {step === childrenArray.length - 1 && (
        <Button
          sx={{mt: 15}}
          type="submit"
          disabled={props.isSubmitting}
          variant="contained"
          color="primary"
          data-bs-toggle="modal" 
          data-bs-target="#staticBackdrop"
          // onClick={() => popUp(props.values)}
        >
          Submit
        </Button>
      )}
    </>
  );
};
