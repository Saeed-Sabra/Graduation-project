import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function EmailVerified() {
    let { token } = useParams();

    const [verificationStatus, setVerificationStatus] = useState(null);

    const emailVerified = async () => {
        try {
          let { data } = await axios.get(`http://localhost:3001/users/confirmEmail/${token}`, {headers:{Authorization:`Bearer ${token}`}});
          setVerificationStatus(data);
          console.log(data);
        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationStatus('error'); 
        }
      };

      useEffect(() => {
        console.log('Token:', token);
        emailVerified();
      }, [token]);
      
    
  return (
    <div>
    <p>URL token: {token}</p>
    {verificationStatus === 'success' && <p>Email successfully verified!</p>}
    {verificationStatus === 'error' && <p>There was an error verifying the email.</p>}
  </div> 
   )
}


 