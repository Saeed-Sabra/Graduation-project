import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import style from './Login.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import {Helmet} from "react-helmet";

export default function Login(props) {
  const { i18n } = useTranslation ();

  //**************** Translation ****************
  const [login,setLogin] = useState({
    //form
    "title":"Sign In",
    "email":"Email",
    "password":"Password",
    "button":"Login",
    "titleAr":"تسجيل دخول",
    "emailAr":"البريد الالكتروني",
    "passwordAr":"كلمة المرور",
    "buttonAr":"تسجيل دخول",
    //sweetalert
    "emailErr":"Email is required",
    "passwordErr":"Password is required",
    "emailErrAr":" يرجى ادخال البريد الالكتروني",
    "passwordErrAr":" يرجى ادخال كلمة المرور",
  })
  //form
  const title = i18n.language === 'ar' ? login.titleAr : login.title;
  const email = i18n.language === 'ar' ? login.emailAr : login.email;
  const password = i18n.language === 'ar' ? login.passwordAr : login.password;
  const button = i18n.language === 'ar' ? login.buttonAr : login.button;
//sweetalert
const emailErr = i18n.language === 'ar' ? login.emailErrAr : login.emailErr;
const passwordErr = i18n.language === 'ar' ? login.passwordErrAr : login.passwordErr;


  let [statusError,setStatusError] = useState('')
  const navigate = useNavigate();


  // **************** Veiw password ****************
  let [type, setType] = useState('password');
  let [icon, setIcon] = useState(faEye);


  const togglePassword = () => {
    if (type === 'password') {
      setType('text');
      setIcon(faEyeSlash);
    } else {
      setType('password');
      setIcon(faEye);
    }
  };

  //**************** Validation ****************
  const schema = Yup.object({
    email: Yup.string().required(emailErr).email('Email Not Valid'),
    password: Yup.string().required(passwordErr).matches(/^[A-Za-z0-9]{8,20}$/,'Email/Password is incorrect')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: sendLoginValues,
  });

  async function sendLoginValues(values) {
    try {
      const { data } = await axios.post('http://localhost:3001/users/login', values)
      .catch((err)=>{
        setStatusError(err.response.data.error);
        console.log(data)
      } );
      if (data) {
        localStorage.setItem('UserToken', data.token);
        console.log(data)
        props.info();
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      // const checkEmail = ()=>{
      //   Swal.fire({
      //     title: "Please Verify Your Email",
      //     icon: "warning",
      //   })
      // }
      // checkEmail()
    }
  }

  return (
    <>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Login Page</title>
            </Helmet>
    <Card className={`${style.formSection} shadow my-5 bg-body-tertiary rounded d-flex justify-content-center w-50`}>
      <CardContent>
        <Typography variant="h5" component="div" className="text-center mb-3">
          {title}
        </Typography>
        <form className={`${style.form}`} onSubmit={formik.handleSubmit}>
          <TextField
            
            label={email}
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
          />
          {formik.errors.email && (
            <Typography variant="body2" color="error" component="p" className="alert alert-danger">
              {formik.errors.email}
            </Typography>
          )}

<div style={{ position: 'relative' }}>
      <TextField
        label={password}
        type={type}
        name="password"
        fullWidth
        variant="outlined"
        margin="dense"
        value={formik.values.password}
        onChange={formik.handleChange}

      />
      <FontAwesomeIcon
        icon={icon}
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
          {formik.errors.password && (
            <Typography variant="body2" color="error" component="p" className="alert alert-danger">
              {formik.errors.password}
            </Typography>
          )}
          <p className='text-danger'>{statusError}</p>
          <div className="text-center">
            <Button type="submit" variant="contained" color="primary" className='mt-3'>
              {button}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </>
  );
}
