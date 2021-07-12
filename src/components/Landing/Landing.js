import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight } from '../App/App-selectors';
import animate, { Expo } from '../../util/gsap-animate';

import Counter from '../Counter/Counter';

import './Landing.scss';

class Landing extends React.PureComponent {
  componentDidMount() {
    //animate.set(this.container, { x: '100%', autoAlpha: 0 });
  }

  animateIn = () => {
    animate.to(this.container, 0.8, { x: '0%', autoAlpha: 1, ease: Expo.easeOut });
  };

  animateOut = () => {
    animate.to(this.container, 0.1, { x: '0%', autoAlpha: 0, ease: Expo.easeOut });
  };

  render() {
    return (
      <section className={classnames('Landing', this.props.className)} ref={el => (this.container = el)}>
        <div className="landing-container">
          <h1>
            Digital life is about to change.
            <br />
            <b>Be the first to step into the future.</b>
          </h1>
          <Counter />
          <button className={'landing-button'}>HELL YEAH !</button>
        </div>
      </section>
    );
  }
}

Landing.propTypes = checkProps({
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
});

Landing.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};

const mapStateToProps = state => ({
  width: selectWindowWidth(state),
  height: selectWindowHeight(state)
});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
