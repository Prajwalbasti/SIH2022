import React from 'react'
import Table from '../../Components/Table/Table'
import "./TablePage.scss"
import save from "../../Assets/Save.png"

function TablePage(props) {
  return (
    <div className='table-page'>
        <div className="btn-div">
        <button onClick={() => props.setStep(2)}>BACK</button>
          <button><img src={save} alt="" /></button>
        </div>
        <div className="table">
          
        <Table data={props.data}/>
        </div>
    </div>
  )
}

export default TablePage