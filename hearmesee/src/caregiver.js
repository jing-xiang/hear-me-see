// caregiver.js

// Create a new map instance
function initMap() {
    // Replace 'YOUR_MAP_CONTAINER_ID' with the ID of the container where you want to display the map
    const mapContainer = document.getElementById('YOUR_MAP_CONTAINER_ID');
    
    // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZTA5NTc4MTEiLCJhIjoiY2xpdDFsYTk5MDQ3MjNjbTh1ZGR1eXFnbyJ9.k3BpAnN8M9SzIOcLk6ZL5Q';
    
    // Create a new map object
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude], // Replace with the longitude and latitude coordinates from app.js
      zoom: 12, // Adjust the zoom level as needed
    });
    
    // Add navigation controls to the map
    const navigationControls = new mapboxgl.NavigationControl();
    map.addControl(navigationControls);
  }
  
  // Load the Mapbox GL JS library
  function loadMapbox() {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.js';
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  }
  
  // Load the caregiver script after the page has finished loading
  window.addEventListener('load', () => {
    loadMapbox();
  });
  