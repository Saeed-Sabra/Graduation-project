import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import style from './Login.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login(props) {
  let [statusError,setStatusError] = useState('')
  const navigate = useNavigate();

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

  const schema = Yup.object({
    email: Yup.string().required('Email is required').email('Email Not Valid'),
    password: Yup.string().required('Password is required').matches(/^[A-Za-z0-9]{8,20}$/,'Email/Password is incorrect')
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
      } );
      if (data) {
        localStorage.setItem('UserToken', data.token);
        props.info();
        navigate('/');
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Card className={`${style.formSection} shadow my-5 bg-body-tertiary rounded d-flex justify-content-center w-50`}>
      <CardContent>
        <Typography variant="h5" component="div" className="text-center mb-3">
          Sign In
        </Typography>
        <form className={`${style.form}`} onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <Typography variant="body2" color="error" component="p" className="alert alert-danger">
              {formik.errors.email}
            </Typography>
          )}

<div style={{ position: 'relative' }}>
      <TextField
        label="Password"
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
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
