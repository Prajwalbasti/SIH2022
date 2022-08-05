import React from 'react'
import "./FeatureSoon.scss"
import logoLarge from './../../Assets/drdo_logo.png'
import logo from './../../Assets/drdo.svg'

function FeatureSoon() {
  return (
    <div className='feature-soon'>
      <div className='logoMain'>
       <img src={logo} alt="" />
      </div>

      <h6>Feature Coming Soon 🛠</h6>
    </div>
  )
}

export default FeatureSoon