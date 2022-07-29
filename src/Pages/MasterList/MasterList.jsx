// import React from 'react'
// import Table from '../../Components/Table/Table'
// import { db, auth } from "../../firebase/firebase";
// import { masterData } from "../../Utils/data.js"
// import { useState, useEffect } from "react";
// import firebase from "firebase";
// import {v4 as uuidv4} from "uuid";
// import "./MasterList.scss"

// import Modal from 'react-modal';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         borderRadius: '16px',
//         boxShadow: '-16px -16px 40px rgba(253, 255, 255, 0.8), 16px 16px 40px rgba(187, 195, 206, 0.6)',
//         padding: '0px',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };

// const headers = ["Provider Name", "Rate "]


// function MasterList() {
//     const [info, setInfo] = useState(null);

//     const [edit, setEdit] = useState(false);

//     const ref = firebase.firestore().collection("Master List")

//     const [data, setdata] = useState([])

//     const [provName,setProvName] = useState('')
//     const [provRate,setProvRate] = useState('')

//     const [loader, setloader] = useState(true)

//     function getData() {
//         ref.onSnapshot((querySnapshot) => {
//             const items = []
//             querySnapshot.forEach((doc) => {
//                 items.push(doc.data())
//             })
//             setdata(items)
//             setloader(false)
//         })
//     }

//     useEffect(() => {
//         getData()
//     }, [])

//     let subtitle;
//     const [modalIsOpen, setIsOpen] = React.useState(false);

//     function openModal() {
//         setIsOpen(true);
//     }

//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         subtitle.style.color = '#f00';
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     function editdoc(updatedDoc)
//     {
       
//         ref.doc(updatedDoc.id)
//         .update(updatedDoc)
//         .catch((err) =>{
//             alert(err)
//             console.log(err)
//         })
//     }

//     function addNewProvider(newDataObj){
//         if(!provName){
//             alert("Name is required")
//             return;
//         }
//         if(!provRate){
//             alert("Rate is required")
//             return;
//         }
       
//         const obj = new Object()
//         obj["Provider Name"] = provName
//         obj["Rate"] = parseInt(provRate)
//         data.push(obj)

//         ref.doc()
//         .set(obj)
//         .catch((err) =>{
//             alert(err)
//             console.log(err)
//         })

//         setProvName('')
//         setProvRate()
//         closeModal();
//     }


//     return (
//         <div className='master-list'>

//             <Modal
//                 isOpen={modalIsOpen}
//                 onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Example Modal"
//             >
//                 <div className="master-modal">
//                     <div className="master-modal-header">
//                         <div>Add New Provider</div>
//                         <div onClick={() => { closeModal() }} style={{cursor:'pointer'}}>x</div>
//                     </div>
//                     <div className="master-modal-body">
//                         <input type="text" placeholder='Enter Provider Name' onChange={(e)=>{setProvName(e.target.value)}}/>
//                         <input type="number" placeholder='Enter Rate' onChange={(e)=>{setProvRate(e.target.value)}}/>
//                         <button type="submit" onClick={()=>{addNewProvider(provName,provRate)}}>Save</button>
//                     </div>
//                 </div>
//             </Modal>

//             <div className="button_div">
//                 {edit?null:<button onClick={openModal} className='button-div-add'>ADD PROVIDER</button>}

//                 {edit ? <button style={{alignSelf: 'flex-end'}} onClick={() =>{ 
//                     editdoc({provName,provRate}) 
//                     setEdit(false)}}>
//                     <i class="bi bi-clipboard-check-fill"></i>
//                     </button> 
                
                
//                 : <button onClick={() => setEdit(true)}><i class="bi bi-pencil-square"></i></button>}

//             </div>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         {headers ? headers.map((data, key) => {
//                             return <th scope="col" key={key}><p>{data}</p></th>
//                         }) : null}
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {loader === false && (data.map((invoices, key) => {
//                         return <tr className={key % 2 != 0 ? "color" : "non-color"} key={key}>
//                             <td>{edit ? <input type="text" defaultValue={invoices["Provider Name"]} onChange={(e) =>setProvName(e.target.value)} /> : <p>{invoices["Provider Name"]}</p>}</td>
//                             <td>{edit ? <input type="text" defaultValue={invoices.Rate} onChange={(e) =>setProvRate(e.target.value)} /> : <p>{invoices.Rate}</p>}</td>
//                         </tr>



//                     }))
//                     }




//                 </tbody>
//             </table>

//         </div>
//     );
// }

// export default MasterList


import React from 'react'
import Table from '../../Components/Table/Table'
import { db, auth } from "../../firebase/firebase";
import { masterData } from "../../Utils/data.js"
import { useState, useEffect } from "react";
import firebase from "firebase";
import {v4 as uuidv4} from "uuid";
import "./MasterList.scss"

import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        borderRadius: '16px',
        boxShadow: '-16px -16px 40px rgba(253, 255, 255, 0.8), 16px 16px 40px rgba(187, 195, 206, 0.6)',
        padding: '0px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const headers = ["Date", " Start Time ", " Terminal Time"]


function MasterList() {
    const [info, setInfo] = useState(null);

    const [edit, setEdit] = useState(false);

    const ref = firebase.firestore().collection("Master")

    const [data, setdata] = useState([])

    const [provName,setProvName] = useState('')
    const [provRate,setProvRate] = useState('')
    const [provName1,setProvName1] = useState('')
    const [provRate1,setProvRate1] = useState('')
    const [id,setid] =useState('');

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

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    function addNewProvider(newDataObj){
        if(!provName){
            alert("Name is required")
            return;
        }
        if(!provRate){
            alert("Rate is required")
            return;
        }
       
        const obj = new Object()
        obj["Provider Name"] = provName
        obj["Rate"] = parseInt(provRate)
        data.push(obj)

        ref.doc()
        .set(obj)
        .catch((err) =>{
            alert(err)
            console.log(err)
        })

        setProvName('')
        setProvRate()
        closeModal();
    }

    const updateList = (updatedDoc) =>{
        // data[key][value] = e.target.value
        // console.log(data[key][value]);
          console.log(updatedDoc["Provider Name"])   
        ref.doc(updatedDoc.id)
        .update(updatedDoc)
        .catch((err) =>{
            alert(err)
            console.log(err)
        })


    }


    return (
        <div className='master-list'>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="master-modal">
                    <div className="master-modal-header">
                        <div>Add New Provider</div>
                        <div onClick={() => { closeModal() }} style={{cursor:'pointer'}}>x</div>
                    </div>
                    <div className="master-modal-body">
                        <input type="text" placeholder='Enter Provider Name' onChange={(e)=>{setProvName(e.target.value)}}/>
                        <input type="number" placeholder='Enter Rate' onChange={(e)=>{setProvRate(e.target.value)}}/>
                        <button type="submit" onClick={()=>{addNewProvider(provName,provRate)}}>Save</button>
                    </div>
                </div>
            </Modal>

            <div className="button_div">
                {edit?null:<button onClick={openModal} className='button-div-add'>ADD PROVIDER</button>}

                {edit ? <button style={{alignSelf: 'flex-end'}} 
                onClick={() => {
                setEdit(false)
                updateList({"Provider Name" : provName1,"Rate":provRate1,"id":id})
                }}
                >
                    <i class="bi bi-clipboard-check-fill"></i></button> 
                : <button onClick={() => setEdit(true)}><i class="bi bi-pencil-square"></i></button>}

            </div>
            <table className="table">
                <thead>
                    <tr>
                        {headers ? headers.map((data, key) => {
                            return <th scope="col" key={key}><p>{data}</p></th>
                        }) : null}
                    </tr>
                </thead>
                <tbody> 

                    {loader === false && (data.map((invoices, index) => {
                        return <tr className={index % 2 != 0 ? "color" : "non-color"} key={index}>
                            {/* <td>{edit ? <input type="text" defaultValue={invoices["Provider Name"]} onChange={(e)=>{updateList(e,index,"Provider Name")}}/> : <p>{invoices["Provider Name"]}</p>}</td>
                            <td>{edit ? <input type="number" defaultValue={invoices["Rate"]} onChange={(e)=>{updateList(e,index,"Rate")}}/> : <p>{invoices.Rate}</p>}</td>
                         */}
                          <td>{edit ? <input type="text" defaultValue={invoices["Provider Name"]} onChange={(e)=>setProvName1(e.target.value) }/> : <p>{invoices["Provider Name"]}</p>}</td>
                            <td>{edit ? <input type="number" defaultValue={invoices["Rate"]} onChange={(e)=>setProvRate1(e.target.value)  }/> : <p>{invoices.Rate}</p>}</td>
                        

                        </tr>



                    }))
                    }




                </tbody>
            </table>

        </div>
    );
}

export default MasterList