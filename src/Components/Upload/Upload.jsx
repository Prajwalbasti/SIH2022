import React, { useState , useEffect } from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'
import FileShow from '../FileShow/FileShow';
import TablePage from '../../Pages/TablePage/TablePage';



import jQuery from 'jquery'; 
import * as XLSX from 'xlsx/xlsx.mjs';
/* load 'fs' for readFile and writeFile support */
import { read, writeFileXLSX } from "xlsx";
/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {masterData} from "../../Utils/data.js"
import stringSimilarity from "string-similarity"
set_cptable(cptable);


function Upload() {


  const [file, setFile] = useState();
  const [fileName, setFileName] = useState([]);
  const [fileData, setFileData] = useState();
  const [errorList, setErrorList] = useState([]);

  const [step, setStep] = useState(1);

  const [uploaded, setUploaded] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [data, setData] = useState([])

  const [progress,setProgress] = useState('20%')

  const [progressState,setProgressState] = useState('File Uploaded')

  const navigate = useNavigate();

  const location = useLocation();


  // useEffect
  useEffect(()=>{
    setProgress('20%')
    setProgressState('File Uploaded')
    setUploaded(false);  
  },[location.pathname])


  const handleUpload = async(e) => {
    // setFile(e.target.files);
    await setUploaded(true);  
    // await progreeHandler();
    var xl2json = new ExcelToJSON();
  await xl2json.parseExcel(e.target.files[0]);
  progreeHandler();
  }



  const progreeHandler = ()=>{
    
    setTimeout(() => {
      setProgressState('Processing the file');
      setProgress('30%');
    }, 0);
    setTimeout(() => {
      setProgressState('Detecting duplicates');
      setProgress('40%');
    }, 1000);
    setTimeout(() => {
      setProgressState('Aligning contents');
      setProgress('55%');
    }, 2000);
    setTimeout(() => {
      setProgressState('Re-evaluating everything');
      setProgress('70%');
    }, 3000);
    setTimeout(() => {
      setProgressState('Getting things done');
      setProgress('85%');
    }, 4000);
    setTimeout(() => {
      setProgressState('File is ready');
      setProgress('100%');
      // setUploaded(true);
      setStep(2);
      navigate('/dashboard/showList')
    }, 5000);
  }




  var ExcelToJSON = function () {
    this.parseExcel = function (file) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
          cellDates: true,
          dateNF: "mm/dd/yyyy;@",
        });
  
        //logic for JSON
        try {
          const sheetNames = workbook.SheetNames;
          // parsing only first sheet
  
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetNames[0]]
          );
          var json_object = JSON.stringify(XL_row_object);
          let json_Array = JSON.parse(json_object);
          json_Array.forEach(function (v) {
            if (v["Canceled Minus Appt"]) delete v["Canceled Minus Appt"];
  
            var d = new Date(v["Appointment Date"]);
            d.setHours(d.getHours() + 5);
            d.setMinutes(d.getMinutes() + 30);
  
            v["Appointment Date"] = String(
              `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
            );
          });
  
          for (const obj of json_Array) {
            try {
              const keys = Object.keys(obj);
              for (const key of keys) {
                obj[key] = obj[key].trim();
              }
            } catch (err) {
                 // can ignore
            }
          }
  
          for (const obj of json_Array) {
            json_Array = json_Array.filter(function (e) {
              return obj != e;
            });
            json_Array.push(obj);
          }
          // JSON.stringify(JSON.parse(json_Array));
          const unique_json_Array = json_Array.filter((value, index) => {
            const _value = JSON.stringify(value);
            return (
              index ===
              json_Array.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
              })
            );
          });
  
          // provider name set and then to array
          let providerNames = new Set(
            unique_json_Array.map((item) => item["Provider Name"])
          );
  
          providerNames = Array.from(providerNames);
          const providerMap = new Map();
  
          for (const providerName of providerNames) {
            let providerData = unique_json_Array.filter(function (e) {
              return e["Provider Name"] === providerName;
            });
            providerMap.set(providerName, providerData);
          }
          const errorSet = new Set();
          for (const providerName of providerNames) {
            const today = new Date();
            console.log(today)
            const today_plus_15 = new Date();
            today_plus_15.setDate(today_plus_15.getDate() + 15);
            const providerData = providerMap.get(providerName);
            let i = 1;
            for (const data of providerData) {
              let found = false;
              let dataToMap;
              for (const ms of masterData) {
                if (!ms["ItemDescription2"]) {
                  console.log(ms);
                }
                var similarity = stringSimilarity.compareTwoStrings(
                  ms["Provider Name"],
                  data["Provider Name"]
                );
                const isMatch = ms["ItemDescription2"].includes(
                  data["Last Name"]
                );
                if (isMatch && similarity > 0.8) {
                  found = true;
                  dataToMap = ms;
                  break;
                }
              }
              if (!found) {
                errorSet.add(providerName);
              }
              data["InvoiceNo"] = i;
              data["Customer"] = "LHI";
              data[
                "InvoiceDate"
              ] = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
              data[
                "DueDate"
              ] = `${today_plus_15.getMonth() + 1}/${today_plus_15.getDate()}/${today_plus_15.getFullYear()}`;
              data["Terms"] = "Net 15";
              data["Location"] = found ? dataToMap["Location"] : "-";
              data["ItemDescription1"] = data["Last Name"];
              data["ItemDescription2"] = found
                ? dataToMap["ItemDescription2"]
                : "-";
              data["Service Date"] = data["Appointment Date"];
              data["Taxable"] = "N";
              data["ItemQuantity"] = 1;
              data["Rate"] = found ? dataToMap["Rate"] : -1;
              data["Amount"] = data["Rate"];
              delete data["Provider Id"];
              delete data["Last Name"];
              delete data["Provider Name"];
              delete data["Appointment Date"];
              delete data["State"];
              try {
                delete data["Canceled Minus Appt"];
              } catch (err) {
                /// ignore
              }
            }
            i++;
          }
          const errorArray = Array.from(errorSet);
          console.log("error", errorArray); // provider names which have error

          setFileName(providerNames);
          setFileData(providerMap);
          setErrorList(errorArray);
          // download(providerMap.get(providerNames[2]), providerNames[2]);
        } catch (err) {
          console.log(err);
        }
      };
  
      reader.onerror = function (ex) {
        console.log(ex);
      };
  
      reader.readAsBinaryString(file);
    };
  };
  
  const download = (jsonArray, name) => {
    var worksheet = XLSX.utils.json_to_sheet(jsonArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `${name}.xlsx`);
  };
  

  return (
      <div className='upload'>

      {location.pathname==='/dashboard/upload' ? 
        <div className="bg">
          <div className= {uploaded ? "uploader active" : "uploader" }>
            <div className='upload-drop'>
              <div className="upload-inner">
                <div className='upload-img'>
                  <img src={logo} alt="logo" />
                  <input
                    type="file"
                    hidden=""
                    accept=".xlsx,.xls"
                    id="input1"
                    multiple
                    onChange={(e) => handleUpload(e)}

                  />

                </div>
              </div>
            </div>
            <div className="highlighted-txt">
              {uploaded ? 
              <p>{progressState}</p>
              
              : <p>Drag and drop or browse files to upload</p>
              
              }
             </div>

             {uploaded ?
            <div className='upload-loader'>
              <div className="progress-bar" style={{width:progress}}> 
              </div>
            </div>
            : null}
          </div>
        </div>
        : null
      }


      {location.pathname==='/dashboard/showList' ? <div className="uploaded">
        {fileName.length == 0 ? <Navigate replace to="/dashboard/upload" /> : null}
        <FileShow setData={setData} setStep={setStep} file={file} fileName={fileName} fileData={fileData} setFileName={setFileName} errorList={errorList} />
      </div> : null}

      {location.pathname==='/dashboard/showTable' ? <>
      {data.length == 0 ? <Navigate replace to="/dashboard/upload" /> : null}
      <TablePage data={data} setStep={setStep} />
      </> :  null}

    </div>
  )
}

export default Upload