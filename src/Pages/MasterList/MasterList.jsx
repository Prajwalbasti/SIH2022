import React from 'react'
import Table from '../../Components/Table/Table'
import { db, auth } from "../../firebase/firebase";
import { masterData } from "../../Utils/data.js"
import { useState, useEffect } from "react";
import firebase from "firebase";

import "./MasterList.scss"

const headers = ["Provider Name", "Rate "]


function MasterList() {
    const [info, setInfo] = useState(null);

    const [edit, setEdit] = useState(false);

    const ref = firebase.firestore().collection("Master List")
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(true)
   
    function getData() {
        ref.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setdata(items)
            setloader(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])
   

    return (
        <div className='master-list'>
           
            <div className="button_div">
        {edit ? <button onClick={()=> setEdit(false)}>Save</button> : <button onClick={()=> setEdit(true)}>Edit</button> }
        
        <button >ADD PROVIDER</button>

        </div>
        <table className="table">
            <thead>
                <tr>
                    {headers   ? headers.map((data, key) => {
                        return <th scope="col" key={key}><p>{data}</p></th>
                    }) : null}
                </tr>
            </thead>
            <tbody>

                { loader===false && (data.map((invoices, key) => {
                  return <tr className={key%2 != 0 ? "color" : "non-color"} key={key}>
                  <td>{edit ? <input type="text" defaultValue={invoices["Provider Name"]}/> :  <p>{invoices["Provider Name"]}</p>}</td>
                  <td>{edit ? <input type="text" defaultValue={invoices.Rate}/> : <p>{invoices.Rate}</p> }</td>
             </tr>
           
                        
                    
                }))   
                }

                


            </tbody>
        </table>

        </div>
    );
}

export default MasterList
