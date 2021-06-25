import React, { Fragment, lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
//import { Transition } from 'react-transition-group';
import MainNav from '../../components/MainNav/MainNav';
import Footer from '../../components/Footer/Footer';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import PageOverlay from '../../components/PageOverlay/PageOverlay';
import { device } from '@jam3/detect';
import checkProps from '@jam3/react-check-extra-props';
import 'default-passive-events';

import Pages from '../../components/Pages/Pages';
import Loader from '../../components/Loader/Loader';
// import WebGL from '../WebGL/WebGL';

import { ReactComponent as LinesBG } from '../../assets/svg/lines-bg.svg';

import { setPreviousRoute, setWindowSize, setLayout, batchActions } from '../../redux/modules/app';
import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

import settings from '../../data/settings';
import mainNavData from '../../data/main-nav';
import hamburgerNavData from '../../data/hamburger-menu';
import footerData from '../../data/footer';
import rotateScreenData from '../../data/rotate-screen';
import layout from '../../util/layout';

import Mine from '../../components/Mine/Mine';

const LazyRotateScreen = device.isMobile && lazy(() => import('../../components/RotateScreen/RotateScreen'));

class App extends React.PureComponent {
  componentDidMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.setPreviousRoute(prevProps.location.pathname);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.props.setLayout(window.innerWidth, window.innerHeight, layout.all);
  }, settings.resizeDebounceTime);

  render() {
    return (
      <Fragment>
        <LinesBG className="lines-bg" />
        <LinesBG className="lines-bg-inv" />
        {/* {this.props.ready && <WebGL history={this.props.history} />} */}
        {this.props.ready && (
          <Fragment>
            <MainNav
              {...mainNavData}
              showHamburger={!this.props.layout.large}
              isMobileMenuOpen={this.props.isMobileMenuOpen}
              setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
            />
            {!this.props.layout.large && (
              <Fragment>
                <PageOverlay
                  isShowing={this.props.isMobileMenuOpen}
                  onClick={() => this.props.setIsMobileMenuOpen(false)}
                />
                <HamburgerMenu
                  {...hamburgerNavData}
                  isMobileMenuOpen={this.props.isMobileMenuOpen}
                  setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
                />
              </Fragment>
            )}
            <Pages />
            <Footer {...footerData} />
            <Mine />
          </Fragment>
        )}
        {device.isMobile && (
          <Suspense fallback={<div className="loading" />}>
            <LazyRotateScreen {...rotateScreenData} />
          </Suspense>
        )}
        <Loader minDisplayTime={1500} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.layout,
    ready: state.preloader.ready,
    isMobileMenuOpen: state.isMobileMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPreviousRoute: val => dispatch(setPreviousRoute(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)])),
    setIsMobileMenuOpen: val => dispatch(setIsMobileMenuOpen(val))
  };
};

App.propTypes = checkProps({
  layout: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  setPreviousRoute: PropTypes.func.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired,
  setLayout: PropTypes.func.isRequired
});

App.defaultProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
