import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profile(props) {
    let [userInfo,setUserInfo] = useState([])
    const token = localStorage.getItem('UserToken')

    
    async function getData() {
        let {data} = await axios.get('http://localhost:3001/users/me', {headers:{Authorization:`Bearer ${token}`}});
        setUserInfo(data);
    }
    useEffect( ()=>{
        getData();
    }
    ,[] )
  return (
 <div className='row text-center mt-5'>
  <div className="col-lg-12">
      <img src="assets/profilePic.png" alt="profilePic" className='w-25 mb-3' />
  </div>
      <h2>Name:</h2>
      <h4>{userInfo.name}</h4>
      <h2>Email</h2>
      <h4>{userInfo.email}</h4>
 </div>
  )
}
