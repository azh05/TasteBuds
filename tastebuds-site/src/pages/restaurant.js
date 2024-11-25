import { Link } from 'react-router-dom';
import React, { useState, useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import '../App.css'; // Import CSS file for styling

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};


function Restaurant() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGFYZ_ymrTuNW3Xqy48RASAK6MN8jouKA',
        libraries,
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
    return (
        <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
};

export default Restaurant;
