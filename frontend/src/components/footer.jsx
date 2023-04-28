import React from "react";

import "../home.css";

export default function Footer() {
    return (    
    <footer className="footer pt-4 pb-4 mt-4 ">
      <div className="grid watch fade-in">
        <div className="col-50 mt-2">
          <h3>RIDE ALONG</h3>
          <p>La start-up che Offre un servizio di car pooling sicuro, conveniente e affidabile in Italia, aumentando l'efficienza del trasporto privato riducendo il numero di auto in circolazione e Migliorando la sostenibilità ambientale riducendo le emissioni di CO2</p>
        </div>
        <div className="col-25 mt-2">
          <h3>Azienda</h3>
          <ul>
            <li className="footert">Chi siamo</li>
            <li className="footert">Le nostre offerte</li>
            <li className="footert">Investitori</li>
            <li className="footert">Opportunità di lavoro</li>
            <li className="footert">Blog</li>
            <li className="footert">Newsroom</li>
          </ul>
        </div>
        
      </div>
    </footer>
    )};
