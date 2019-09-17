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
  alert("v0.1");
//   const worker = new WebWorker(Worker);
  const [codeResult, setCodeResult] = useState(null);
  const [videoDevice, setVideoDevice] = useState(0);
  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  useEffect(() => {
    const video = videoEl.current;

    if (navigator && navigator.getUserMedia) {
      alert('тута нема выбора записи кинопленки');
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          var videoDevices = [0,0];
          var videoDeviceIndex = 0;
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
              " id = " + device.deviceId);
            if (device.kind == "videoinput") {  
              videoDevices[videoDeviceIndex++] =  device.deviceId;    
            }
          });


          var constraints =  {width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 776, ideal: 720, max: 1080 },
          deviceId: { exact: videoDevices[videoDevice]  } 
        };
        return navigator.mediaDevices.getUserMedia({ video: constraints });

      })
        .then(stream => {
          start(video, stream);
          window.requestAnimationFrame(tick);
        })
        .catch(e => console.error(e));
    } else if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      alert('тута есть выбора записи кинопленки');
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          var videoDevices = [0,0];
          var videoDeviceIndex = 0;
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
              " id = " + device.deviceId);
            if (device.kind == "videoinput") {  
              videoDevices[videoDeviceIndex++] =  device.deviceId;    
            }
          });


          var constraints =  {width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 776, ideal: 720, max: 1080 },
          deviceId: { exact: videoDevices[videoDevice]  } 
        };
        return navigator.mediaDevices.getUserMedia({ video: constraints });

      })
        .then(stream => {
          start(video, stream);
          window.requestAnimationFrame(tick);
        })
        .catch(e => console.error(e));
    } else {
      alert("У вас ни чего не робит")
    }
  });

  const tick = () => {
    const video = videoEl.current;
    console.log("tick");
    const checkVideoState = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        clearInterval(checkVideoState);

        const canvas = canvasEl.current;
        let ctx = canvas.getContext("2d");
        let video = videoEl.current;
        const height = video.videoHeight;
        const width = video.videoWidth;

        ctx.drawImage(video, 0, 0, width, height);
        const image = ctx.getImageData(0, 0, width, height);
        const code = jsQR(image.data, image.width, image.height);
        if (code) {
          setCodeResult(code.data);
        }
        window.requestAnimationFrame(tick);
      }
    }, 67);
  }
  
  const onClick = () => {
    // worker.postMessage("sdsads");
    // const canvas = canvasEl.current;
    // let ctx= canvas.getContext("2d");
    // let video = videoEl.current;
    // const height = video.videoHeight;
    // const width = video.videoWidth;
    
    // ctx.drawImage(video, 0, 0, width, height);
    // const image = ctx.getImageData(0, 0, width, height);
    // const code = jsQR(image.data, image.width, image.height);
    // if (code) {
    //   console.log("Found QR code", code);
    // } else {
      console.log("not found")
    // }
  }

  return (
    <div className="App">
      <button onClick={()=> onClick()}>sdsdsd</button>
      <video ref={videoEl} id="preview"/>
      <canvas id="canvas" ref={canvasEl} width="640" height="480"/>
      <span>{codeResult?codeResult:"not fonund"}</span>
      <button onClick={()=> setVideoDevice(1)}>camera1</button>
      <button onClick={()=> setVideoDevice(0)}>camera0</button>

    </div>
  );
};

export default App;