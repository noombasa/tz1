import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

import {startVideo} from './helper.js'
import styles from './Scan.scss';

const Scan = ({device, onScanComplite, worker}) => {
    const videoEl = useRef(null);
    const canvasEl = useRef(null);
    let height;
    let width;

    useEffect(()=> {
        console.log("device scan", device);
        const video = videoEl.current;
        navigator.mediaDevices.getUserMedia({
            video: {deviceId: { exact: device }},
            audio: false
        })
        .then(stream => {
            startVideo(video, stream);
            window.requestAnimationFrame(processFrame);
        })
        .catch(e => console.error(e));

        const processFrame = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                height = video.videoHeight;
                width = video.videoWidth;
        
                const canvas = canvasEl.current;
                canvas.width = width;
                canvas.height = height;

                let ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, width, height);
                // const image = ctx.getImageData(0, 0, width, height);
                // const code = jsQR(image.data, image.width, image.height);
                worker.postMessage("asdsads");
                if (code && code.data) {
                    onScanComplite(code.data);
                }
            }
            window.requestAnimationFrame(processFrame);

        }
    });

    

    return (
        <div className={styles.root}>
            <video ref={videoEl} id="preview" style={{display: "none"}}/>
            <div style={{width: "600px", height: "600px"}}>
                <canvas 
                    id="canvas" 
                    ref={canvasEl} 
                    style={height>width?{height: "100%"}:{width: "100%"}}
                />
            </div>
           
        </div>
    )
}

export default Scan;