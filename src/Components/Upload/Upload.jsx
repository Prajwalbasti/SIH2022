import React, {useState} from 'react'
import './Upload.scss'
import logo from './../../Assets/uploadLogo.svg'
import FileShow from '../FileShow/FileShow';


function Upload({setData}) {
  


  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const [uploaded, setUploaded] = useState(false);
  
  const handleUpload = (e) => {
    setFile(e.target.files);
    setUploaded(true);
  }




  

  return (
    <div className='upload'>

      {uploaded ? null :
      
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
  multiple
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

      }
        

{uploaded ? <div className="uploaded">
          <FileShow setData={setData} file={file} />
        </div> : null }
        
    </div>
  )
}

export default Upload