import { AppBar, Card, CardContent, Toolbar, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';

export default function AdminHistory() {
    let {id} = useParams();
    const token = localStorage.getItem('UserToken');
    const [selectedHistory, setselectedHistory] = useState({});

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
  
    const handleViewDetails = (index) => {
      setselectedHistory(history[index]);
    };
    
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

<div className="modal fade mt-5" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header me-auto">
          <h1 className="modal-title fs-5 me-auto" id="staticBackdropLabel">Result</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          
                <div className='container text-center'>
                  <div className="row">
                    <div className="col-lg-6">
                    <h5>Age</h5> 
                  {selectedHistory.Age} 
                    </div>
                    <div className="col-lg-6">
                    <h5>Gender</h5>
                {selectedHistory.Gender===2? <p>Male</p>
                  : <p>Male</p>}
                      </div>
                <div className="col-lg-6 mt-3">
                  <h5>Height</h5>
                  {selectedHistory.Height}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Weight</h5>
                  {selectedHistory.Weight}
                </div>

                <div className="col-lg-6 mt-3">
                    <h5>High Blood Pressure</h5>
                    {selectedHistory.HighBP}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Low Blood Pressure</h5>
                    {selectedHistory.LowBP}
                </div>

                <div className="col-lg-6 mt-3">
                  <h5>Cholesterol</h5>
                  {selectedHistory.Cholesterol===0? <p>DontKnow</p>:""}
                  {selectedHistory.Cholesterol===1? <p>Normal</p>:""}
                  {selectedHistory.Cholesterol===2? <p>AboveNormal</p>:""}
                  {selectedHistory.Cholesterol===3? <p>WellAboveNormal</p>:""}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Glucose</h5>
                  {selectedHistory.Glucose===0? <p>DontKnow</p>:""}
                  {selectedHistory.Glucose===1? <p>Normal</p>:""}
                  {selectedHistory.Glucose===2? <p>AboveNormal</p>:""}
                  {selectedHistory.Glucose===3? <p>WellAboveNormal</p>:""}
                </div>

          <div className="col-lg-6 mt-3">
              <h5>Smoking</h5>
              {selectedHistory.Smoking===0? <p>No</p>:""}
              {selectedHistory.Smoking===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
          <h5>Alcohol</h5>
              {selectedHistory.Alcohol===0? <p>No</p>:""}
              {selectedHistory.Alcohol===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
          <h5>Activity</h5>
              {selectedHistory.Activity===0? <p>No</p>:""}
              {selectedHistory.Activity===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
            <h5 className='text-danger'>Result</h5>
            {selectedHistory.Result}
          </div>
                  </div>
                </div>

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
            <th scope="col">Time</th>
            <th scope="col">Result</th>
            <th scope="col">Check Details</th>
          </tr>
        </thead>
        <tbody>
        {history.map((result, index) => {
  const createdAt = new Date(result.createdAt).toISOString();
  const datePart = createdAt.split('T')[0];
  let timePart = createdAt.split('T')[1];

  timePart = timePart.slice(0, -5);
  
            return (
              <tr key={index}>
      <td>{index + 1}</td>
      <td>{datePart}</td>
      <td>{timePart}</td>
      <td>{result.Result}</td>
      <td> <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => handleViewDetails(index)}
        >
          View Details
        </button></td>
                

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

