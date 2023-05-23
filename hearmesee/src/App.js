import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function App() {
  // Reference to webcam component 
  const webcamRef = useRef(null);

  // const capture = () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  // };
  // Function to capture an image detected from webcam 
  // const capture = () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  // };

  // Setting up of webcam access when component mounts
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Setting stream as source for webcam component
        webcamRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log('Error accessing webcam:', error);
      });
  }, []);

  // Render app component 
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
      {/* <button onClick={capture}>Capture</button> */}
    </div>
  );
  
}

export default App;
