import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Diagnosis() {

  let {id} = useParams();


  // async function prediction(){
  //   const {data} = await axios.post("http://localhost:3001/users/prediction")
  //   console.log(data)
  // }
  // useEffect( ()=>{
  //   prediction()

  // },[]) 


  return (
    <>
  <p>this is my id {id}</p>
    {/* <h2>Choose your gender</h2>
    <div className="row">
      <div className="col-lg-6">
        <img src="assets/Male.png" alt="Male" className='w-25'/>
        <h3>Male</h3>
      </div>

      <div className="col-lg-6">
        <img src="assets/Female.png" alt="Female" className='w-25'/>
        <h3>Female</h3>
      </div>
    </div> */}
    </>
  )
}
