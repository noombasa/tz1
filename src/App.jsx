import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
import jsQR from "jsqr";
// import Worker from "./worker";
// import WebWorker from './WebWorker';

const start = (videoEl, stream) => {
  if (videoEl.srcObject !== undefined) {
    videoEl.srcObject = stream;
  } else if (videoEl.mozSrcObject !== undefined) {
    videoEl.mozSrcObject = stream;
  } else if (window.URL.createObjectURL) {
    videoEl.src = window.URL.createObjectURL(stream);
  } else if (window.webkitURL) {
    videoEl.src = window.webkitURL.createObjectURL(stream);
  } else {
    videoEl.src = stream;
  }
  videoEl.play();
}

const App = () => {
  const [codeResult, setCodeResult] = useState('Not found');
  const [isNeedScanning, setIsNeedScanning] = useState(false);
  const [timerEnd, setTimerEnd] = useState(0);
  const [timerStart, setTimerStart] = useState(0);
  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  useEffect(() => {
    const video = videoEl.current;

      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        start(video, stream);
        window.requestAnimationFrame(tick);
      })
      .catch(e => console.error(e));
    });

  const tick = () => {
    const video = videoEl.current;
    
    const checkVideoState = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        clearInterval(checkVideoState);
        
        let video = videoEl.current;
        const height = video.videoHeight;
        const width = video.videoWidth;

        const canvas = canvasEl.current;
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        
        ctx.drawImage(video, 0, 0);
        const image = ctx.getImageData(0, 0, width, height);
        let code;
        if (isNeedScanning) {
          console.log("jsqr");
          code = jsQR(image.data, image.width, image.height);
          if (code) {
            console.log("set result");
            setCodeResult(code.data);
            setTimerEnd(performance.now());
            setIsNeedScanning(false);
          }
        }
        window.requestAnimationFrame(tick);
      }
    }, 67);
  }
  
  const onClick = () => {
    setIsNeedScanning(true);
    setCodeResult('');
    setTimerStart(performance.now());
  }

  return (
    <div className="App">
      <button onClick={()=> onClick()}>sdsdsd</button>
      <video ref={videoEl} id="preview" style={{display: "none"}}/>
      <canvas id="canvas" ref={canvasEl} width="200"/>
      <span>{codeResult?`${codeResult} time: ${timerEnd - timerStart}`:"not fonund"}</span>
      <button onClick={()=> setVideoDevice(1)}>camera1</button>
      <button onClick={()=> setVideoDevice(0)}>camera0</button>
    </div>
  );
};

export default App;