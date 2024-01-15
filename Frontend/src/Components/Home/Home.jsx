import React, { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx'
import Artical from '../Artical/Artical.jsx'
import Instructions from '../Instructions/Instructions.jsx'
import Footer from '../Footer/Footer.jsx'
import BounceLoader from "react-spinners/BounceLoader";
import style from './Home.module.css'
import {Helmet} from "react-helmet";


export default function Home({setUser}) {

  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36a6d6");

  useEffect(() =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2000)
  },[])
  
  return (
    <div className={`${style.wrapper} row`}>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>

      {loading ? (
        <div className={style.loaderContainer}>
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
         
          <Header />
          <Artical />
          <Instructions />
          <Footer />
        </>
      )}
    </div>
  );
}