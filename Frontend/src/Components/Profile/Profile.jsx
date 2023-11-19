import { Card, CardContent } from '@mui/material';
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
      <div className="container-fluid py-5 ms-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card shadow-lg rounded-3"
              style={{ backgroundColor: "#FFD500" }}>
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
                      <div className="col-lg-6">
                        <p>
                          <strong>Email:</strong> {userInfo.email}
                        </p>
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
      </div>
  )
}
