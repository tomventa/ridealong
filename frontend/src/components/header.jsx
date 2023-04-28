import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';


import LogoutIcon from '@mui/icons-material/Logout';

import '../home.css';
import logo from '../assets/s2.png';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

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
        <header className="header">

    <div className="header__content">
      <Link className="header__logo" to="/">
        <img src={logo} alt="" className="im1" />
      </Link>
      <ul className="header__menu">
        <li><Link className="cambioc" to="/">Home</Link></li>
        <li><Link  className="cambioc" to="/map">DEMO</Link></li>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="44" viewBox="0 0 15 44"><rect width="15" height="44" fill="none"/><path d="M13.98,27.343l-3.5-3.5a5.436,5.436,0,1,0-.778.777l3.5,3.5a.55.55,0,1,0,.778-.778ZM1.959,20.418a4.319,4.319,0,1,1,4.319,4.32A4.323,4.323,0,0,1,1.959,20.418Z" fill="#fff"/></svg>
          <div className="icon-hamburger">
            <span></span>
            <span></span>
          </div>
      </div>
    </div>

    
  </header>
    )};
