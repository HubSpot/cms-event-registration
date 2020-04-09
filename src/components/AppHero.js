import React from 'react';
import left from '../images/left.svg';
import { Link, useParams } from 'react-router-dom';

const AppHero = () => {
  const {appRoot} = useParams();

  return (
    <header
      className="App-hero"
      style={{
        backgroundImage: `url("{{ get_asset_url('./images/grayscale-mountain-banner.png') }}")`,
      }}
    >
      <Link to={`/${appRoot}`} className="back-banner">
        <img src={left} className="back-banner__icon" /> Back to Events
      </Link>
    </header>
  );
};

export default AppHero;
