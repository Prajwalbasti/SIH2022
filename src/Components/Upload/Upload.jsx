import React from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'

function Upload() {
  return (
    <div className='upload'>
        <div className="bg">
            <div className="uploader">
              <div className='upload-drop'>
                <div className="upload-inner">
                  <div className='upload-img'>
                    <img src={logo} alt="logo" />
                  </div>
                  <div className='upload-txt'>Uploading File</div>
                </div>
              </div>
              <div className='upload-loader'>

              </div>
            </div>
        </div>
    </div>
  )
}

export default Upload