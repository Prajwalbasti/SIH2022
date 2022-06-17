import React, {useState} from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import TablePage from '../Pages/TablePage/TablePage';
import Upload from '../Components/Upload/Upload';
import UploadedFiles from '../Pages/UploadedFiles/UploadedFiles';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';
import Sidebar from '../Components/Sidebar/Sidebar';
import './Router.scss'


function Router() {

    

    const [selected, setSelected] = useState("home")
    const location = useLocation();

    console.log(location);

    return (
        <div className='Router'>

            {location && location.pathname !== "/"  ?
            <div className="sidebarWrapper">
                 <Sidebar selected={selected} setSelected={setSelected} />
            </div>
             :  null}

            <div className="pageWrapper">
                <Routes>
                    {/* <Route path="table" element={<TablePage data={data} />}></Route> */}
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="uploaded" element={<UploadedFiles />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="/dashboard/:id" element={<Home />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Router