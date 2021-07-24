import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Gallery from '../Gallery/Gallery';
import ADBanner from '../../components/AdBanner/AdBanner';
import BoxInfo from '../../components/BoxInfo/BoxInfo';
import Transition from '../PagesTransitionWrapper';
import { setHomeLoaded } from '../../redux/modules/home';
import animate, { Expo } from '../../util/gsap-animate';
import { getCopy } from '../../data/get-site-data';
import { getData } from '../../data/get-site-data';

import './Home.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { assets: [] };
    this.copy = getCopy(this.props.language, 'home');
    this.boxcopy = getCopy(this.props.language, 'boxinfo');
  }

  async componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });

    if (!this.props.loaded) {
      const assets = await getData();
      this.setState({
        assets: assets
      });
      this.props.setHomeLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
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
    const hotsale = this.state.assets.filter(item => item.hot_sale)[0];
    return (
      <section className={classnames('Home', this.props.className)} ref={el => (this.container = el)}>
        <header className="Home-header">
          <div className="home-header-wrapper">
            <div className="home-header-container home-box left">
              <h1>{this.copy.title_horsale}</h1>
              <BoxInfo copy={this.boxcopy} data={hotsale} />
            </div>
            <div className="home-header-container  right">
              <div className="home-box small">
                <ADBanner />
              </div>
              <div className="home-box small">
                <ADBanner />
              </div>
            </div>
          </div>
        </header>
        <Gallery
          className="Home-galery"
          transitionState={this.props.transitionState}
          isHome={true}
          assetdata={this.state.assets}
          language={this.props.language}
        />
      </section>
    );
  }
}

Home.propTypes = checkProps({
  language: PropTypes.string.isRequired,
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setHomeLoaded: PropTypes.func
});

Home.defaultProps = {
  language: 'en'
};

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
