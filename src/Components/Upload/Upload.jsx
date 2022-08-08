import React, { useState , useEffect } from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'
import TablePage from '../../Pages/TablePage/TablePage';
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {masterData} from "../../Utils/data.js"
import stringSimilarity from "string-similarity"
import Model from '../../Components/Model/Model'
set_cptable(cptable);


function Upload() {


  const [file, setFile] = useState();
  const [fileName, setFileName] = useState([]);

  const [step, setStep] = useState(1);

  const [uploaded, setUploaded] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [data, setData] = useState([])


  const navigate = useNavigate();

  const location = useLocation();



  return (
      <div className='upload'>

      {location.pathname==='/dashboard/upload' ? 
        <div className="bg">
          <div className= {uploaded ? "uploader active" : "uploader" }>
           
          
          </div>
          <Model></Model>
        </div>
        : null
      }


      {location.pathname==='/dashboard/showList' ? <div className="uploaded">
        {fileName.length == 0 ? <Navigate replace to="/dashboard/upload" /> : null}
      </div> : null}

      {location.pathname==='/dashboard/showTable' ? <>
      {data.length == 0 ? <Navigate replace to="/dashboard/upload" /> : null}
      <TablePage data={data} setStep={setStep} />
      </> :  null}

    </div>
  )
}

export default Upload