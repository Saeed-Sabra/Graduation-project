import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AppBar, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGrouF, RadioGroup, Slider, TextField, Toolbar, TyFograFhy, Typography } from "@mui/material";
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

      validationSchema={object({
        Age: number().required("Age is requiered").min(15,"minimum age must be 15").max(90,"maximum age must be 90"),
        Gender: number().required("Gender is requiered"),
        Height: number().required("Height is requiered"),
        Weight: number().required("Weight is requiered"),
        HighBF: number().required("High blood pressure is requiered"),
        LowBF: number().required("Low blood pressure is requiered"),
        Cholesterol: number().required("Cholesterol is requiered"),
        Glucose: number().required("Glucose is requiered"),
        Smoking: number().required("Smoking is requiered"),
        Alcohol: number().required("Alcohol is requiered"),
        Activity: number().required("Activity is requiered"),
        

      })}
      
       initialValues={{ 
            Age:" ",
            Gender:" ",
            Height:" ",
            Weight:" ",
            HighBF:" ",
            LowBF:" ",
            Cholesterol:" ",
            Glucose:" ",
            Smoking:" ",
            Alcohol:" ",
            Activity:" "
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
       }) => (
         <Form onSubmit={handleSubmit} autoComplete="off">
          


        <FormLabel component="legend">Select Gender</FormLabel>
        <RadioGroup
        aria-label="gender"
        name="gender"
        value={values.gender}
        onChange={handleChange}
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




        <FormLabel>How old are you?</FormLabel>
            <TextField
                  fullWidth
                  name="Age"
                  type="number"
                  value={values.Age}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: {
                      min: 15,
                      max: 80,
                    },
                  }}
                />
           {errors.Age && touched.Age && errors.Age}

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
          {errors.Gender && touched.Gender && errors.Gender}


          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your height</FormLabel>
          <TextField
                  fullWidth
                  name="Height"
                  type="number"
                  value={values.Height}
                  onChange={handleChange}
                />
           {errors.Height && touched.Height && errors.Height}


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your weight</FormLabel>
            <TextField
                  fullWidth
                  name="Weight"
                  type="number"
                  value={values.Weight}
                  onChange={handleChange}
                />
           {errors.Weight && touched.Weight && errors.Weight}


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your hight blood pressure</FormLabel>
            <TextField
                  fullWidth
                  name="HighBP"
                  type="number"
                  value={values.HighBP}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: {
                      min: 90,
                      max: 190,
                    },
                  }}
                />
           {errors.HighBP && touched.HighBP && errors.HighBP}


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your low blood pressure</FormLabel>
            <TextField
                  name="LowBP"
                  type="number"
                  fullWidth
                  value={values.LowBP}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: {
                      min: 60,
                      max: 130,
                    },
                  }}
                />
           {errors.LowBP && touched.LowBP && errors.LowBP}


          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Your Cholesterol</FormLabel>
           <TextField
              fullWidth
              name="Cholesterol"
              value={values.Cholesterol}
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
              component={Slider}
            /> 
           {errors.Cholesterol && touched.Cholesterol && errors.Cholesterol}


           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Your Glucose</FormLabel>
           <TextField
              name="Glucose"
              value={values.Glucose}
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
              component={Slider}
            /> 
           {errors.Glucose && touched.Glucose && errors.Glucose}
           

           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you smoke</FormLabel>
           <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={values.Gender}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Yes" />
            <FormControlLabel value="male" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.Gender && touched.Gender && errors.Gender}

          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you drink Alcohol</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={values.Gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.Gender && touched.Gender && errors.Gender}


          <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Do you do any activites</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={values.Gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.Gender && touched.Gender && errors.Gender}

           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </CardContent>
  </Card>
    </>
  )

}



// Age:" ",
// Gender:" ",
// Height:" ",
// Weight:" ",
// HighBF:" ",
// LowBF:" ",
// Cholesterol:" ",
// Glucose:" ",
// Smoking:" ",
// Alcohol:" ",
// Activity:" "