import React from 'react'
import "./Sidebar.scss"
import list from "../../Assets/list.svg"
import profile from "../../Assets/profile.png"
import setting from "../../Assets/setting.png"
import logout from "../../Assets/logout.png"
import Home from "../../Assets/Home.svg"
import {useNavigate, useLocation} from "react-router-dom"
import logo from './../../Assets/logoMini.svg'
import { useEffect } from 'react'
// import {GrHomeRounded} from 'react-icons/gr'
// import {IoListSharp} from 'react-icons/io'


const items = [
    { name: 'home', label: 'Home',component:<i className="bi bi-house-door"></i>, img: Home, href:"/dashboard/upload" },
    { name: 'list', label: 'Master Rate list',component:<i className="bi bi-list-task"></i>, img: list, href:"/master-list" },
    { name: 'profile', label: 'Profile',component:<i className="bi bi-person"></i>, img: profile,href:"/profile" },
    { name: 'setting', label: 'Settings',component:<i className="bi bi-gear"></i>, img: setting, href:"/setting" }]
    


function Sidebar({selected, setSelected}) {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        switch(location.pathname){
            case "/dashboard/upload": 
                setSelected("home");
                break;
            case "/master-list": 
                setSelected("list");
                break;
            case "/profile": 
                setSelected("profile");
                break;
            case "setting":
                setSelected("setting");
                break;
        }
    }, [])

    return (
    <div className='sidebar'>
        <div className="logo">
            <div className="round">
                <img src={logo} alt="" />
            </div>
        </div>
        <div className="menu">
            <ul>
                {items.map((data, key) => {
                    return <li key={key} className={selected == data.name ? "active" : "non-active"} onClick={() => {
                        navigate(data.href);
                        setSelected(data.name)
                        }} >
                        
                        {data.component}
                        <p>{data.label}</p>
                
                    </li>
                })}
            </ul>
        </div>
        <div className="footer">
            <div className="logout" onClick={() => {localStorage.clear(); window.location.reload(false)}}>
                <img src={logout} alt="logout" />
                <p>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar