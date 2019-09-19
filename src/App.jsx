import React, { useState, useEffect, useRef } from "react";
import Scan from './Scan.jsx';
import styles from "./App.scss";
// import Worker from './worker.js';
import Worker from "./worker2.js";
import WebWorker from './WebWorker.js';


const App = () => {
  const [isNeedScanning, setIsNeedScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [timerEnd, setTimerEnd] = useState(0);
  const [timerStart, setTimerStart] = useState(0);
  const [codeResult, setCodeResult] = useState('');
  // const worker = new Worker();
  const worker = new WebWorker(Worker);

  
  useEffect(() => {
    worker.onmessage = (e) => {
      console.log("onmessage", e);
    }
    console.log(111);

    navigator.mediaDevices.enumerateDevices()
      .then(devicesList => {
        let devList = devicesList.filter((device)=> device.kind === "videoinput")
        console.log(devList);
        setDevices(devList);
      })
      .catch(e => console.error(e));
  },[]);

  const onScanComplite = (decodedObj) => {
    setTimerEnd(performance.now());
    setCodeResult(decodedObj);
    setIsNeedScanning(false);
  }

  const onBeginScan = () => {
    setIsNeedScanning(true);
    setCodeResult(null);
    setTimerStart(performance.now());

  }

  return (
    <div className={styles.root}>
      <div className="panel">
        <div className="devices">
          {
            devices.map((device, index)=>(
              <button key={index} onClick={()=>setDeviceIndex(index)}>{device.label}</button>
            ))
          }
        </div>
        <button onClick={()=>onBeginScan()}>Начать сканирование</button>
        <span>{codeResult}</span>
        {!isNeedScanning && (<div>Время сканирования: {timerEnd - timerStart}</div>)}
      </div>
      
      { 
        isNeedScanning && (
          <div className="scannerWrapper">
            <div className="qrDecoded">
              <Scan worker={worker} device={devices[deviceIndex].deviceId} onScanComplite={onScanComplite}/>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default App;