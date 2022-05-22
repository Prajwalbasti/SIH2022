import React from 'react'
import Table from '../../Components/Table/Table'
import {headers, data} from "../../Data/TableData.js"
import "./TablePage.scss"

function TablePage() {
  return (
    <div className='table-page'>
        <div className="table">
        <Table headers={headers} data={data}/>
        </div>
    </div>
  )
}

export default TablePage