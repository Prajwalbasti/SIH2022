import React, {useState} from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'

import {useNavigate} from "react-router-dom"

import jQuery from 'jquery'; 


import * as XLSX from 'xlsx/xlsx.mjs';



/* load 'fs' for readFile and writeFile support */
import { read, writeFileXLSX } from "xlsx";

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
set_cptable(cptable);



function Upload({setData}) {
  

  const navigate = useNavigate();


  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  
  const handleUpload = (e) => {
    const file = e.target.files[0]
    


    console.log(file);
    setFileName(file.name);
    // var xl2json = new ExcelToJSON();
    parseExcel(file);
    console.log("abc")
  }



  const ExcelToJSON = function () {

    
  };
  const parseExcel = function (file) {
    
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });

      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], {
          blankrows: false,
        });

        const csvArray = csv.split("\n");
        
        var duplicatesRemovedCsvArray = [...new Set(csvArray)];
        
        console.log(duplicatesRemovedCsvArray);

        const finalCsvString = duplicatesRemovedCsvArray.join("\n");
        console.log(finalCsvString);
        
        setData(duplicatesRemovedCsvArray);
        navigate("/table")
        // convertCsvToExcelBuffer(finalCsvString);
      });

      //logic for JSON

      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        console.log(JSON.parse(json_object));
        jQuery("#xlx_json").val(json_object);

        // console.log(json_object);
        
      });


    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };




  const convertCsvToExcelBuffer = (csvString) => {
    const arrayOfArrayCsv = csvString.split("\n").map((row) => {
      return row.split(",");
    });
    const wb = XLSX.utils.book_new();
    const newWs = XLSX.utils.aoa_to_sheet(arrayOfArrayCsv);
    XLSX.utils.book_append_sheet(wb, newWs);
    XLSX.writeFile(wb, "done.xlsx");
  };
  

  return (
    <div className='upload'>
        <div className="bg">
            <div className="uploader">
              <div className='upload-drop'>
                <div className="upload-inner">
                  <div className='upload-img'>
                    <img src={logo} alt="logo" />
                    <input
  type="file"
  hidden=""
  accept=".xlsx,.xls"
  id="input1"

  onChange={(e) => handleUpload(e)}

/>

                  </div>
                  
                  <div className='upload-txt'>
                    {fileName ? 
                    <p>{fileName}</p> :<p> Upload File</p> }</div>
                </div>
              </div>
              <div className='upload-loader'>

              </div>
            </div>
        </div>
    </div>
  )
}

export default Upload