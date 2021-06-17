import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import Gallery from '../Gallery/Gallery';
import ADBanner from '../../components/AdBanner/AdBanner';
import BoxInfo from '../../components/BoxInfo/BoxInfo';

import './Home.scss';

import Transition from '../PagesTransitionWrapper';
import { setHomeLoaded } from '../../redux/modules/home';
import animate from '../../util/gsap-animate';

class Home extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setHomeLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
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
