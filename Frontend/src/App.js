import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import About from './Components/About/About.jsx'
import  { jwtDecode } from "jwt-decode";
import Diagnosis from './Components/Diagnosis/Diagnosis.jsx'
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter.jsx'
import Profile from './Components/Profile/Profile.jsx';
import History from './Components/History/History.jsx';


export default function App() {


  let [user,setUser] = useState(null)

  function saveCurrentUser (){
    const token = localStorage.getItem('UserToken');
    const decoded = jwtDecode(token)
    setUser(decoded);
  }

  useEffect( ()=>{
    if(localStorage.getItem('UserToken'))
    saveCurrentUser();
  },[] )



  const routers = createBrowserRouter([
    {path:"/", element:<Layout user={user} setUser={setUser}/>,children:[
      {index:true, element:<Home />},
      {path:"register", element:<Register/>},
      {path:"login",element:<Login info={saveCurrentUser}/>},
      {path:"diagnosis", element:<ProtectedRouter><Diagnosis/></ProtectedRouter>},
      {path:"profile",element:<ProtectedRouter><Profile info={saveCurrentUser}/></ProtectedRouter>},
      {path:"*",element:<NotFound/>},
      {path:"about",element:<About/>},
      {path:"history",element:<History/>},
    ]}
  ])
  return (
<RouterProvider router={routers}></RouterProvider>
  )
}

// useEffect(() =>{
//   setLoading(true);
//   setTimeout(()=>{
//     setLoading(false);
//   },8000)
// },[])