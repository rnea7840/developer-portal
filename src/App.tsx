import * as React from 'react';

import classNames from 'classnames';
import { Route, Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applyPolyfills, defineCustomElements } from 'web-components/loader';
import { SetAPIs, setApis } from './actions';
import { APIDescription } from './apiDefs/schema';
import { Footer, Header, PageContent } from './components';
import { FlagsProvider, getFlags } from './flags';
import { history } from './store';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/atom-one-dark-reasonable-overrides.scss';
import './styles/base.scss';

// Apply Polyfills for IE11 for custom web-components
void applyPolyfills().then(() => {
  void defineCustomElements();
  return null;
});

/**
 * the double flex container only exists and is flexed to
 * address a bug in IE11 where min-height is only respected
 * if the parent of a flex container is also a flex container.
 */
const App = (): JSX.Element => {
  const dispatch: React.Dispatch<SetAPIs> = useDispatch();
  const apisRequest = (): Promise<APIDescription[]> =>
    fetch('http://localhost:8080/platform-backend/v0/providers')
      .then(res => res.json())
      .then(res => res as APIDescription[])
      .then(apis => dispatch(setApis(apis)))
      .then(() => [] as APIDescription[]);

  apisRequest();

  return (
    <FlagsProvider flags={getFlags()}>
      <Router history={history}>
        <div className="vads-u-display--flex">
          <div
            className={classNames(
              'vads-u-display--flex',
              'vads-u-flex-direction--column',
              'vads-u-min-height--viewport',
              'vads-u-width--full',
            )}
          >
            <Header />
            <Route path="/" component={PageContent} />
            <Footer />
          </div>
        </div>
      </Router>
    </FlagsProvider>
  );
};

export default App;
