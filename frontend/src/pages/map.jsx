import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Header from "../components/header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
mapboxgl.accessToken = 'pk.eyJ1IjoiZzloNTdnb3oiLCJhIjoiY2xmbDB0cG16MDBqbzNxbXFmZmd2aTl4biJ9.6l-eGUfxHRISU1xm5WzBPw';




const theme = createTheme({
    palette: {
        primary: {
            main: "#0D5B06"
        }
    }
});



const App = () => {
    const ref = useRef(null);
    const [startRoute, setStartRoute] = useState();
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (ref.current && !map) {
            const map = new mapboxgl.Map({
                style: "mapbox://styles/mapbox/streets-v12",
                center: [11.7481,46.8634],
                zoom: [11.7481],
                language: "it"
            });
            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: "metric",
                profile: "mapbox/driving-traffic",
                language: "it",
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
            directions.on("route", () => {
               setStartRoute(1);    
            });
            directions.on("clear", () => {
                setStartRoute(null);
            });
            setMap(map);
        }
        return () => Map.remove();
    },[ref,map]);
    useEffect(() => {
           });
    return (
    <ThemeProvider theme={theme}>
        <Header/>
        <div className="map-container" ref={ref} />
        {startRoute && 
        <div className="button-container">
            <Button variant="contained" color="primary" size="large" endIcon={<SendIcon />}>
              Prenota Corsa
            </Button>
        </div>
            }

    </ThemeProvider>
    );
}
export default App
