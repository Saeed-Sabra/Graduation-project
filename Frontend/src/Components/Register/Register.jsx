import React, { useState } from 'react';
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
import {Helmet} from "react-helmet";

export default function Register() {

  const { i18n } = useTranslation ();

  const [signup,setSignup] = useState({
    //Form
    "title":"Register",
    "name":"Full Name",
    "email":"Email",
    "gender":"Gender",
    "male":"Male",
    "female":"Female",
    "age":"Age",
    "password":"Password",
    "cPassword":"Confirm Password",
    "button":"Signup",
    "titleAr":"انشاء حساب",
    "nameAr":"الاسم الكامل",
    "emailAr":"البريد الالكتروني",
    "genderAr":"الجنس",
    "maleAr":"ذكر",
    "femaleAr":"انثى",
    "ageAr":"العمر",
    "passwordAr":"كلمة المرور",
    "cPasswordAr":"تأكيد كلمة المرور",
    "buttonAr":"انشاء الحساب",

    //Error Messages
    "nameErr":"Name is required",
    "emailErr":"Email is required",
    "genderErr":"Gender",

    "ageErr":"Age is required",
    "passwordErr":"Password is required",
    "cPasswordErr":"Confirm Password is required",
    "nameErrAr":"يرجى ادخال الاسم الكامل",
    "emailErrAr":" يرجى ادخال البريد الالكتروني",
    "genderErrAr":" يرجى ادخال الجنس",
    "ageErrAr":" يرجى ادخال العمر",
    "passwordErrAr":" يرجى ادخال كلمة المرور",
    "cPasswordErrAr":" يرجى تأكيد كلمة المرور",

    //sweetAlert
    "welcoming":"Welcome!",
    "thanking":"Thank you for signing up! We just need to verify your email address to complete setting up your account.",
    "ok":"Okay!",
    "welcomingAr":"مرحبا بك!",
    "thankingAr":"شكرا لك على التسجيل! نحتاج فقط إلى التحقق من عنوان بريدك الإلكتروني لإكمال إعداد حسابك",
    "okAr":"حسنا!",
  })
  
  //Form
  const title = i18n.language === 'ar' ? signup.titleAr : signup.title;
  const name = i18n.language === 'ar' ? signup.nameAr : signup.name;
  const email = i18n.language === 'ar' ? signup.emailAr : signup.email;
  const gender = i18n.language === 'ar' ? signup.genderAr : signup.gender;
  const male = i18n.language === 'ar' ? signup.maleAr : signup.male;
  const female = i18n.language === 'ar' ? signup.femaleAr : signup.female;
  const age = i18n.language === 'ar' ? signup.ageAr : signup.age;
  const password = i18n.language === 'ar' ? signup.passwordAr : signup.password;
  const cPassword = i18n.language === 'ar' ? signup.cPasswordAr : signup.cPassword;
  const button = i18n.language === 'ar' ? signup.buttonAr : signup.button;

//error messages
  const nameErr = i18n.language === 'ar' ? signup.nameErrAr : signup.nameErr;
  const emailErr = i18n.language === 'ar' ? signup.emailErrAr : signup.emailErr;
  const genderErr = i18n.language === 'ar' ? signup.genderErrAr : signup.genderErr;
  const ageErr = i18n.language === 'ar' ? signup.ageErrAr : signup.ageErr;
  const passwordErr = i18n.language === 'ar' ? signup.passwordErrAr : signup.passwordErr;
  const cPasswordErr = i18n.language === 'ar' ? signup.cPasswordErrAr : signup.cPasswordErr;

  //sweetAlert
  const welcoming = i18n.language === 'ar' ? signup.welcomingAr : signup.welcoming;
  const thanking = i18n.language === 'ar' ? signup.thankingAr : signup.thanking;
  const ok = i18n.language === 'ar' ? signup.okAr : signup.ok;

  let [statusError,setStatusError] = useState('')
  const navigate = useNavigate();

  let [passwordType, setPasswordType] = useState('password');
  let [passwordIcon, setPasswordIcon] = useState(faEye);

  let [confirmPasswordType, setConfirmPasswordType] = useState('password');
  let [confirmPasswordIcon, setConfirmPasswordIcon] = useState(faEye);


  //************ view password ************
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordIcon(faEyeSlash);
    } else {
      setPasswordType('password');
      setPasswordIcon(faEye);
    }
  };

  const toggleConfirmPassword = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text');
      setConfirmPasswordIcon(faEyeSlash);
    } else {
      setConfirmPasswordType('password');
      setConfirmPasswordIcon(faEye);
    }
  };
    
//**************** Validation ****************
  const schema = Yup.object({
    name: Yup.string().required(nameErr).min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
    email: Yup.string().required(emailErr).email('Email Not Valid') 
    .test('is-com', 'Email must end with ".com"', (value) => {
      if (value && !value.endsWith('.com')) {
        return false;
      }
      return true;
    }),
    gender: Yup.string().required(genderErr),
    age: Yup.number().positive().min(15).required(ageErr),
    password: Yup.string().required(passwordErr).matches(/^[A-Za-z0-9]{8,20}$/,'Not Valid Password'),
    confirmPassword: Yup.string().required(cPasswordErr).oneOf([Yup.ref('password')], 'Not matched password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender:'',
      age:'',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: sendRegisterValues,
  });

  async function sendRegisterValues(values) {
    try {
      const { data } = await axios.post('http://localhost:3001/users/signup', values)
      .catch((err)=>{
        setStatusError(err.response.data);
      } );
      if (data) {
        const verifyEmail = () => {
          Swal.fire({
            title: welcoming,
            text: thanking,
            confirmButtonColor: "#3085d6",
            confirmButtonText: ok,
          });
        };
  
        verifyEmail();
  
        navigate('/login');
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
            </Helmet>
            <Card sx={{width:600,height:570, mt: 12, boxShadow: 3, textAlign:"center", display:"flex", justifyContent:"center"}}>
              <CardContent>
              <Typography variant="h5" component="div" className="text-center mb-3">
                  {title}
                </Typography>
         <form onSubmit={formik.handleSubmit}>
              <TextField
                label={name}
                type="text"
                name="name"
                fullWidth
                variant="outlined"
                margin="dense"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
        
              <TextField
                label={email}
                type="email"
                name="email"
                fullWidth
                variant="outlined"
                margin="dense"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
        
        
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={gender}
            name="gender"
            variant="outlined"
            margin="dense"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value={"Male"}>{male}</MenuItem>
            <MenuItem value={"Female"}>{female}</MenuItem>
          </Select>
        </FormControl>
        
              <TextField
                label={age}
                type="number"
                name="age"
                fullWidth
                variant="outlined"
                margin="dense"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
        
        <div style={{ position: 'relative' }}>
              <TextField
                label={password}
                type={passwordType}
                name="password"
                fullWidth
                variant="outlined"
                margin="dense"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <FontAwesomeIcon
                icon={passwordIcon}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                  onClick={togglePassword}
              />
            </div>
        
            <div style={{ position: 'relative' }}>
          <TextField
            label={cPassword} 
            type={confirmPasswordType}
            name="confirmPassword"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <FontAwesomeIcon
            icon={confirmPasswordIcon}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={toggleConfirmPassword}
          />
        </div>
        
                  <p className='text-danger'>{statusError}</p>
        
              <Button type="submit" variant="contained" color="primary" sx={{mt:3}}>
                {button}
              </Button>
            </form>
              </CardContent>
            </Card>   
    </>
);
}
 