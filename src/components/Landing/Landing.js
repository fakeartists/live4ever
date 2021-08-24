import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight } from '../App/App-selectors';
import animate, { Expo } from '../../util/gsap-animate';
import Counter from '../Counter/Counter';
import BaseLink from '../BaseLink/BaseLink';

import settings from '../../data/settings';
import { getCopy } from '../../data/get-site-data';

import './Landing.scss';

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'landing');
  }

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
            <span>{this.copy.title}</span>
            <br />
            <span>
              <b>{this.copy.sub_title}</b>
            </span>
          </h1>
          <Counter endDate={settings.startDate} isLanding={true} copy={this.copy} />
          <BaseLink className="landing-button" link={settings.subscribelink}>
            {this.copy.button}
          </BaseLink>
        </div>
      </section>
    );
  }
}

Landing.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
});

Landing.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  language: 'en'
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
