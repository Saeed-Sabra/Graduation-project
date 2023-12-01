import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../index.css';
import BounceLoader from 'react-spinners/BounceLoader';
import { useTranslation } from 'react-i18next';

export default function History() {

  const { i18n } = useTranslation ();

  const [tests,settests] = useState({
    "date":"Date",
    "result":"Result",
    "checkDetails":"Check Details",
    "detailsButton":"View Details",
    "dateAr":"التاريخ",
    "resultAr":"النتيجة",
    "checkDetailsAr":"التفاصيل",
    "detailsButtonAr":"عرض التفاصيل",

  })
  
  const date = i18n.language === 'ar' ? tests.dateAr : tests.date;
  const result = i18n.language === 'ar' ? tests.resultAr : tests.result;
  const checkDetails = i18n.language === 'ar' ? tests.checkDetailsAr : tests.checkDetails;
  const detailsButton = i18n.language === 'ar' ? tests.detailsButtonAr : tests.detailsButton;



  const [history, setHistory] = useState([]);
  const [selectedHistory, setselectedHistory] = useState({});

  const getDiagnosisResults = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const { data } = await axios.get('http://localhost:3001/users/history', {headers:{Authorization:`Bearer ${token}`}});
        console.log(data[0]);
        // setselectedHistory(data[0]);
      setHistory(data);
    } catch (error) {
      console.error('Error fetching diagnosis results:', error);
    }
  };
  
  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36a6d6");

  useEffect(() => {
    getDiagnosisResults();
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
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Result</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          
                <div className='container text-center'>
                  <div className="row">
                    <div className="col-lg-6">
                    <h5>Age:</h5> 
                  {selectedHistory.Age} 
                    </div>
                    <div className="col-lg-6">
                    <h5>Gender:</h5>
                {selectedHistory.Gender===2? <p>Male</p>
                  : <p>Female</p>}
                      </div>
                <div className="col-lg-6 mt-3">
                  <h5>Hieght:</h5>
                  {selectedHistory.Height}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Weight:</h5>
                  {selectedHistory.Weight}
                </div>

                <div className="col-lg-6 mt-3">
                    <h5>High Blood Pressure:</h5>
                    {selectedHistory.HighBP}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Low Blood Pressure:</h5>
                    {selectedHistory.LowBP}
                </div>

                <div className="col-lg-6 mt-3">
                  <h5>Cholesterol:</h5>
                  {selectedHistory.Cholesterol===0? <p>Don't Know</p>:""}
                  {selectedHistory.Cholesterol===1? <p>Normal</p>:""}
                  {selectedHistory.Cholesterol===1? <p>Above Normal</p>:""}
                  {selectedHistory.Cholesterol===1? <p>Well Above Normal</p>:""}
                </div>

                <div className="col-lg-6 mt-3">
                <h5>Glucose:</h5>
                  {selectedHistory.Glucose===0? <p>Don't Know</p>:""}
                  {selectedHistory.Glucose===1? <p>Normal</p>:""}
                  {selectedHistory.Glucose===1? <p>Above Normal</p>:""}
                  {selectedHistory.Glucose===1? <p>Well Above Normal</p>:""}
                </div>

          <div className="col-lg-6 mt-3">
              <h5>Smoking:</h5>
              {selectedHistory.Smoking===0? <p>No</p>:""}
              {selectedHistory.Smoking===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
          <h5>Alchohol:</h5>
              {selectedHistory.Alcohol===0? <p>No</p>:""}
              {selectedHistory.Alcohol===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
          <h5>Activities:</h5>
              {selectedHistory.Activity===0? <p>No</p>:""}
              {selectedHistory.Activity===1? <p>Yes</p>:""}
          </div>

          <div className="col-lg-6 mt-3">
            <h5 className='text-danger'>Your Result:</h5>
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


    <Card sx={{width:1100, mt:8, boxShadow: 3}} style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
        <CardContent>

    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{date}</th>
          <th scope="col">{result}</th>
          <th scope="col">{checkDetails}</th>
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
              <td><button type="button" className="btn btn-primary" data-bs-toggle="modal"
               data-bs-target="#staticBackdrop" onClick={()=>handleViewDetails(index)}>{detailsButton}</button></td>
              
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
