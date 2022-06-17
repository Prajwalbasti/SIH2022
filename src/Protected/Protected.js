import React from 'react'
import { Navigate } from 'react-router-dom'


function Protected(props) {
    const Cmp = props.cmp;
   var auth = localStorage.getItem("npg_auth");

    var redirect = "/login?redirect="+window.location.pathname;
    
    return (
        <div>
            {auth  ? <Cmp  /> : <Navigate replace to={redirect} />}
        </div>
    )
}

export default Protected