import React,{useEffect} from "react";
import {Link} from 'react-router-dom';

import '../home.css';

import Header from '../components/header';
import Footer from '../components/footer';

import i1 from '../assets/i1.svg';
import i2 from '../assets/i2.svg';
import i3 from '../assets/i3.svg';
import i4 from '../assets/i4.svg';
import i5 from '../assets/i5.svg';
import videoh from '../assets/video.mp4';   



export default function Home() {
    useEffect(() => {
        const item = document.querySelector('.icon-hamburger');
        item.addEventListener("click", function() {
          document.body.classList.toggle('menu-open');
        });

        const elements_to_watch = document.querySelectorAll('.watch');
        const callback = function(items){
          items.forEach((item) => {
            if(item.isIntersecting){
              item.target.classList.add("in-page");
            } else{
              item.target.classList.remove("in-page");
            }
          });
        }

        const observer = new IntersectionObserver(callback, { threshold: 0.6 } );
        elements_to_watch.forEach((element) => {
          observer.observe(element); 
        });

        return () => {
          item.removeEventListener("click",item);
          elements_to_watch.forEach((element) => {
            observer.unobserve(element); 
          });
        };
      }, []);
    return (
    <>
    <Header/>
  <video className="video-bg" loop autoPlay muted>
        <source
          src={videoh}
          type="video/mp4"
        />
        Your browser does not support the video tag.
  </video>
  <div className="section watch">
    <div className="grid hero" id="home">
      <div className="col-50 pt-4 sma-text-center">
        <h1 className="text2">Prenota ora la tua corsa </h1>
        <h2 className="font-normal">dove vuoi e quando vuoi </h2>
        <p className="text1"> Offriamo un servizio di car pooling sicuro, conveniente e affidabile, aumententiamo l'efficienza del trasporto privato riducendo il numero di auto in circolazione e miglioriamo la sostenibilità ambientale.</p>
        <Link to="/login" className="button">Scopri come</Link>
      </div>
    </div>
  
  </div>

  <div className="panel">
    <div className="container">
      <div className="c1">
      <p className="watch fade-in intro">scegli noi</p>
      <h2 className="watch fade-in title-big">Perchè usare l'app  <br/>
        Ride Along.</h2>
     <img src={i1} alt="" className="img1" /></div>
        <div className="c2" >
     <div className="grid grid--center text-center" id="servizi">
      <div className="col-33  watch fade-in">
        
        <h4>Corse su richiesta</h4>
        <p>Richiedi una corsa a qualsiasi ora e in qualsiasi giorno dell'anno.</p>
      </div>
      <div className="col-33  watch fade-in">
        
        <h4>Opzioni a prezzi accessibili</h4>
        <p>Confronta i prezzi di tutte le opzioni di corsa, dai tragitti da pendolare giornalieri alle serate speciali.</p>
      </div>
      <div className="col-33 watch fade-in">
     
        <h4>Un modo semplice per spostarti in città</h4>
        <p>Tocca per farti accompagnare a destinazione dall’autista.</p>
      </div>
    </div>
    </div>
    </div>
  </div>


  <div  className="panel panel--white">
    <div className="container">
      <div className="c1">
      <h2 className="watch fade-in title-med">La tua sicurezza è importante.</h2>
      <p className="watch fade-in intro">ti offriamo la massimo tranquillità</p>
      
    <img src="" alt="" className="img1"/></div>
        <div className="c2">
     <div className="grid grid--center text-center" id="servizi">
      <div className="col-33   watch fade-in">
        <img src={i2} alt="" className="img2" />
        <h4>Funzionalità di sicurezza</h4>
        <p>Condividi la tua posizione con i contatti di fiducia. Richiedi assistenza toccando un solo pulsante. Grazie alla tecnologia, spostarsi non è mai stato così sicuro.</p>
      </div>
      <div className="col-33  watch fade-in">
        <img src={i3} alt="" className="img2" />
        <h4>Una community aperta a tutti</h4>
        <p>La nostra community è formata da milioni di utenti e autisti che seguono le stesse le linee guida di comportamento e possono contare gli uni sugli altri.</p>
      </div>
      <div className="col-33  watch fade-in">
        <img src={i4} alt="" className="img2" />
        <h4>Ricevi assistenza quando ti serve</h4>
        <p>Ricevi supporto 24/7 nell’app per le tue domande e per i dubbi relativi alla sicurezza.</p>
      </div>
    </div>
  </div>



  <div className="c3 watch fade-in">
    <div className="col-50 sinistra"> 
      <img src={i5} alt="" className="img3" />
     </div>
     <div className="col-50 destra"> 
      <h2>Come muoversi in tutto il <br/> mondo.</h2>
      <p>L'app Uber ti dà la possibilità di raggiungere la tua <br/>destinazione con varie tipologie di corse in oltre 10.000 città.</p>
      <Link to="/login" className="button2">Visualizza opzioni di corsa</Link>
     </div>

  </div>
</div>
  </div>

  
  <Footer/> 
  
  
  
  </>
  )};
  
