import { AppBar, Card, CardContent, Toolbar, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';

export default function AdminHistory() {
    let {id} = useParams();
    const token = localStorage.getItem('UserToken');

    const [history, setHistory] = useState([]);

    const getUserHistory = async () =>{
        const {data} = await axios.get(`http://localhost:3001/admins/users/tests/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        console.log(data)
        setHistory(data)
    }
  
    const [loading,setLoading] = useState(false);
    let [color, setColor] = useState("#36a6d6");
  
    useEffect(() => {
        getUserHistory();
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
      },2000)
    }, []);
  
  
    return (
      <>

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
          <div>
            <AppBar>
              <Toolbar>
                <Typography variant='h6' noWrap>Admin Panel - Users</Typography>
                <div className='ms-auto d-flex'>
                  <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/admin'>Dashboard</Link></Typography>
                  <Typography><Link className='text-white me-3 link-underline link-underline-opacity-0' to='/'>Home</Link></Typography>
                </div>
              </Toolbar>
            </AppBar>



 <h2 style={{ marginTop: '150px', marginBottom: '20px' }}>
  {history[0]?.user?.name}'s History
</h2>

    <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Result</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {history.map( (result)=>
                  <div className='container text-center'>
                    <div className="row">
                      <div className="col-lg-6">
                      <h5>Age:</h5> 
                    {result.Age} 
                      </div>
                      <div className="col-lg-6">
                      <h5>Gender:</h5>
                  {result.Gender===2? <p>Male</p>
                    : <p>Female</p>}
                        </div>
                  <div className="col-lg-6 mt-3">
                    <h5>Hieght:</h5>
                    {result.Height}
                  </div>
  
                  <div className="col-lg-6 mt-3">
                  <h5>Weight:</h5>
                    {result.Weight}
                  </div>
  
                  <div className="col-lg-6 mt-3">
                      <h5>High Blood Pressure:</h5>
                      {result.HighBP}
                  </div>
  
                  <div className="col-lg-6 mt-3">
                  <h5>Low Blood Pressure:</h5>
                      {result.LowBP}
                  </div>
  
                  <div className="col-lg-6 mt-3">
                    <h5>Cholesterol:</h5>
                    {result.Cholesterol===0? <p>Don't Know</p>:""}
                    {result.Cholesterol===1? <p>Normal</p>:""}
                    {result.Cholesterol===1? <p>Above Normal</p>:""}
                    {result.Cholesterol===1? <p>Well Above Normal</p>:""}
                  </div>
  
                  <div className="col-lg-6 mt-3">
                  <h5>Glucose:</h5>
                    {result.Glucose===0? <p>Don't Know</p>:""}
                    {result.Glucose===1? <p>Normal</p>:""}
                    {result.Glucose===1? <p>Above Normal</p>:""}
                    {result.Glucose===1? <p>Well Above Normal</p>:""}
                  </div>
  
            <div className="col-lg-6 mt-3">
                <h5>Smoking:</h5>
                {result.Smoking===0? <p>No</p>:""}
                {result.Smoking===1? <p>Yes</p>:""}
            </div>
  
            <div className="col-lg-6 mt-3">
            <h5>Alchohol:</h5>
                {result.Alcohol===0? <p>No</p>:""}
                {result.Alcohol===1? <p>Yes</p>:""}
            </div>
  
            <div className="col-lg-6 mt-3">
            <h5>Activities:</h5>
                {result.Activity===0? <p>No</p>:""}
                {result.Activity===1? <p>Yes</p>:""}
            </div>
  
            <div className="col-lg-6 mt-3">
              <h5 className='text-danger'>Result:</h5>
              {result.Result}
            </div>
                    </div>
                  </div>
              
             )}
          </div>
          <div className="modal-footer m-auto">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
      <Card sx={{ width: 1100, boxShadow: 3 }}>
          <CardContent>
  
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Result</th>
            <th scope="col">Check Details</th>
          </tr>
        </thead>
        <tbody>
          {history.map((result, index) => {
            const createdAt = new Date(result.createdAt).toISOString();
            const datePart = createdAt.split('T')[0];
  
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{datePart}</td>
                <td>{result.Result}</td>
                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</button></td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
          </CardContent>
      </Card>
      </>
    )}
      </div>
      </>
    );
}

