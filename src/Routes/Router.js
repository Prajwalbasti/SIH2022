import React, {useState} from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import TablePage from '../Pages/TablePage/TablePage';
import Upload from '../Components/Upload/Upload';
import UploadedFiles from '../Pages/UploadedFiles/UploadedFiles';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';

function Router() {

    const [data, setData] = useState([])

    return (
        <div>
            <Routes>
                <Route path="table" element={<TablePage data={data} />}></Route>
                <Route path="upload" element={<Upload setData={setData}/>}></Route>
                <Route path="uploaded" element={<UploadedFiles />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default Router