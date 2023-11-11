import React from 'react'
import style from './instruction.module.css'
import { faWarning } from '../FontAwesomeIcons/FontAwesomeIcons.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Instructions() {
  return (

    <div className={`${style.row} row bg-body-tertiary m-auto shadow-lg p-4 my-5 rounded`}>
        <div className={`col-lg-6 ${style.leftSide} d-flex align-items-center`}>
            <div>
            <h2>Symtomate provides you with a fast and accurate assessment of your symptoms</h2>
            <ul className='mt-3'>
                <li>Enter your details</li>
                <li>Answer some simple questions</li>
                <li>Done! your assessment will reveal your stage of your symptom</li>
            </ul>
            </div>
        </div>

        <div className={`${style.rightSide} col-lg-6 d-flex justify-content-center`}>
            <img src="assets/robot.png" alt="robot" className={style.img} />
        </div>

        <div className='w-50 d-flex alert alert-danger align-items-center'>
        <FontAwesomeIcon icon={faWarning} className='text-danger me-3' />
        <span className='fw-bold'>This test does not replace the need to visit a doctor</span> 
        </div>
    </div>
  )
}

