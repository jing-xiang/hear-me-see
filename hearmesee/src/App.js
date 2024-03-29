import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import logo from "../src/appicon.png";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import firebase from "firebase/app";
import "firebase/firestore";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const [spokenWord, setSpokenWord] = useState("");
  const [locationData, setLocationData] = useState("");
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

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
    //regulate text to speech synchronisation
    setInterval(() => {
      detect(net);
    }, 4000);
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

      // Update logo opacity based on the number of objects detected
      const numObjects = obj.length;
      let opacity = 0;
      opacity = Math.min(numObjects * 0.2, 1);
      setLogoOpacity(opacity);

      // Read out detected objects
      speak(speechText);
    }
  };

  //function for TTS given a detected object as input
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 2;
    synthRef.current.speak(utterance);
    console.log(text);
  };

  //mapbox feature
  const getLocation = () => {
    //display location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const mapboxToken = process.env.REACT_APP_MAPBOX_API;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`;
            const response = await fetch(url);
            const data = await response.json();
            const locationData = data.features[0].place_name;
            console.log(setLocationData(locationData));
            storeLocationData(locationData);
          } catch (error) {
            console.error("Error retrieving location data:", error);
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    runCoco();
    getLocation();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //background effect
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: windowDimensions.height,
          minWidth: 600.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor:0x45434d,
          points: 15.0,
          maxDistance: 10.0,
          spacing: 20.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, windowDimensions.height]);

  const videoConstraints = {
  facingMode: "environment", // Use "user" for front camera
};

const storeLocationData = async (locationData) => {
  try {
    const db = firebase.firestore(); // Get Firestore instance
    await db.collection("locations").add({
      location: locationData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Location data stored in Firestore!");
  } catch (error) {
    console.error("Error storing location data in Firestore:", error);
  }
};


  return (
    <div className="App">
        <div className="vanta-container" ref={vantaRef} ></div>
      <header className="App-header">
        <div className="logo-container" style={{ opacity: logoOpacity }}>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints = {videoConstraints}
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
            zIndex: 10,
            width: 640,
            height: 480,
          }}
        />

        <div
          className="spoken-word"
          style={{
            position: "absolute",
            fontSize: "500%",
            bottom: "20px",
            color: "white",
            zIndex: 11,
          }}
        >
          {spokenWord}
        </div>
        <div
          className="location-data"
          style={{
            fontSize: "23px",
            position: "absolute",
            bottom: "50px",
            left: "50px",
            color: "white",
            textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 blackl",
            zIndex: 11,
          }}
        >
          {locationData}
        </div>

        <div
          className="blur-rectangle"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: windowDimensions.width,
            height: "200px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 10,
          }}
        ></div>
      </header>
    </div>
  );
}

export default App;
