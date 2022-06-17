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
set_cptable(cptable);



function Upload() {



  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [fileData, setFileData] = useState();
  
  const [step, setStep] = useState(1);

  const [uploaded, setUploaded] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [data, setData] = useState([])

  const [progress,setProgress] = useState('20%')

  const [progressState,setProgressState] = useState('File Uploaded')

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
    }, 5000);
  }



  var ExcelToJSON = function () {
    
    this.parseExcel =  function (file) {
      var reader = new FileReader();
  


      reader.onload = async function (e) {
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
              `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
            );
          });

      
      
          for (const obj of json_Array) {
            json_Array = json_Array.filter(function (e) {
              return obj != e;
            });
            json_Array.push(obj);
          }
  
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
  
          for (const providerName of providerNames) {
            const today = new Date();
            const today_plus_15 = new Date();
            today_plus_15.setDate(today_plus_15.getDate() + 15);
            const providerData = providerMap.get(providerName);
            for (const data of providerData) {
              data["InvoiceNo"] = "TBD";
              data["Customer"] = "LHI";
              data[
                "InvoiceDate"
              ] = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
              data[
                "DueDate"
              ] = `${today_plus_15.getMonth()}/${today_plus_15.getDate()}/${today_plus_15.getFullYear()}`;
              data["Terms"] = "Net 15";
              data["Location"] = "TBD";
              data["ItemDescription1"] = data["Last Name"];
              data["ItemDescription2"] = "from master table";
              data["ServiceDate"] = data["Appointment Date"];
              data["Taxable"] = "N";
              data["ItemQuantity"] = 1;
              data["Rate"] = "from master table";
              data["Amount"] = data["Rate"];
              data["ProviderName"] = data["Provider Name"];
              data["ProviderId"] = data["Provider Id"];
              data["AppointmentDate"] = data["Appointment Date"]
              data["LastName"] = data["Last Name"]

            }
          }

          setFileName(providerNames);
          setFileData(providerMap);
          
         

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


  return (
    <div className='upload'>

      {step == 1 ? 
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
              
              : <p>Drag and drop browse files to upload</p>
              
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


      {step == 2 ? <div className="uploaded">
        <FileShow setData={setData} setStep={setStep} file={file} fileName={fileName} fileData={fileData} setFileName={setFileName} />
      </div> : null}

      {step == 3 ? <TablePage data={data} setStep={setStep} /> :  null}

    </div>
  )
}

export default Upload