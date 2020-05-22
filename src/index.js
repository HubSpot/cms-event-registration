import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import App from './App';
import EventDetailPage from './EventDetailPage';
import RegisteredEventsPage from './RegisteredEventsPage';
import { AppProvider } from './AppContext';
import './scss/index.scss';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const preRenderedDataNodes = document.querySelectorAll(
  '.event-registration > script[type="application/json"]',
);

preRenderedDataNodes.forEach(({ dataset, textContent }) => {
  const root = document.getElementById(
    `event-registration__module--${dataset.moduleInstance}`,
  );
  const __MODULE_DATA__ = JSON.parse(textContent);
  ReactDOM.render(
    <BrowserRouter>
      <ScrollToTop />
      <AppProvider
        portalId={Number(dataset.portalId)}
        moduleData={__MODULE_DATA__}
      >
        <Switch>
          <Route exact path="/events" component={App} />
          <Route path="/events/:slug" component={EventDetailPage} />
          <Route exact path="/my-events" component={RegisteredEventsPage} />
          <Route component={App} />
        </Switch>
      </AppProvider>
    </BrowserRouter>,
    root,
  );
});
