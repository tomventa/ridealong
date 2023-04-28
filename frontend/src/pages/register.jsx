import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const theme = createTheme();

export default function SignInSide() {
    const [age, setAge] = React.useState(9);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      dob: data.get('dob'),
      cob: data.get('cob'),
      category: data.get('categoria')
    });
  };

  return (
    <ThemeProvider theme={theme}>
        <Header />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Registrazione 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                  helpertext=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Cognome"
                  name="lastName"
                  autoComplete="family-name"
                    helpertext=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Indirizzo email"
                  name="email"
                  autoComplete="email"
                    helpertext=""
                />
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
                  helpertext=" "
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  helperText="Data di nascita *"
                  type="date"
                  id="dob"
                  autoComplete="date-of-birth"
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Citta' di nascita"
                  name="cob"
                  helpertext=""
                  type="text"
                  id="cob"
                  autoComplete="city-of-birth"
                />
              </Grid>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ssn"
                  label="Codice fiscale"
                  type="text"
                  id="ssn"
                  autoComplete="ssn"
                />
              </Grid>
            <Grid item xs={12}>
                <FormControl required fullWidth id="categoria">
              <InputLabel id="categories">Categoria</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={age}
                label="Categoria"
                onChange={handleChange}
              >
                <MenuItem value={0}>Autista</MenuItem>
                <MenuItem value={1}>Passeggero</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12}>
                <Button fullWidth variant="outlined" component="label" color="primary" sx={{mt:3,mb:2}}>
                {" "}
                Carica le foto dei tuoi documenti
                <input required type="file" hidden />
              </Button>
            </Grid>
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrati 
            </Button>
          </Box>
        
        <Copyright sx={{ mt: 5 }} />
                    </Box>

    </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxNDcwNjE0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

