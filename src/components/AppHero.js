import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const AppHero = () => {
  const [state] = useContext(AppContext);
  return (
    <header
      className="App-hero"
      style={{
        backgroundImage: `url("{{ get_asset_url('./images/grayscale-mountain-banner.png') }}")`,
      }}
    >
      <Link to={`/${state.moduleData.event_page}`} className="back-banner">
        <FontAwesomeIcon icon={faChevronLeft} className="back-banner__icon" />
        Back to Events
      </Link>
    </header>
  );
};

export default AppHero;
