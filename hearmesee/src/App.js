import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        webcamRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log('Error accessing webcam:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="video-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam-video"
        />
      </div>
      <button onClick={capture}>Capture</button>
    </div>
  );
  
}

export default App;
