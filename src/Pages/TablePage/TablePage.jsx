import React from 'react'
import Table from '../../Components/Table/Table'
import "./TablePage.scss"
import save from "../../Assets/Save.png"
import { Navigate, useNavigate } from 'react-router-dom'

function TablePage(props) {

  const navigate = useNavigate();

  return (
    <div className='table-page'>
        <div className="btn-div">
        <button onClick={() => navigate('/dashboard/showList')}>BACK</button>
          <button><img src={save} alt="" /></button>
        </div>
        <div className="table">
          
        <Table data={props.data}/>
        </div>
    </div>
  )
}

export default TablePage