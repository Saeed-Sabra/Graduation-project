import React, { useEffect, useState } from 'react';
import { AppBar, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import BounceLoader from 'react-spinners/BounceLoader';
import {Helmet} from "react-helmet";

export default function UpdateUser() {

  let [user, setUser] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem('UserToken')

  let [statusError, setStatusError] = useState('');
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
    name: Yup.string().min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
    email: Yup.string().email('Email Not Valid')
      .test('is-com', 'Email must end with ".com"', (value) => {
        if (value && !value.endsWith('.com')) {
          return false;
        }
        return true;
      }),
    gender: Yup.string(),
    isAdmin: Yup.boolean(),
    age: Yup.number().positive().min(15),
    password: Yup.string().matches(/^[A-Za-z0-9]{8,20}$/, 'Not Valid Password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Not matched password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      isAdmin: '',
      age: '',
    },
    validationSchema: schema,
    onSubmit: updateUser,
  });


  const getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/admins/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(data){
        console.log(data);
        setUser(data);
        formik.setValues({
          name: data.name,
          email: data.email,
          gender: data.gender,
          isAdmin: data.isAdmin,
          age: data.age,
        });
      }else {
        console.error('User data not available');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  async function updateUser(values) {
    try {
      const { data } = await axios.put(`http://localhost:3001/admins/users/update/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .catch((err) => {
          setStatusError(err.response.data);
        });
        console.log(data);
      if (data) {
        const addedsuccessfully = () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Updated successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        };
        addedsuccessfully();

        navigate('/admin');
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusError(error.response?.data?.message || 'An error occurred');

    }
  }

  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36a6d6");

  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2000)
  }, []);

    return (
      <>
 <Helmet>
                <meta charSet="utf-8" />
                <title>Update User</title>
            </Helmet>
  
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
           <AppBar>
    <Toolbar>
      <Typography variant='h6' noWrap>Admin Panel - Users</Typography>
      <div className='ms-auto d-flex'>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/admin'>Dashboard</Link></Typography>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/'>Home</Link></Typography>
      </div>
    </Toolbar>
  </AppBar>
        <Card sx={{width:600,height:500, mt: 17, boxShadow: 3, textAlign:"center", display:"flex", justifyContent:"center"}}>
          <CardContent>
          <Typography variant="h5" component="div" className="text-center mb-3">
              Update User Info
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
    
    <FormControl className='mt-2' fullWidth>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-label1"
        id="demo-simple-select1"
        label="Role"
        name="isAdmin"
        variant="outlined"
        margin="dense"
        value={formik.values.isAdmin}
        onChange={formik.handleChange}
        error={formik.touched.isAdmin && Boolean(formik.errors.isAdmin)}
        helperText={formik.touched.isAdmin && formik.errors.isAdmin}
      >
        <MenuItem value={true}>Admin</MenuItem>
        <MenuItem value={false}>User</MenuItem>
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
            
          <Button type="submit" variant="contained" color="primary" sx={{mt:3}}>
            Update
          </Button>
        </form>
          </CardContent>
        </Card>   
      </>
    )}
      </div>
 
      </>
      );
}

