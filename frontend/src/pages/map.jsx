import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "!@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"; // eslint-disable-line import/no-webpack-loader-syntax
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import {useNavigate} from 'react-router-dom';
import Header from "../components/header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiZzloNTdnb3oiLCJhIjoiY2xmbDB0cG16MDBqbzNxbXFmZmd2aTl4biJ9.6l-eGUfxHRISU1xm5WzBPw';


const tiers = [
  {
    title: 'RideX',
    price: '0.4',
    description: [
        'Cancellazione a Pagamento',
        'Macchina condivisa' 
    ],
    buttonText: 'Paga ora',
    buttonVariant: 'outlined',
  },
  {
    title: 'RideY',
    subheader:'Il piu\' popolare',
    price: '0.7',
    description: [
        'Cancellazione gratuita',
        'Macchina Privata'
    ],
    buttonText: 'Paga ora',
    buttonVariant: 'contained',
  },
  {
    title: 'RideZ',
    price: '1.2',
    description: [
        'Cancellazione gratuita',
        'Macchina Privata',
        'Autista Professionista'
    ],
    buttonText: 'Paga ora',
    buttonVariant: 'outlined',
  },
];

const theme = createTheme({
    palette: {
        primary: {
            main: "#0D5B06"
        }
    }
});


const App = () => {
    const navigate = useNavigate();
    const [startRoute, setStartRoute] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    let auth = useRef(null);
    const directions = useRef(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleOut = (e,tier) =>  {
        let price = tier.price;
        let distance, duration;
        const part = directions.current.getOrigin().geometry.coordinates;
        const arri = directions.current.getDestination().geometry.coordinates;
        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+part[0]+','+part[1]+';'+arri[0]+','+arri[1];
        const options = {
          params: {
            alternatives: false,
            geometries: 'geojson',
            language: 'en',
            overview: 'simplified',
            steps: true,
            access_token: mapboxgl.accessToken
          }
        };

        axios.get(url, options)
          .then(response => {
            distance = response.data.routes[0].distance;
            duration = response.data.routes[0].duration;
            price = parseFloat(price);
            if(localStorage.getItem('token') != null){
                auth.current = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
            }
            const payload = {
                "abilitata": true,
                "minimo_km": 1,
                "massimo_km": Math.ceil(distance/1000),
                "massimo_minuti": Math.ceil(duration/60),
                "minimo_tariffa": (2.5+price),
                "massimo_tariffa": Math.ceil(Math.ceil(distance/1000)*price),
                "tariffa_partenza": 2.5,
                "tariffa_per_km": price,
                "permetti_contrattazione": true,
                "permetti_sconto": false
            }
            console.log(payload);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': auth.current
            }
            axios.post('../api/fare/add/',payload,{headers: headers})
            .then(() => {
                navigate('/dashboard');
            })
            .catch((e) => {
                console.log(e);
            })
          })
          .catch(error => {
            console.log(error);
          });

    }
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [12, 42],
            zoom: [5.5],
            language: "it"
        });
            });
    useEffect(() => {
        if (map.current){ // wait for map to initialize
            if(directions.current) return;
            map.current.addControl(
                new mapboxgl.GeolocateControl({
                    trackUserLocation: true,
                    showUserHeading: true
                })
            );
            if(directions.current) return;
            directions.current = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: "metric",
                    profile: "mapbox/driving-traffic",
                    language: "it",
                    controls: {
                        instructions: false,
                        profileSwitcher: false
                    }
            });
            map.current.addControl(directions.current, "bottom-left");
            directions.current.on("route", () => {
                setStartRoute(1);    
            });
            directions.current.on("clear", () => {
                setStartRoute(null);
            });
        }

    },[]);
    return (
        <ThemeProvider theme={theme}>
        <Header />
        <div className="map-container" ref={mapContainer} />
        {startRoute &&
            <div className="button-container">
                <Button variant="contained" color="primary" size="large" endIcon={<SendIcon />} onClick={handleOpen}>
                  Prenota Corsa
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                  >
                <DialogActions>
      <Box>
        <Grid container spacing={5} alignItems="flex-end" justifyContent="center">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary" >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /km
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={e => handleOut(e,tier)} variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
                </DialogActions>
              </Dialog>
            </div>
        }
        </ThemeProvider>
    );
}
export default App;
