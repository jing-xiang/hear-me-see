// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const [spokenWord, setSpokenWord] = useState('');

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Loaded.");
    // Loop and detect objects
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check if data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const obj = await net.detect(video);

      // Draw objects on canvas
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);

      // Update spoken word
      const objectNames = obj.map((o) => o.class);
      const speechText = objectNames.join(", ");
      setSpokenWord(speechText);

      // Read out detected objects
      speak(speechText);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synthRef.current.speak(utterance);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const geocoder = new google.maps.Geocoder();
            const latLng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                const locationData = results[0].formatted_address;
                setLocation({
                  latitude,
                  longitude,
                  locationData
                });
                speak(locationData); // Speak the location data
              }
            });
          } catch (error) {
            console.error('Error retrieving location data:', error);
          }
        },
        (error) => {
          console.error('Error retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  
  useEffect(() => {
    runCoco();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
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
            zIndex: 9,
            width: windowDimensions.width,
            height: windowDimensions.height,
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
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
        
        <div className="spoken-word">{spokenWord}</div>
      </header>
    </div>
  );
}

export default App;
