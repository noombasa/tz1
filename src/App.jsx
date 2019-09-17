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
//   const worker = new WebWorker(Worker);
  const [codeResult, setCodeResult] = useState(null);
  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  useEffect(() => {
    const video = videoEl.current;

    if (navigator && navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true, audio: false },
        function(stream) {
          start(video, stream);
          window.requestAnimationFrame(tick);
        },
        function() {
          console.log(
            "хьюстон, у нас проблемы"
          );
        }
      );
    } else if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: false },
        function(stream) {
          start(video, stream);
          window.requestAnimationFrame(tick);
        },
        function() {
          console.log(
            "хьюстон, у нас проблемы"
          );
        }
      );
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
    </div>
  );
};

export default App;