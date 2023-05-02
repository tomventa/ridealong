import React, {useEffect,useRef,useState} from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import axios from 'axios';

import Header from '../components/header';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        RideAlong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
    palette: {
        primary: {
            main: "#0D5B06"
        }
    }
});

export default function EditProfile(){
    var user = useRef(0);
    const [userR,setUser] = useState(null);
    var auth = useRef(null);
    const [error, setError] = useState(false);
    const [right, setRight] = useState(false);
    const [errorP,setErrorP] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token') != null){
            auth.current = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
        }
        axios({
            method: 'get',
            url: '../api/account/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.current
                }
            })
            .then((response) => {
                user.current = response.data;
                setUser(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email')===""?user.current.email:data.get('email');
        let password =  data.get('password');
        let firstName = data.get('firstName')===""?user.current.nome:data.get('firstName');        
        let lastName = data.get('lastName')===""?user.current.cognome:data.get('lastName');
        let phone = data.get('phone')===""?user.current.cellulare:data.get('phone');
        let dob = data.get('dob')===""?user.current.data_di_nascita:data.get('dob');
        const userM = {nome:firstName,cognome:lastName,email:email,cellulare:phone,password:password,data_di_nascita:dob}; 
        if(userM.password === ""){
            setErrorP(true);
        }
        else{
            axios({
            method: 'post',
            url: 'http://localhost:8080/api/account/edit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.current
                },
            data: userM})
            .then((response) => {
                user.current = response.data;
                setUser(response.data);
                setRight(true);
            })
            .catch(() => {
                setError(true);
            });
        }
    }

    if(error){
        setTimeout(() => {
          setError(false);
        }, 2000);
    }
    if(right){  
        setTimeout(() => {
          setRight(false);
        }, 2000);
    }
    if(errorP){
        setTimeout(() => {
            setErrorP(false);
        }, 2000);
    }
    
    if(userR){
        return (
    <ThemeProvider theme={theme}>
        <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Modifica il tuo profilo
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                  placeholder={user.current.nome}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" marginTop={2}>
                    Nome attuale del tuo profilo: <b>{user.current.nome}</b>
                    </Typography>
                    </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Cognome"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder={user.current.cognome}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" marginTop={2}>
                    Cognome attuale del tuo profilo: <b>{user.current.cognome}</b>
                    </Typography>
                    </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email "
                  name="email"
                  autoComplete="email"
                  placeholder={user.current.email}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" marginTop={2}>
                    Email attuale del tuo profilo: <b>{user.current.email}</b>
                    </Typography>
                    </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Inserisci la tua password"
                />
              </Grid>
            <Grid item xs={12} sm={6} >
                <TextField
                  fullWidth
                  name="dob"
                  helperText="Inserisci la data di nascita"
                  type="date"
                  id="dob"
                  autoComplete="date-of-birth"
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5"  marginTop={2}>
                    Data attuale del tuo profilo: <b>{user.current.data_di_nascita}</b>
                    </Typography>
                    </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Cellulare"
                  type="phone"
                  id="phone"
                  autoComplete="new-phone"
                  placeholder={user.current.cellulare}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" marginTop={2}>
                    Cellulare attuale del tuo profilo: <b>{user.current.cellulare}</b>
                    </Typography>
                    </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifica Profilo
            </Button>

        {error && <Alert variant="filled" severity="error" >Errore nella modifica dell'utente</Alert>}
        {right && <Alert variant="filled" severity="success" >Utente modificato con successo</Alert>}
        {errorP && <Alert variant="filled" severity="error">Password non valida</Alert>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
            )
    };
  return (
    <ThemeProvider theme={theme}>
        <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Utente non autorizzato
          </Typography>
          </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
