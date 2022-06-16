import React from 'react'
import "./Sidebar.scss"
import list from "../../Assets/list.png"
import profile from "../../Assets/profile.png"
import setting from "../../Assets/setting.png"
import logout from "../../Assets/logout.png"
import {useNavigate} from "react-router-dom"


const items = [
    { name: 'home', label: 'Home', img: list, href:"/" },
    { name: 'list', label: 'Master Rate list', img: list, href:"/master-list" },
    { name: 'profile', label: 'Profile', img: profile,href:"/profile" },
    { name: 'setting', label: 'Settings', img: setting, href:"/setting" }]
    


function Sidebar({selected, setSelected}) {
    
    const navigate = useNavigate();

    return (
    <div className='sidebar'>
        <div className="logo">
            <div className="round">
            </div>
        </div>
        <div className="menu">
            <ul>
                {items.map((data, key) => {
                    return <li key={key} className={selected == data.name ? "active" : "non-active"} onClick={() => {
                        navigate(data.href);
                        setSelected(data.name)
                        }} >
                        
                <img src={data.img} alt={data.name} />
                <p>{data.label}</p>
                
                    </li>
                })}
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