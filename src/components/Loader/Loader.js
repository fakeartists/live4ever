import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import preloader from 'preloader';
import noop from 'no-op';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import './Loader.scss';

import animate, { Expo } from '../../util/gsap-animate';
import { setProgress, setReady } from '../../redux/modules/preloader';
import preloadAssets from '../../data/preload-assets';

class Loader extends React.PureComponent {
  async componentDidMount() {
    this.animateIn();

    await Promise.all([this.setTimer(), this.setLoader()]);
    this.setDone();
  }

  animateIn = () => {
    animate.to(this.bgpink, 0.5, {
      height: '100%',
      ease: Expo.easeInOut
    });
    animate.to(this.bggreen, 0.7, {
      height: '100%',
      ease: Expo.easeInOut
    });
    animate.to(this.bgblack, 1, {
      height: '100%',
      ease: Expo.easeInOut
    });
  };

  animateOut(onComplete) {
    this.container.style.backgroundColor = 'transparent';
    animate.to(this.bgblack, 0.5, {
      height: '0%',
      ease: Expo.easeInOut
    });
    animate.to(this.bggreen, 0.7, {
      height: '0%',
      ease: Expo.easeInOut
    });
    animate.to(this.container, 0, { autoAlpha: 0, delay: 1.1 });
    return animate.to(this.bgpink, 1, {
      height: '0%',
      ease: Expo.easeInOut,
      onComplete
    });
  }

  async setTimer() {
    return await wait(this.props.minDisplayTime);
  }

  setLoader() {
    return new Promise((resolve, reject) => {
      this.loader = preloader(this.props.options);
      this.props.assets.forEach(file => this.add(file));
      this.loader.on('progress', this.onProgress);
      this.loader.on('complete', () => this.onComplete(resolve));
      this.load();
    });
  }

  add(url, options = {}) {
    this.loader.add(url, options);
  }

  load() {
    this.loader.load();
  }

  onProgress = val => {
    this.props.setProgress(val);
  };

  onComplete = done => {
    this.props.setProgress(1);
    done();
  };

  setDone = async () => {
    this.props.setReady(true);
    document.body.style.overflow = 'auto';
    this.animateOut();
  };

  render() {
    return (
      <section className="Loader" ref={el => (this.container = el)}>
        <div className="loader-bg black" ref={el => (this.bgblack = el)}>
          <div className="loader-image" />
        </div>
        <div className="loader-bg green" ref={el => (this.bggreen = el)} />
        <div className="loader-bg pink" ref={el => (this.bgpink = el)} />
      </section>
    );
  }
}

Loader.propTypes = checkProps({
  className: PropTypes.string,
  assets: PropTypes.array.isRequired,
  setProgress: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  minDisplayTime: PropTypes.number,
  options: PropTypes.object,
  progress: PropTypes.number,
  transitionState: PropTypes.string
});

Loader.defaultProps = {
  className: '',
  assets: [],
  minDisplayTime: 300, // in milliseconds
  options: {
    xhrImages: false,
    loadFullAudio: false,
    loadFullVideo: false,
    onProgress: noop,
    onComplete: noop
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    progress: state.preloader.progress,
    assets: preloadAssets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProgress: val => dispatch(setProgress(val)),
    setReady: val => dispatch(setReady(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(Loader);
