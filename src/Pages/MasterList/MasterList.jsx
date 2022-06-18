import React from 'react'
import Table from '../../Components/Table/Table'

import {masterData} from "../../Utils/data.js"
import "./MasterList.scss"

const headers = ["Provider Name", "Location", "Item Description 2", "Rate"]

function MasterList() {
  return (
    <div className='master-list'>
        <table className="table">
            <thead>
                <tr>
                    {headers   ? headers.map((data, key) => {
                        return <th scope="col" key={key}><p>{data}</p></th>
                    }) : null}
                </tr>
            </thead>
            <tbody>
                {masterData && masterData.length != 0 ? masterData.map((dat, key) => {
                    
                    return <tr className={key%2 != 0 ? "color" : "non-color"} key={key}>
                         <td><input type="text" defaultValue={dat["Provider Name"]}/></td>
                         <td><input type="text" defaultValue={dat.Location}/></td>
                         <td><input type="text" defaultValue={dat.ItemDescription2}/></td>
                         <td><input type="text" defaultValue={dat.Rate}/></td>
                    </tr>
                    
                    
                }) : null}
            </tbody>
        </table>
    </div>
  )
}

export default MasterList