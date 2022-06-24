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
   
    const [edit, setEdit] = useState(false);

    const doc = () => { db
           .collection("Master Rate List")     
           .doc("q4AOA8x0RrQBdYQbvmCH")  
           .get().then((doc) => { 
               setInfo(doc.data());
               
               const data = [];

               for (const key in doc.data()) {
                console.log(key);
                for(const value in doc.data()[key]){
                    console.log(`${value}`);
                    data.push(doc.data()[key][value]);
                    // for (const i in doc.data()[key][value])
                    // {
                    //     data1.push(doc.data()[key][value][i])                        
                    //     // console.log(`${i} : ${doc.data()[key][value][i]}`)
                    //
                }
            }
        setInfo(data);
        });
            }

    useEffect(() => {
                doc()
            }, [])


  return (
    <div className='master-list'>
        
        <div className="button_div">
        {edit ? <button >Save</button> : <button onClick={()=> setEdit(true)}>Edit</button> }
        
        <button>ADD PROVIDER</button>

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

                { masterData && masterData.length != 0 ? masterData.map((dat, key) => {
                  return <tr className={key%2 != 0 ? "color" : "non-color"} key={key}>
                  <td>{edit ? <input type="text" defaultValue={dat["Provider Name"]}/> :  <p>{dat["Provider Name"]}</p>}</td>
                 
                <td>{edit ? <input type="text" defaultValue={dat.ItemDescription2}/> : <p>{dat.ItemDescription2}</p>}</td>
                  <td>{edit ? <input type="text" defaultValue={dat.Rate}/> : <p>{dat.Rate}</p> }</td>
             </tr>
           
                        
                    
                }) : null  }

                


            </tbody>
        </table>
    </div>
  )
}

export default MasterList
