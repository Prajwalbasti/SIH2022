import React, {useState} from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import TablePage from '../Pages/TablePage/TablePage';
import Upload from '../Components/Upload/Upload';

function Router() {

    const [data, setData] = useState([])

    return (
        <div>
            <Routes>
                <Route path="table" element={<TablePage data={data} />}></Route>
                <Route path="upload" element={<Upload setData={setData}/>}></Route>
            </Routes>
        </div>
    )
}

export default Router