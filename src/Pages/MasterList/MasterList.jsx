import React from 'react'
import Table from '../../Components/Table/Table'
import { db, auth } from "../../firebase/firebase";
import {masterData} from "../../Utils/data.js"
import { useState, useEffect } from "react";
import firebase from "firebase";

import "./MasterList.scss"

const headers = ["Provider Name", "Location ",  "Item Description ", "Item Amount"]
 

function MasterList() {
    const [info, setInfo] = useState(null);
   
    const doc =  db
           .collection("Master Rate List")     
           .doc("q4AOA8x0RrQBdYQbvmCH")  
           .get().then((doc) => {
                
               setInfo(doc.data());
               
               
               for (const key in doc.data()) {
                console.log(key);
                for(const value in doc.data()[key]){
                    console.log(`${value}`);
                    for (const i in doc.data()[key][value])
                    {
                        console.log(`${i} : ${doc.data()[key][value][i]}`)
                    }
                   
                }
            }
           
              }
              
              );
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
