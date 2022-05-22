import React from 'react'
import { RouteData } from "./Routes.config"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import TablePage from '../Pages/TablePage/TablePage';

function Router() {
    return (
        <div>
            <Routes>
                <Route path="table" element={<TablePage />}></Route>
            </Routes>
        </div>
    )
}

export default Router