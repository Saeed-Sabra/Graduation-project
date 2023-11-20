import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function EmailVerified() {

    let{token} = useParams()
    const emailVerified = async() => {
        let {data} = await axios.get(`http://localhost:3001/users/confirmEmail/${token}`)

    }

  return (
    <div>URL token ${token}</div>
  )
}


 