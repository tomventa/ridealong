import React, {useEffect,useState} from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
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
    const [user, setUser] = useState(null);
    useEffect(() => {
        var auth = null;
        if(localStorage.getItem('token') != null){
            auth = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
        }
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/account/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth 
                }
            })
            .then((response) => {
                setUser(response.data);
                console.log("Yee");
            })
            .catch((e) => {
                console.log(e);
            });

    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email')==null?user.email:data.get('email');
        let password =  data.get('password');
        let firstName = data.get('firstName')==null?user.nome:data.get('firstName');        
        let lastName = data.get('lastName')==null?user.cognome:data.get('lastName');
        let phone = data.get('phone')==null?user.cellulare:data.get('phone');
        let dob = data.get('dob')==null?user.data_di_nascita:data.get('dob');
        // const user = {nome:firstName,cognome:lastName,email:email,cellulare:phone,password:password,data_di_nascita:dob}; 
        const user = {nome:"Tim",cognome:"Cook",email:"test@test.it", cellulare:"+39 1112223333", password:"pippo", data_di_nascita:"2004-11-08"};
        let auth = null;
        if(localStorage.getItem('token') != null){
            auth = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/account/edit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth 
                },
            data: user})
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
                console.log("Errore non autenticato!");
            });
    }
    
    if(user){
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
                  placeholder={user.nome}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" helperText=" " marginTop={2}>
                    Nome attuale del tuo profilo: {user.nome}
                    </Typography>
                    </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Cognome"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder={user.cognome}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" helperText=" " marginTop={2}>
                    Cognome attuale del tuo profilo: {user.cognome}
                    </Typography>
                    </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email "
                  name="email"
                  autoComplete="email"
                  placeholder={user.email}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" helperText=" " marginTop={2}>
                    Email attuale del tuo profilo: {user.email}
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
                <Typography component="h2" variant="h5" helperText=" " marginTop={2}>
                    Data attuale del tuo profilo: {user.data_di_nascita}
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
                  placeholder={user.cellulare}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h5" helperText=" " marginTop={2}>
                    Cellulare attuale del tuo profilo: {user.cellulare}
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
