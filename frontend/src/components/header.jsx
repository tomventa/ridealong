import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';


import LogoutIcon from '@mui/icons-material/Logout';

import '../home.css';
import logo from '../assets/s2.png';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#0D5B06"
        }
    }
});


export default function Header() {
    let [user, setUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleLogout = () => {
        setUser();
        localStorage.clear();
        navigate("/");
    };
    if(user){
        return(
        <ThemeProvider theme={theme}>
        <header className="header">

    <div className="header__content">
      <Link className="header__logo" to="/">
        <img src={logo} alt="" className="im1" />
      </Link>
      <ul className="header__menu">
        <li><Link className="cambioc" to="/">Home</Link></li>
        <li><Link  className="cambioc" to="/map">DEMO</Link></li>
        <li><Link className="cambioc" to="/edit">Modifica Profilo</Link></li>
      </ul>
          <div className="header__icons">
        <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}>Logout</Button>
          <div className="icon-hamburger">
            <span></span>
          </div>
      </div>
    </div>

    
  </header>
  </ThemeProvider>
    )}

    return (
        
  <header className="header">

    <div className="header__content">
      <Link className="header__logo" to="/">
        <img src={logo} alt="" className="im1" />
      </Link>
      <ul className="header__menu">
        <li><Link className="cambioc" to="/">Home</Link></li>
        <li><Link  className="cambioc" to="/login">Login</Link></li>
        <li><Link  className="cambioc" to="/register">Registrati</Link></li>


      </ul>
      <div className="header__icons">
          <div className="icon-hamburger">
            <span></span>
            <span></span>
          </div>
      </div>
    </div>

    
  </header>
    )};
