import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

import {startVideo} from './helper.js'
import styles from './Scan.scss';

const Scan = ({device, onScanComplite}) => {
    const videoEl = useRef(null);
    const canvasEl = useRef(null);
    console.log
    useEffect(()=> {
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
                const height = video.videoHeight;
                const width = video.videoWidth;
        
                const canvas = canvasEl.current;
                canvas.width = width;
                canvas.height = height;

                let ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, width, height);
                const image = ctx.getImageData(0, 0, width, height);
                const code = jsQR(image.data, image.width, image.height);
                if (code && code.data) {
                    onScanComplite(code.data);
                }

            }
            window.requestAnimationFrame(processFrame);

        }
    },[]);

    

    return (
        <div className={styles.root}>
            <video ref={videoEl} id="preview" style={{display: "none"}}/>
            <canvas 
                id="canvas" 
                ref={canvasEl} 
                style={{width: "500px", height: "350px"}}
            />
        </div>
    )
}

export default Scan;