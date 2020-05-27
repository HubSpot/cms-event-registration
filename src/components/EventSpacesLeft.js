import React, { useState, useEffect } from 'react';

const EventSpacesLeft = ({ isUnlimited, space_available }) => {
  const [state, setState] = useState('');

  useEffect(() => {
    if (isUnlimited) {
      setState(`Unlimited capacity`);
    } else {
      if (space_available <= 0) {
        setState(`This event is at capacity`);
      } else if (space_available === 1) {
        setState(`Only 1 spot left`);
      } else {
        setState(`There are ${space_available} spots left`);
      }
    }
  }, [space_available]);

  return <>{state}</>;
};

export default EventSpacesLeft;
