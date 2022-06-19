import React, {useState}from 'react'
import "./FileShow.scss"
import Edit from "../../Assets/Edit.png"
import Save from "../../Assets/Download.png"
import Delete from "../../Assets/Delete.png"
import Check from "../../Assets/Check.png"

import {useNavigate} from "react-router-dom"

import jQuery from 'jquery'; 


import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import { read, writeFileXLSX } from "xlsx";
/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
import { useEffect } from 'react'
set_cptable(cptable);



function FileShow({file, setData, setStep, fileName, fileData, setFileName, errorList}) {

  const [selectAll, setSelectAll] = useState(false); 
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [fileDisplay, setFileDisplay] = useState(fileName); 
  const [fileNum, setFileNum] = useState(fileName.length);

  // const navigate = useNavigate();

const changeSelect = () => {
  setSelectAll(prev => !prev);
  
}


const EditFile = (name) => {
  
setData(fileData.get(name));
  
}

const deleteAll = () => {
  setFileDisplay([]);
  setFileNum("0");
}

const downloadAll = () => {

    for(var a of fileName){
      download(fileData.get(a), a);
    }
}


const download = (jsonArray, name) => {
  var worksheet = XLSX.utils.json_to_sheet(jsonArray);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet);
  XLSX.writeFile(wb, `${name}.xlsx`);
};

const DeleteFile = async(name) => {
  var filteredArray = fileDisplay.filter(function(e) { return e !== name })
  setFileDisplay(filteredArray)
  setFileNum(filteredArray.length)
  setFileName(filteredArray)
}



  return (
    <div className='file-show'>
        
       
            <div className="header">
              <div className="back-btn" onClick={() => navigate("/dashboard/upload")}>

            <i class="bi bi-arrow-left-short"></i>
              </div>
            <h6>
              {fileNum ? fileNum : null} Files
            </h6>

<div className="controls-c">
<div className='input-group'>
<div className="box-c">
                <div className="box" onClick={() => setSelectAll(prev => !prev)}>
                {selectAll ? <img src={Check} alt="" srcset="" /> : null}
                </div>
                <p>Select All</p>
                </div>
            </div>
            {
              selectAll ? <div className="controls">
                <div className="box-c">
                <div className="box">
                <img src={Save} alt="save all" onClick={() => downloadAll()} />
                </div>
                <p>Download</p>
                </div>
                <div className="box-c" onClick={() => deleteAll()}>
                <div className="box">
                <img src={Delete} alt="delete all" />
                </div>
                <p>Delete</p>
                </div>
              </div> 
              : null
            }
</div>
              
            </div>
            <div className="body">
                {fileDisplay ? fileDisplay.map((data, key) => {
                  return <div className="file-div">
   <div key ={key}  className={selectAll ? 'details selected' : 'details'} >
                  <p>{data}</p>
                  
                  { errorList && errorList.includes(data) ? 
                    <div className="error-div">
                    <p><i class="bi bi-info-circle"></i> This File needs Attention.</p>
                  </div>: null
                }
                  <div className="icons">
                <img src={Edit} alt="" onClick={() => {EditFile(data); navigate('/dashboard/showTable')}}/>
                <img src={Save} alt="" onClick={() => {download(fileData.get(data), data)}}/>
                <img src={Delete} alt="" onClick={() => {DeleteFile(data);}} />
                  </div>
              </div>
                  </div>
                }): null}
                

            </div>

    </div>
  )
}

export default FileShow