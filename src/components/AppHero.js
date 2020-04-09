import React from 'react';
import left from '../images/left.svg';
import { Link } from 'react-router-dom';

const AppHero = () => {

  return (
    <header
      className="App-hero"
      style={{
        backgroundImage: `url("{{ get_asset_url('./images/grayscale-mountain-banner.png') }}")`,
      }}
    >
      <Link to={`/${APP_CONFIG.appRoot}`} className="back-banner">
        <img src={left} className="back-banner__icon" /> Back to Events
      </Link>
    </header>
  );
};

export default AppHero;
