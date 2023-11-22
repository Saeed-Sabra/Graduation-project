import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='text-center mt-4'>
        <img src={require('./Notfound.png')} alt="notFound" width={500} />
        <h2>Page Not Found</h2>
        <Link className='btn btn-primary' to='/'>Home</Link>
    </div>
  )
}
