import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Upload from "../../Components/Upload/Upload"
import "./Home.scss"
import logoLarge from './../../Assets/logoLarge.svg'

function Home() {
  return (
    <div className='home'>
        <div className="right">

        <div className='logoMain'>
         
        </div>
        <Upload />

        </div>
    </div>
  )
}

export default Home