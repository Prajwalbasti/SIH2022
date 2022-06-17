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
import UploadedFiles from '../Pages/UploadedFiles/UploadedFiles';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';
import Sidebar from '../Components/Sidebar/Sidebar';
import './Router.scss'
import Protected from '../Protected/Protected';
import NotFound from '../Pages/NotFound/NotFound';


function Router() {

    

    const [selected, setSelected] = useState("home")
    const location = useLocation();

    
    return (
        <div className='Router'>

            {console.log(location)}
            
            {location && (location.pathname == "/dashboard/upload" || location.pathname == "/dashboard/showList" || location.pathname == "/dashboard/showTable" || location.pathname ==  "/master-list"  )  ?
            <div className="sidebarWrapper">
                 <Sidebar selected={selected} setSelected={setSelected} />
            </div>
             :  null}

            <div className="pageWrapper">
                <Routes>
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="uploaded" element={<UploadedFiles />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="dashboard/:id" element={<Protected cmp={Home} />}></Route>
                    <Route path="/" element={<Navigate replace to="dashboard/upload" />} ></Route>
                    <Route path="*" element={<NotFound />} ></Route>

                
                </Routes>
            </div>
        </div>
    )
}

export default Router