import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
let navigate = useNavigate()
  let schema = Yup.object({
    name:Yup.string().required("Name is requiered").min(3,"Minimum 3 characters").max(10,"Maximum 3 characters"),
    email:Yup.string().required("Email is requiered").email("Email Not Valid"),
    password:Yup.string().required("Password is requiered").matches(/^[A-Z][a-z0-9]{3,7}$/),
    confirmPassword:Yup.string().required("Confirm password is requiered").oneOf([Yup.ref('password')], "Not matched password")
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      confirmPassword:''
    },validationSchema:schema,
    onSubmit: sendRegisterValues
  })


  async function sendRegisterValues(values){
    let {data} = await axios.post('http://localhost:3000/users/signup',values)
    if(data){
      navigate('/login')
    }else{
      console.log(data)
    }
  }
  return (

<form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" name='name' className="form-control w-50" 
      value={formik.values.name}
      onChange={formik.handleChange}
    id="exampleInputName1" aria-describedby="nameHelp" />
  </div>
  {formik.errors.name?<p className='alert alert-danger'>{formik.errors.name}</p>: ""}

  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="email" name='email' className="form-control w-50" 
      value={formik.values.email}
      onChange={formik.handleChange}
    id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  {formik.errors.email?<p className='alert alert-danger'>{formik.errors.email}</p>: ""}

  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" name='password' className="form-control w-50" 
      value={formik.values.password}
      onChange={formik.handleChange}
    id="exampleInputPassword1" />
  </div>
  {formik.errors.password?<p className='alert alert-danger'>{formik.errors.password}</p>: ""}
  

  <div className="mb-3">
    <label className="form-label">Confirm Password</label>
    <input type="password" name='confirmPassword' className="form-control w-50" 
      value={formik.values.confirmPassword}
      onChange={formik.handleChange}
    id="exampleInputConfirmPassword1" />
  </div>
  {formik.errors.confirmPassword?<p className='alert alert-danger'>{formik.errors.confirmPassword}</p>: ""}

  <button type="submit" className="btn btn-primary">Register</button>
</form>

    
  )
}
