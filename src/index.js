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

const root = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <AppProvider portalId={window.APP_CONFIG.portalId}>
      <Switch>
        <Route exact path={`/${window.APP_CONFIG.appRoot}`} component={App} />
        <Route
          path={`/${window.APP_CONFIG.appRoot}/:slug`}
          component={EventDetailPage}
        />
        <Route exact path="/my-events" component={RegisteredEventsPage} />
        <Route component={App} />
      </Switch>
    </AppProvider>
  </BrowserRouter>,
  root,
);
