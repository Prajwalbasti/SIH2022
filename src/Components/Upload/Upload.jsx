import React, { useState , useEffect } from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'
import FileShow from '../FileShow/FileShow';


function Upload({ setData }) {



  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const [uploaded, setUploaded] = useState(false);

  const [progress,setProgress] = useState('0%')

  const [progressState,setProgressState] = useState('Upload File')

  const handleUpload = (e) => {
    progreeHandler();
    setFile(e.target.files);
  }


  const progreeHandler = ()=>{
    setTimeout(() => {
      setProgressState('Unzipping the file');
      setProgress('15%');
    }, 500);
    setTimeout(() => {
      setProgressState('processing the file');
      setProgress('30%');
    }, 1000);
    setTimeout(() => {
      setProgressState('detecting duplicates');
      setProgress('40%');
    }, 1500);
    setTimeout(() => {
      setProgressState('Aligning contents');
      setProgress('55%');
    }, 2000);
    setTimeout(() => {
      setProgressState('Re-evaluating everything');
      setProgress('70%');
    }, 2500);
    setTimeout(() => {
      setProgressState('getting things done');
      setProgress('85%');
    }, 3000);
    setTimeout(() => {
      setProgressState('file is ready');
      setProgress('100%');
      setUploaded(true);
    }, 3500);
  }

// useEffect(() => {
//   progreeHandler();
// }, [])




  return (
    <div className='upload'>

      {uploaded ? null :

        <div className="bg">
          <div className= {file ? "uploader active" : "uploader" }>
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

                {/* <div className='upload-txt'>
                  {fileName ?
                    <p>{fileName}</p> : <p>{progressState}</p>}</div> */}
              </div>
            </div>
            <div className="highlighted-txt">
              {file ? 
              <p>{progressState}</p>
              
              : <p>Drag and drop browse files to upload</p>
              
              }
             </div>

             {file ?
            <div className='upload-loader'>
              <div className="progress-bar" style={{width:progress}}> 
              </div>
            </div>
            : null}
            
             
               

              
          </div>
        </div>

      }


      {uploaded ? <div className="uploaded">
        <FileShow setData={setData} file={file} />
      </div> : null}

    </div>
  )
}

export default Upload