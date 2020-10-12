import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';
import LogoImg from '../images/logo.svg';
import { FiArrowRight } from 'react-icons/fi';


function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={LogoImg} alt="Logo da Happy"/>

        <main>
          <h1>Leve Felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia para muitas crianças</p>
        </main>

        <div className="location">
          <strong>Joinville</strong>
          <span>Santa Catarina</span>
        </div>

        <Link to="/orphanages" className="enter-app">
          <FiArrowRight 
            size={26}
            color="rgba(0, 0, 0, 0.6)"/>
        </Link>
      </div>
    </div>
  );
}

export default Landing;