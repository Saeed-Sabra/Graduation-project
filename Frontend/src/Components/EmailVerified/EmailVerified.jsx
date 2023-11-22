import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function EmailVerified() {
    let { token } = useParams();

    const [verificationStatus, setVerificationStatus] = useState(null);

    const emailVerified = async () => {
        try {
          let { data } = await axios.get(`http://localhost:3001/users/confirmEmail/${token}`);
          setVerificationStatus(data);
        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationStatus('error'); 
        }
      };

    useEffect( ()=>{
        emailVerified();
    },[] )
    
  return (
    <div>
    <p>URL token: {token}</p>
    {verificationStatus === 'success' && <p>Email successfully verified!</p>}
    {verificationStatus === 'error' && <p>There was an error verifying the email.</p>}
  </div>  )
}


 