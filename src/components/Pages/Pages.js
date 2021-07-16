import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Pages.scss';

import routeKeys from '../../routes/keys';
import { getTransitionDuration } from '../../data/pages-transitions';

const Home = lazy(() => import('../../pages/Home/Home'));
const Gallery = lazy(() => import('../../pages/Gallery/Gallery'));
const About = lazy(() => import('../../pages/About/About'));
const Asset = lazy(() => import('../../pages/Asset/Asset'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound')).default;

const Pages = ({ location, ...props }) => {
  return (
    <main className={classnames('Pages', props.className)} role="main">
      <TransitionGroup component={Fragment}>
        <Transition appear key={location.pathname} timeout={getTransitionDuration(location.pathname)}>
          {state => (
            <Suspense fallback={<div className="loading" />}>
              <Switch location={location}>
                <Route
                  exact
                  path={routeKeys.Home}
                  render={() => <Home transitionState={state} language={props.language} />}
                />
                <Route
                  exact
                  path={routeKeys.Gallery}
                  render={() => <Gallery transitionState={state} language={props.language} />}
                />
                <Route
                  exact
                  path={routeKeys.About}
                  render={() => <About transitionState={state} language={props.language} />}
                />
                <Route
                  exact
                  path={`${routeKeys.Asset}/:assetId`}
                  render={props => <Asset transitionState={state} language={props.language} {...props} />}
                />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          )}
        </Transition>
      </TransitionGroup>
    </main>
  );
};

Pages.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string
});

Pages.defaultProps = { language: 'en' };

export default withRouter(Pages);
