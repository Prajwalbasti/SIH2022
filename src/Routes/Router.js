import React from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import TablePage from '../Pages/TablePage/TablePage';
import Upload from '../Components/Upload/Upload';

function Router() {
    return (
        <div>
            <Routes>
                <Route path="table" element={<TablePage />}></Route>
                <Route path="upload" element={<Upload/>}></Route>
            </Routes>
        </div>
    )
}

export default Router