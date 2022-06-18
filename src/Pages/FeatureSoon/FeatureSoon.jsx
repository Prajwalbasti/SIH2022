import React from 'react'
import "./FeatureSoon.scss"
import logoLarge from './../../Assets/logoLarge.svg'

function FeatureSoon() {
  return (
    <div className='feature-soon'>
        <div className='logoMain'>
          <img src={logoLarge} alt="" />
        </div>

        <h6>Feature Coming Soon 🛠</h6>
    </div>
  )
}

export default FeatureSoon