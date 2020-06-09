import React from 'react';
import { Link } from 'react-router-dom';
//This component will only render in the HubSpot page editor.

const ErrorPageEditor = ({ events, portalId, tableId }) => {
  function renderErrors() {
    if (
      events &&
      events.find(e => e.name === '' || e.path === '') &&
      window.hsInEditor
    ) {
      return (
        <>
          <h1>
            Warning: Event with ID{' '}
            {events.find(e => e.name === '' || e.path === '').id} in the HubDb
            table is missing a page title or page path.
          </h1>
          <h2>
            To fix this,{' '}
            <Link to={`//app.hubspot.com/hubdb/${portalId}/table/${tableId}`}>
              edit the Events HubDB table
            </Link>
          </h2>
        </>
      );
    }
  }

  return <div> {renderErrors()} </div>;
};

export default ErrorPageEditor;
