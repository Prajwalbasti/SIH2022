import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./Utilities.js";
import Modal from 'react-modal';
import ReactAudioPlayer from 'react-audio-player';


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


function Model() {

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

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
  
    const runCoco = async () => {
      const net = await cocossd.load();
      console.log(" model loaded.");
      setInterval(() => {
        detect(net);
      }, 10);
    };
  
    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
  
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
  
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
  
        const obj = await net.detect(video);
  
        const ctx = canvasRef.current.getContext("2d");
        console.log(obj);
       
        if(obj[0]['class'] === "person")
        {
          openModal().setTimeout(() => {
            closeModal();
           
          }, 10000);
          
        }
       
        drawRect(obj, ctx); 
      }
    };
  
    useEffect(()=>{runCoco()},[]);
  
    return (
      <div >
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true} 
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
  
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
           <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
               <div className="master-modal">
                    <div className="master-modal-header">
                        <div>ALERT</div>
                        <div onClick={() => { closeModal() }} style={{cursor:'pointer'}}>x</div>
                    </div>
                    <div className="master-modal-body">
                       <h2>
                         PERSON DETECTED!!
                       </h2>
                       <ReactAudioPlayer
                        src="beep.ogg"
                        autoPlay
                        controls
                      />
                    </div>
                </div>
            </Modal>
        </header>
      </div>
    );
}

export default Model