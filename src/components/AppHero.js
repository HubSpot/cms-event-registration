import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './AppHero.scss';

const AppHero = () => {
  const [state] = useContext(AppContext);
  const { hero_img } = state.moduleData.hero_image_group;
  const { events_root } = state.moduleData.page_roots;
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
