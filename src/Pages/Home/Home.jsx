import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Upload from "../../Components/Upload/Upload"
import "./Home.scss"

function Home() {
  return (
    <div className='home'>
        <div className="right">

        <Upload />

        </div>
    </div>
  )
}

export default Home