import React from 'react'
import "./Sidebar.scss"
import list from "../../Assets/list.png"
import profile from "../../Assets/profile.png"
import setting from "../../Assets/setting.png"
import logout from "../../Assets/logout.png"



function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="logo">
            <div className="round">
            </div>
        </div>
        <div className="menu">
            <ul>
                <li>
                    <img src={list} alt="master list" />
                    <p>Master Rate List</p>
                </li>
                <li className='active'>
                    <img src={profile} alt="master list"  />
                    <p>Profile</p>
                </li>
                <li>
                    <img src={setting} alt="master list" />
                    <p>Setting</p>
                </li>
            </ul>
        </div>
        <div className="footer">
            <div className="logout">
                <img src={logout} alt="logout" />
                <p>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar