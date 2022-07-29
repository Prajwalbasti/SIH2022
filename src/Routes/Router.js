import React, {useState} from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { Navigate } from 'react-router-dom'


import TablePage from '../Pages/TablePage/TablePage';
import Upload from '../Components/Upload/Upload';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';
import Sidebar from '../Components/Sidebar/Sidebar';
import './Router.scss'
import Protected from '../Protected/Protected';
import NotFound from '../Pages/NotFound/NotFound';
import MasterList from '../Pages/MasterList/MasterList';
import FeatureSoon from '../Pages/FeatureSoon/FeatureSoon';


function Router() {

    

    const [selected, setSelected] = useState("home")
    const location = useLocation();

    
    return (
        <div className='Router'>

            {console.log(location)}
            
            {location && (location.pathname == "/dashboard/upload" || location.pathname == "/dashboard/showList" || location.pathname == "/dashboard/showTable" || location.pathname ==  "/master-list" || location.pathname ==  "/profile" || location.pathname ==  "/setting"  )  ?
            <div className="sidebarWrapper">
                 <Sidebar selected={selected} setSelected={setSelected} />
            </div>
             :  null}

            <div className="pageWrapper">
                <Routes>
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="dashboard/:id" element={<Protected cmp={Home} />}></Route>
                    <Route path="master-list" element={<Protected cmp={MasterList} />}></Route>
                    <Route path="profile" element={<Protected cmp={FeatureSoon} />}></Route>
                    <Route path="setting" element={<Protected cmp={FeatureSoon} />}></Route>

                    <Route path="/" element={<Navigate replace to="dashboard/upload" />} ></Route>
                    <Route path="*" element={<NotFound />} ></Route>

                
                </Routes>
            </div>
        </div>
    )
}

export default Router