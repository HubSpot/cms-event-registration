import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './AppHero.scss';

const AppHero = () => {
  const [state] = useContext(AppContext);
  const heroImgSrc = state.moduleData.hero_img.src;
  const AppRoot = state.moduleData.event_page;

  return (
    <header
      className="App-hero"
      style={{
        backgroundImage: `url("${heroImgSrc}")`,
      }}
    >
      <Link to={AppRoot} className="back-banner">
        <FontAwesomeIcon icon={faChevronLeft} className="back-banner__icon" />
        Back to Events
      </Link>
    </header>
  );
};

export default AppHero;
