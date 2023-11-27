import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminPanel() {

  // let {id} = useParams();
  let [user,setUser] = useState([]);
  const token = localStorage.getItem('UserToken');

  const getUsers = async ()=>{
    const {data} = await axios.get('http://localhost:3001/admins/users', {headers:{Authorization:`Bearer ${token}`}})
    console.log(data);
    setUser(data);
  }

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/admins/users/delete/${userId}`, {headers:{Authorization:`Bearer ${token}`}});
      console.log(data);
      if(data){
        const ensurenceMessage = ()=>{
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
            });
        }
        ensurenceMessage();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  useEffect( ()=>{
    getUsers();
  },[] )

  return (
    <div className='container'>

<AppBar>
    <Toolbar>
      <Typography variant='h6' noWrap>Admin Panel - Users</Typography>
      <div className='ms-auto d-flex'>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/admin'>Dashboard</Link></Typography>
      <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/'>Home</Link></Typography>
      </div>
    </Toolbar>
  </AppBar>

      <div className='row mt-5'>
        <div className="col-lg-12 mt-5">
    <Link className='btn btn-success mt-5' to='addUser'>Add User</Link>
        </div>
      </div>
    <Card sx={{mt:3, width:1300, boxShadow: 3}}>
      <CardContent>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="row">#</th>
          <th scope="row">Name</th>
          <th scope="row">Email</th>
          <th scope="row">Gender</th>
          <th scope="row">Age</th>
          <th scope="row">Update</th>
          <th scope="row">Delete</th>
        </tr>
      </thead>
      <tbody>
        {user.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td><Link className='btn btn-primary' to={`updateUser/${user._id}`}>Update</Link></td>
              <td><button className='btn btn-danger' onClick={()=>deleteUser(user._id)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
      </CardContent>
    </Card>
    </div>
  );
  
}

