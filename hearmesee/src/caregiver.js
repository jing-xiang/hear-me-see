import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const [locationData, setLocationData] = useState("");
  const [googleSearchUrl, setGoogleSearchUrl] = useState("");

  // Function to get user's location using geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const mapboxToken = process.env.REACT_APP_MAPBOX_API;
            mapboxgl.accessToken = mapboxToken;
            const map = new mapboxgl.Map({
              container: "map-container",
              style: "mapbox://styles/mapbox/streets-v11",
              center: [longitude, latitude],
              zoom: 1, // Set initial zoom to a low value
            });

            // Add traffic data layer
            map.on("load", () => {
              map.addSource("traffic", {
                type: "vector",
                url: "mapbox://mapbox.mapbox-traffic-v1",
              });
              map.addLayer(
                {
                  id: "traffic-layer",
                  type: "line",
                  source: "traffic",
                  "source-layer": "traffic",
                  paint: {
                    "line-color": "#ff0000",
                    "line-width": 2,
                  },
                },
                "waterway-label"
              );
            });

            // Add a marker at the user's location
            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

            // Fly to the user's location with zoom animation
            map.flyTo({
              center: [longitude, latitude],
              zoom: 15, // Specify the desired zoom level
              duration: 2000, // Animation duration in milliseconds
              easing: (t) => t, // Easing function for the animation
            });

            // Reverse geocoding to get location data
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`;
            const response = await fetch(url);
            const data = await response.json();
            const locationData = data.features[0].place_name;
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
              locationData
            )}`;
            setLocationData(locationData);
            setGoogleSearchUrl(googleSearchUrl);
            storeLocationData(locationData);
          } catch (error) {
            console.error("Error initializing map:", error);
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="map-container" className="map-container" />
        <div className="location-data">
          <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer" style={{
            fontSize: "120%", // Increase the font size by 20%
            color: "black", // Set the font color to black
            textDecoration: "none", // Remove underline
            textShadow: "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white" // Add white outline
          }}>
            {locationData}
            
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
