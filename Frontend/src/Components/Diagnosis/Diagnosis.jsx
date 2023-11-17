import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AppBar, Button, Card, CardContent, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Toolbar, Typography } from "@mui/material";
import { number, object } from "yup";

export default function Diagnosis() {

  return(
    <>
    <AppBar>

    <Toolbar>
      <Typography variant="h6">Diagnosis</Typography>
    </Toolbar>
    </AppBar>

    <Card sx={{width:1200,height:1000, mt: 20, boxShadow: 3}}>
    <CardContent>
      
    <Formik

      validationSchema={object().shape({
        Age: number().required("Age is requiered").positive().integer().min(15,"minimum age must be 15").max(90,"maximum age must be 90"),
        Gender: number().positive().required("Gender is requiered"),
        Height: number().positive().required("Height is requiered"),
        Weight: number().positive().required("Weight is requiered"),
        HighBP: number().positive().required("High blood pressure is requiered"),
        LowBP: number().positive().required("Low blood pressure is requiered"),
        Cholesterol: number().required("Cholesterol is requiered"),
        Glucose: number().required("Glucose is requiered"),
        Smoking: number().required("Smoking is requiered"),
        Alcohol: number().required("Alcohol is requiered"),
        Activity: number().required("Activity is requiered")
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
           <FormLabel>How old are you?</FormLabel>
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
              <FormLabel>Select Gender</FormLabel>
              <RadioGroup
              row
              name="Gender"
              id="Gender"
              type="number"
              value={values.Gender === undefined ? '' : values.Gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={<img src="assets/Male.png" alt="Male" width={100} />}
                name="Gender" 
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={<img src="assets/Female.png" alt="Female" width={100} />}
                name="Gender" 
              />
            </RadioGroup>
            {errors.Gender && (
              <div style={{ color: 'red' }}>{errors.Gender}</div>
            )}
                  </div>

<div>
          <FormLabel sx={{mt: 5}}>Enter your height</FormLabel>
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
           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your weight</FormLabel>
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
           <FormLabel sx={{mt: 5}}>Enter your hight blood pressure</FormLabel>
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

           <FormLabel id="demo-radio-buttons-group-label" sx={{mt: 5}}>Enter your low blood pressure</FormLabel>
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
  <FormLabel>Cholestrol</FormLabel>
  <RadioGroup
  name="Cholesterol"
  id="Cholesterol"
  type="radio"
  value={values.Cholesterol === undefined ? '' : values.Cholesterol}
  onChange={handleChange}
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
</RadioGroup>
{errors.Cholesterol && (
  <div style={{ color: 'red' }}>{errors.Cholesterol}</div>
)}
</div>



<div>
  <FormLabel>Gender</FormLabel>
  <RadioGroup
  name="Glucose"
  id="Glucose"
  type="radio"
  value={values.Glucose === undefined ? '' : values.Glucose}
  onChange={handleChange}
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
</RadioGroup>
{errors.Glucose && (
  <div style={{ color: 'red' }}>{errors.Glucose}</div>
)}
</div>



<div>
  <FormLabel>Smoking?</FormLabel>
  <RadioGroup
  name="Smoking"
  id="Smoking"
  type="radio"
  value={values.Smoking === undefined ? '' : values.Smoking}
  onChange={handleChange}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label={<img src="assets/yes.png" alt="yes" width={100} />}
    name="Smoking" 
  />
  <FormControlLabel
    value="0"
    control={<Radio />}
    label={<img src="assets/no.png" alt="no" width={100} />}
    name="Smoking" 
  />
</RadioGroup>
{errors.Smoking && (
  <div style={{ color: 'red' }}>{errors.Smoking}</div>
)}
</div>


<div>
  <FormLabel>Alcohol?</FormLabel>
  <RadioGroup
  name="Alcohol"
  id="Alcohol"
  type="radio"
  value={values.Alcohol === undefined ? '' : values.Alcohol}
  onChange={handleChange}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label={<img src="assets/yes.png" alt="yes" width={100} />}
    name="Alcohol" 
  />
  <FormControlLabel
    value="0"
    control={<Radio />}
    label={<img src="assets/no.png" alt="no" width={100} />}
    name="Alcohol" 
  />
</RadioGroup>
{errors.Alcohol && (
  <div style={{ color: 'red' }}>{errors.Alcohol}</div>
)}
</div>



<div>
  <FormLabel>Activity?</FormLabel>
  <RadioGroup
  name="Activity"
  id="Activity"
  type="radio"
  value={values.Activity === undefined ? '' : values.Activity}
  onChange={handleChange}
>
  <FormControlLabel
    value="1"
    control={<Radio />}
    label={<img src="assets/yes.png" alt="yes" width={100} />}
    name="Activity" 
  />
  <FormControlLabel
    value="0"
    control={<Radio />}
    label={<img src="assets/no.png" alt="no" width={100} />}
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
  const value = props.values[name];
  // const name = childrenArray[step].props.children[1].props.name;
  const isError = props.errors[name] ? true : false;

  const goBack = () => {
    setStep(step - 1);
  };
  
  const goNext = () => {
    const fieldValue = childrenArray[step].props.children[1].props.value;
    console.log(fieldValue);
    if (fieldValue === undefined || fieldValue === "") {
      props.validateField(name);
      props.setFieldTouched(name, true);
    } else if (!isError) {
      setStep(step + 1);
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
          disabled={props.isSubmitting}
          variant="contained"
          onClick={goNext}
        >
          Next
        </Button>
      )}

      {step === childrenArray.length - 1 && (
        <Button
          type="submit"
          disabled={props.isSubmitting}
          variant="contained"
          color="primary"
          onClick={() => popUp(props.values)}
        >
          Submit
        </Button>
      )}
    </>
  );
};
