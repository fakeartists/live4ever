import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
//import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import Gallery from '../Gallery/Gallery';
import ADBanner from '../../components/AdBanner/AdBanner';
import BoxInfo from '../../components/BoxInfo/BoxInfo';

import './Home.scss';

import Transition from '../PagesTransitionWrapper';
import { setHomeLoaded } from '../../redux/modules/home';
import animate, { Expo } from '../../util/gsap-animate';

class Home extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });

    if (!this.props.loaded) {
      this.props.setHomeLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    //await wait(prevSectionExitDuration);
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.8, { x: '0%', autoAlpha: 1, ease: Expo.easeOut });
  };

  animateOut = () => {
    animate.to(this.container, 0.1, { x: '0%', autoAlpha: 0, ease: Expo.easeOut });
  };

  render() {
    return (
      <section className={classnames('Home', this.props.className)} ref={el => (this.container = el)}>
        <header className="Home-header">
          <div className="home-header-wrapper">
            <div className="home-header-box big">
              <h1>Hot Sale</h1>
              <BoxInfo />
            </div>
            <div className="home-header-box small-top">
              <ADBanner />
            </div>
            <div className="home-header-box small-bottom">
              <ADBanner />
            </div>
          </div>
        </header>
        <Gallery className="Home-galery" transitionState={this.props.transitionState} isHome={true} />
      </section>
    );
  }
}

Home.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setHomeLoaded: PropTypes.func
});

Home.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.homeLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHomeLoaded: val => dispatch(setHomeLoaded(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Home));
