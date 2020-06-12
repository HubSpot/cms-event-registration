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
  const { events_root, my_events_page } = __MODULE_DATA__.page_roots;
  ReactDOM.render(
    <BrowserRouter>
      <ScrollToTop />
      <AppProvider
        portalId={Number(dataset.portalId)}
        moduleData={__MODULE_DATA__}
      >
        <Switch>
          <Route
            exact
            path={new URL(my_events_page).pathname}
            component={RegisteredEventsPage}
          />
          <Route exact path={new URL(events_root).pathname} component={App} />
          <Route
            path={`${new URL(events_root).pathname}/:slug`}
            component={EventDetailPage}
          />
          <Route component={App} />
        </Switch>
      </AppProvider>
    </BrowserRouter>,
    root,
  );
});
