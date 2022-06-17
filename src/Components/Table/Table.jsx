import React, { useEffect } from 'react'
import "./Table.scss"

function Table({  data }) {
    // const headers = data[0].split(",")
    var headers = ["Invoice Number", "Customer", "Invoice Date", "Due Date", "Terms", "Location", , "Item Description 1", "Item Description 2", "Service Date", "Taxable", "Item Quantity", "Rate", "Item Amount"]


    return (

        <table className="table">
            <thead>
                <tr>
                    {headers   ? headers.map((data, key) => {
                        return <th scope="col" key={key}><p>{data}</p></th>
                    }) : null}
                </tr>
            </thead>
            <tbody>
                {data && data.length != 0 ? data.map((dat, key) => {
                    
                    return <tr className={key%2 != 0 ? "color" : "non-color"} key={key}>
                         <td><input type="text" defaultValue={dat.InvoiceNo} onChange={(e) => {dat.InvoiceNo= e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Customer} onChange={(e) => {dat.Customer = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.InvoiceDate} onChange={(e) => {dat.InvoiceDate = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.DueDate} onChange={(e) => {dat.DueDate= e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Terms} onChange={(e) => {dat.Terms = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Location} onChange={(e) => {dat.Location = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ItemDescription1} onChange={(e) => {dat.ItemDescription1 = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ItemDescription2} onChange={(e) => {dat.ItemDescription2 = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ServiceDate} onChange={(e) => {dat.ServiceDate = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Taxable} onChange={(e) => {dat.Taxable = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ItemQuantity} onChange={(e) => {dat.ItemQuantity = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Rate} onChange={(e) => {dat.Rate = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.Amount} onChange={(e) => {dat.Amount = e.target.value }} /></td>
                         {/* <td><input type="text" defaultValue={dat.AppointmentDate} onChange={(e) => {dat.AppointmentDate = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.LastName} onChange={(e) => {dat.LastName = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ProviderId} onChange={(e) => {dat.ProviderId = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.ProviderName} onChange={(e) => {dat.ProviderName = e.target.value }} /></td>
                         <td><input type="text" defaultValue={dat.State} onChange={(e) => {dat.State = e.target.value }} /></td> */}
                    </tr>
                    
                    
                }) : null}
            </tbody>
        </table>

    )
}

export default Table