import React, {useState}from 'react'
import "./FileShow.scss"
import Edit from "../../Assets/Edit.png"
import Save from "../../Assets/Save.png"
import Delete from "../../Assets/Delete.png"

import {useNavigate} from "react-router-dom"

import jQuery from 'jquery'; 


import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import { read, writeFileXLSX } from "xlsx";

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
set_cptable(cptable);



function FileShow({file, setData}) {

  const [selectAll, setSelectAll] = useState(false); 
  const navigate = useNavigate();
  
  

const changeSelect = () => {
  setSelectAll(prev => !prev);
}

const EditFile = (file) => {
  
    // var xl2json = new ExcelToJSON();
    parseExcel(file);
  
}


const SaveFile = (file) => {
  

}


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
    <div className='file-show'>
        
            <div className="header">
            <h6>
              Uploaded {Array.from(file).length} Files
            </h6>

            <div className='input-group'>
            <input type="checkbox" name="select-all" id="select-all" onChange={() => changeSelect()} />
            
            <label htmlFor='select-all'>Select All</label>
            </div>
            </div>
            <div className="body">
                {file ? Array.from(file).map((data, key) => {
                  return <div  className={selectAll ? 'details selected' : 'details'}>
                  <p>{data.name}</p>
                  <div className="icons">
                <img src={Edit} alt="" onClick={() => EditFile(data)}/>
                <img src={Save} alt="" />
                <img src={Delete} alt="" />
                  </div>
              </div>
                }): null}
                

            </div>

    </div>
  )
}

export default FileShow