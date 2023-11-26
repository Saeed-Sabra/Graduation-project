import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({children}){
    if (localStorage.getItem('UserToken')){
        return <>{children}</>
    }else{
        return <Navigate to='/login'></Navigate>
    }
}
