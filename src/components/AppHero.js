import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './AppHero.scss';

const AppHero = () => {
  const [state] = useContext(AppContext);
  const { events_root, hero_img } = state.moduleData;
  const eventsRootPath = new URL(events_root).pathname;

  return (
    <header
      className="App-hero"
      style={{
        backgroundImage: `url("${hero_img.src}")`,
      }}
    >
      <Link to={eventsRootPath} className="back-banner">
        <FontAwesomeIcon icon={faChevronLeft} className="back-banner__icon" />
        Back to Events
      </Link>
    </header>
  );
};

export default AppHero;
