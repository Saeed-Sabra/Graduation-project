import React, { useEffect, useState } from 'react'
import '../../index.css'
import BounceLoader from 'react-spinners/BounceLoader';

export default function About() {
  const [loading,setLoading] = useState(false);
  let [color, setColor] = useState("#36a6d6");

  useEffect(() =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2000)
  },[])


  return (
    <div>
    {loading ? (
      <div className='loaderContainer'>
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
    <div className='mt-5'>
    <h1>Welcome to Our Graduation Project Website</h1>
    <p>
      Dedicated to providing valuable information and tools for understanding and monitoring blood pressure.
      Our team of four students has collaborated to create a user-friendly platform to raise awareness about the importance of maintaining healthy blood pressure.
    </p>
    <p>
      Our primary mission is to empower individuals with knowledge about blood pressure and its impact on overall health. We believe that informed individuals are better equipped to make lifestyle choices that contribute to their well-being.
    </p>
    <h2>Interactive Blood Pressure Test</h2>
    <p>
      Our website offers a user-friendly blood pressure test, providing instant results and interpretations. It is a convenient tool for individuals to regularly monitor their blood pressure.
    </p>
    <h2>Healthy Lifestyle Tips</h2>
    <p>
      Discover a wealth of information on lifestyle modifications that can positively impact blood pressure. From dietary recommendations to stress management techniques, we've got you covered.
    </p>
  </div>
    
    </>)}
    </div>
);
};

