import { Card, CardContent } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer.jsx';
import BounceLoader from 'react-spinners/BounceLoader.js';
import style from './Profile.module.css'

export default function Profile(props) {
    let [userInfo,setUserInfo] = useState([])
    const token = localStorage.getItem('UserToken')

    
    async function getData() {
        let {data} = await axios.get('http://localhost:3001/users/me', {headers:{Authorization:`Bearer ${token}`}});
        setUserInfo(data);
      }
      
          const [loading,setLoading] = useState(false);
          let [color, setColor] = useState("#36a6d6");
    useEffect( ()=>{
        getData();
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
        },2000)
    }
    ,[] )
  


  return (
      <div className='container-fluid py-5 mt-5 ms-5 d-flex justify-content-center align-items-center'>
         {loading ? (
        <div className='loaderContainer'>
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
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div
              className="card shadow-lg rounded-3"
              style={{ backgroundColor: "#b3ddf2" }}>
              <div className="card-body p-5">
                <div className="row">
                  <div className="col-lg-4 text-center">
                    <img
                      src="assets/nobody.png"
                      className="rounded-circle shadow-sm img-thumbnail mb-3"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <h2 className="h6 text-uppercase mb-2">
                      <strong>{userInfo.name}</strong>
                    </h2>
                  </div>
                  <div className="col-lg-8">
                    <h3 className="mt-3">Information</h3>
                    <hr className="my-4" />
                    <div className="row">
                      <div className="col-lg-6 w-100">
                      <strong>Email:</strong> {userInfo.email}

                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                      <div className="col-lg-6">
                        <p>
                          <strong>Age:</strong> {userInfo.age}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p>
                          <strong>Gender:</strong> {userInfo.gender}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      </div>
  )
}
