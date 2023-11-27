import React, { useState } from 'react';
import { AppBar, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

export default function AddUser() {
  let [statusError,setStatusError] = useState('')
  const navigate = useNavigate();

  let [passwordType, setPasswordType] = useState('password');
  let [passwordIcon, setPasswordIcon] = useState(faEye);

  let [confirmPasswordType, setConfirmPasswordType] = useState('password');
  let [confirmPasswordIcon, setConfirmPasswordIcon] = useState(faEye);

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
    

  const schema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
    email: Yup.string().required('Email is required').email('Email Not Valid') 
    .test('is-com', 'Email must end with ".com"', (value) => {
      if (value && !value.endsWith('.com')) {
        return false;
      }
      return true;
    }),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().positive().min(15).required('Age is required'),
    password: Yup.string().required('Password is required').matches(/^[A-Za-z0-9]{8,20}$/,'Not Valid Password'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Not matched password'),
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
    onSubmit: sendUserData,
  });

  async function sendUserData(values) {
    try {
      const { data } = await axios.post('http://localhost:3001/users/signup', values)
      .catch((err)=>{
        setStatusError(err.response.data);
      } );
      if (data) {
        const addedsuccessfully = () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User added successfully!",
                showConfirmButton: false,
                timer: 1500
              });
        };
        addedsuccessfully();
  
        navigate('/admin')
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

    return (
      <>
      <AppBar>
    <Toolbar>
      <Typography variant='h6' noWrap>Admin Panel - Users</Typography>
      <div className='ms-auto d-flex'>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/admin'>Dashboard</Link></Typography>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/'>Home</Link></Typography>
      </div>
    </Toolbar>
  </AppBar>
  
        <Card sx={{width:600,height:570, mt: 17, boxShadow: 3, textAlign:"center", display:"flex", justifyContent:"center"}}>
          <CardContent>
          <Typography variant="h5" component="div" className="text-center mb-3">
              Add User
            </Typography>
     <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
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
            label="Email"
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
        label="Gender"
        name="gender"
        variant="outlined"
        margin="dense"
        value={formik.values.gender}
        onChange={formik.handleChange}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
      >
        <MenuItem value={"Male"}>Male</MenuItem>
        <MenuItem value={"Female"}>Female</MenuItem>
      </Select>
    </FormControl>
    
          <TextField
            label="Age"
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
            label="Password"
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
        label="Confirm Password"  
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
            Add
          </Button>
        </form>
          </CardContent>
        </Card>   
      </>
      );
}
