import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AppBar, Button, Card, CardContent, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { number, object } from "yup";

export default function Diagnosis() {

  return(
    <>
    <AppBar>

    <Toolbar>
      <Typography variant="h6">Diagnosis</Typography>
    </Toolbar>
    </AppBar>

    <Card sx={{width:1200,height:1500, mt: 20, boxShadow: 3}}>
    <CardContent>
    <Formik

      validationSchema={object().shape({
        Age: number().required("Age is requiered").positive().integer().min(15,"minimum age must be 15").max(90,"maximum age must be 90"),
        Gender: number().positive().required("Gender is requiered"),
        Height: number().positive().required("Height is requiered"),
        Weight: number().positive().required("Weight is requiered"),
        HighBF: number().positive().required("High blood pressure is requiered"),
        LowBF: number().positive().required("Low blood pressure is requiered"),
        Cholesterol: number().required("Cholesterol is requiered"),
        Glucose: number().required("Glucose is requiered"),
        Smoking: number().required("Smoking is requiered"),
        Alcohol: number().required("Alcohol is requiered"),
        Activity: number().required("Activity is requiered")
      })}
      
       initialValues={{ 
            Age:"",
            Gender:"",
            Height:"",
            Weight:"",
            HighBP:"",
            LowBP:"",
            Cholesterol:"",
            Glucose:"",
            Smoking:"",
            Alcohol:"",
            Activity:""
        }}
 
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
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
         validateField
       }) => (

         
         <Form onSubmit={handleSubmit} autoComplete="off">

           <FormSteps isSubmitting={isSubmitting} validateField={validateField}>
        <div>
        <FormLabel>How old are you?</FormLabel>
            <TextField
                  fullWidth
                  name="Age"
                  id="Age"
                  type="number"
                  value={values.Age}
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
                  <FormLabel component="legend">Select Gender</FormLabel>
                <RadioGroup
                type="radio"
                name="Gender"
                id="Gender"
                value={values.Gender}
                onChange={handleChange}
                onBlur={handleBlur}
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={<img src="assets/male.png" alt="Female" width={100}/>}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={<img src="assets/Female.png" alt="Male" width={100}/>}
                />
              </RadioGroup>
        </div>



{/* 
          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5, mr:4}}>Choose your gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={values.Gender}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          {errors.Gender && touched.Gender && errors.Gender} */}


<div>
          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your height</FormLabel>
          <TextField
                  fullWidth
                  name="Height"
                  id="Height"
                  type="number"
                  value={values.Height}
                  onChange={handleChange}
                  placeholder="Your Height"
                  error={errors.Height? true: false}
                  helperText={errors.Height && errors.Height}
                />


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your weight</FormLabel>
            <TextField
                  fullWidth
                  name="Weight"
                  id="Weight"
                  type="number"
                  value={values.Weight}
                  onChange={handleChange}
                  placeholder="Your Weight"
                  error={errors.Weight? true: false}
                  helperText={errors.Weight && errors.Weight}
                />
  {/* {errors.Weight?<p className='text-danger'>{errors.Weight}</p>: ""} */}
</div>


<div>
           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your hight blood pressure</FormLabel>
            <TextField
                  fullWidth
                  name="HighBP"
                  id="HighBP"
                  type="number"
                  value={values.HighBP}
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


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your low blood pressure</FormLabel>
            <TextField
                  fullWidth
                  name="LowBP"
                  id="LowBP"
                  type="number"
                  value={values.LowBP}
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

          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Your Cholesterol</FormLabel>
           <TextField
              fullWidth
              name="Cholesterol"
              id="Cholesterol"
              value={values.Cholesterol}
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
              component={Slider}
              error={errors.LowBP? true: false}
              helperText={errors.LowBP && errors.LowBP}
            /> 
           {/* {errors.Cholesterol && touched.Cholesterol && errors.Cholesterol} */}


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Your Glucose</FormLabel>
           <TextField
              name="Glucose"
              id="Glucose"
              value={values.Glucose}
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
              component={Slider}
            /> 
           {/* {errors.Glucose && touched.Glucose && errors.Glucose} */}
           

           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you smoke</FormLabel>
           <RadioGroup
            row
            type="radio"
            name="Smoking"
            id="Smoking"
            value={values.Smoking}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Yes" />
            <FormControlLabel value="male" control={<Radio />} label="No" />
          </RadioGroup>
          {/* {errors.Gender && touched.Gender && errors.Gender} */}

          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you drink Alcohol</FormLabel>
          <RadioGroup
            row
            type="radio"
            name="Alcohol"
            id="Alcohol"
            value={values.Alcohol}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {/* {errors.Gender && touched.Gender && errors.Gender} */}


          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you do any activites</FormLabel>
          <RadioGroup
            row
            type="radio"
            name="Activity"
            id="Activity"
            value={values.Activity}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {/* {errors.Activity && touched.Activity && errors.Activity} */}
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


const FormSteps = (props)=>{

  const childrenArray = React.Children.toArray(props.children)
  const [step,setStep] = useState(0)

  const goBack = ()=>{
    setStep(step-1)
  }
  const goNext = ()=>{
    props.validateField("Age")
    setStep(step+1)
  }
  return(
    <>
    {childrenArray[step]}

{step>0 && (
    <Button 
    disabled={props.isSubmitting}
    variant="contained"
    color="secondary"
    onClick={goBack}>
             Back
           </Button>
)}

{step < childrenArray.length-1 &&(
           <Button 
    disabled={props.isSubmitting}
    variant="contained"
    onClick={goNext}>
             Next
           </Button>
)}
    <Button
    type="submit" 
    disabled={props.isSubmitting}
    variant="contained"
    color="primary"
    >
             Submit
           </Button>
    </>
  )
  
}