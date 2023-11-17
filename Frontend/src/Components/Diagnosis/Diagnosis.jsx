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

    <Card sx={{width:1100,height:500, mt: 20, boxShadow: 3}}>
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
          <Typography variant="h6" sx={{mt: 5}} component="legend">How old are you?</Typography>
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
        <Typography variant="h6" component="legend" sx={{ mb: 5 }}>Select Your Gender</Typography>
        <RadioGroup
        sx={{ width: '150%', mt: 10 }}
        row
        name="Gender"
        id="Gender"
        value={values.Gender === undefined ? '' : String(values.Gender)}
        onChange={(event) => {
          // Convert the string value to a number
          const numericValue = parseInt(event.target.value, 10);
          // Set the numeric value in the state
          handleChange({
            target: {
              name: 'Gender',
              value: numericValue,
            },
          });
        }}
      >
    <FormControlLabel
      value={1}
      control={<Radio />}
      label={<img src="assets/Male.png" alt="Male" width={200} />}
      name="Gender"
    />
    <FormControlLabel
      value={2}
      control={<Radio />}
      label={<img src="assets/Female.png" alt="Female" width={200} />}
      name="Gender"
    />
  </RadioGroup>
  {errors.Gender && (
    <div style={{ color: 'red' }}>{errors.Gender}</div>
  )}
</div>


<div>

      <Typography variant="h6" component="legend" sx={{mt: 5}}>Enter your height</Typography>
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
            <Typography variant="h6" component="legend" sx={{mt: 5}}>Enter your weight</Typography>
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

            <Typography variant="h6" component="legend" sx={{mt: 5}}>Enter your hight blood pressure</Typography>
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
                    <Typography variant="h6" component="legend" sx={{mt: 5}}>Enter your low blood pressure</Typography>
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
<Typography variant="h6" component="legend" sx={{mt: 5}}>Cholestrol</Typography>
  <RadioGroup
  name="Cholesterol"
  id="Cholesterol"
  type="radio"
  value={values.Cholesterol === undefined ? '' : values.Cholesterol}
  onChange={(event) => {
    // Convert the string value to a number
    const numericValue = parseInt(event.target.value, 10);
    // Set the numeric value in the state
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
</RadioGroup>
{errors.Cholesterol && (
  <div style={{ color: 'red' }}>{errors.Cholesterol}</div>
)}
</div>



<div>
<Typography variant="h6" component="legend" sx={{mt: 5}}>Glucose</Typography>
  <RadioGroup
  name="Glucose"
  id="Glucose"
  type="radio"
  value={values.Glucose === undefined ? '' : values.Glucose}
  onChange={(event) => {
    // Convert the string value to a number
    const numericValue = parseInt(event.target.value, 10);
    // Set the numeric value in the state
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
</RadioGroup>
{errors.Glucose && (
  <div style={{ color: 'red' }}>{errors.Glucose}</div>
)}
</div>



<div>
<Typography variant="h6" component="legend" sx={{mt: 5}}>Do you smoke?</Typography>
  <RadioGroup
  row
  name="Smoking"
  id="Smoking"
  type="radio"
  value={values.Smoking === undefined ? '' : values.Smoking}
  onChange={(event) => {
    // Convert the string value to a number
    const numericValue = parseInt(event.target.value, 10);
    // Set the numeric value in the state
    handleChange({
      target: {
        name: 'Smoking',
        value: numericValue,
      },
    });
  }}
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
<Typography variant="h6" component="legend" sx={{mt: 5}}>Do you drink alcohol?</Typography>
  <RadioGroup
  row
  name="Alcohol"
  id="Alcohol"
  type="radio"
  value={values.Alcohol === undefined ? '' : values.Alcohol}
  onChange={(event) => {
    // Convert the string value to a number
    const numericValue = parseInt(event.target.value, 10);
    // Set the numeric value in the state
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
<Typography variant="h6" component="legend" sx={{mt: 5}}>Do you do any activities?</Typography>
  <RadioGroup
  row
  name="Activity"
  id="Activity"
  type="radio"
  value={values.Activity === undefined ? '' : values.Activity}
  onChange={(event) => {
    // Convert the string value to a number
    const numericValue = parseInt(event.target.value, 10);
    // Set the numeric value in the state
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
          sx={{mt: 10 , mr: 5}}
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
        sx={{mt: 10}}
        disabled={props.isSubmitting}
        variant="contained"
        onClick={goNext}
        >
          Next
        </Button>
      )}

      {step === childrenArray.length - 1 && (
        <Button
          sx={{mt: 10}}
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
