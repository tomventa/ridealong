import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Header from "../components/header";
mapboxgl.accessToken = 'pk.eyJ1IjoiZzloNTdnb3oiLCJhIjoiY2xmbDB0cG16MDBqbzNxbXFmZmd2aTl4biJ9.6l-eGUfxHRISU1xm5WzBPw';


const mapContainerRef = useRef(null);
const [startRoute, setStartRoute] = useState();

const map = new mapboxgl.Map({
  container: mapContainerRef.current,
  style: "mapbox://styles/mapbox/streets-v11",
  center: [11.7481, 46.8634],
  zoom: [9],
  language: "it"
});


const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving-traffic",
    language: "it",
    enableHighAccuracy: true,
});

const App = () => {
       useEffect(() => {
                const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: "metric",
            profile: "mapbox/driving-traffic",
            language: "it",
            enableHighAccuracy: true,
        });
        directions.on("route", () => {
           setStartRoute(1); 
        });
        directions.on("clear", () => {
            setStartRoute(null);
        });
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
        map.addControl(
           new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            })
        );

        map.addControl(directions, "bottom-left");
        return () => map.remove();
    });
    return (
    <>
        <Header/>
        <div className="map-container" ref={mapContainerRef} />
        {startRoute && 
        <div className="button-container">
            <Button variant="contained" color="success" size="large" endIcon={<SendIcon />}>
              Prenota Corsa
            </Button>
        </div>
            }

    </>
    );
}
export default App
