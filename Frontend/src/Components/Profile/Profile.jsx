import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profile(props) {
    let [userInfo,setUserInfo] = useState([])
    const token = localStorage.getItem('UserToken')

    
    async function getData() {
        let {data} = await axios.get('http://localhost:3000//users/me', {headers:{Authorization:`Bearer ${token}`}});
        console.log(data);
    }
    useEffect( ()=>{
        getData()
    }
    ,[] )
  return (
    <>test</>
  )
}
