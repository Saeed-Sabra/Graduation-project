import React, { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx'
import Artical from '../Artical/Artical.jsx'
import Instructions from '../Instructions/Instructions.jsx'
import Footer from '../Footer/Footer.jsx'
import BounceLoader from "react-spinners/BounceLoader";

export default function Home({user}) {
  
  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36d7b7");

  useEffect(() =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },3000)
  },[])
  return (
    
    <div className='row'>
      {loading?
            <BounceLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="BounceLoader"
            data-testid="loader"
          />:<>
    <Header />
    <Artical/>
    <Instructions />
    <Footer/>
          </>
        }

    </div>
  )
}
