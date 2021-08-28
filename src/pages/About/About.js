import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Transition from '../PagesTransitionWrapper';
import animate, { Expo } from '../../util/gsap-animate';
import { getCopy } from '../../data/get-site-data';

import './About.scss';

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'about');
  }

  componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });
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
    return (
      <section className={classnames('About', this.props.className)} ref={el => (this.container = el)}>
        <h1>{this.copy.title}</h1>
        {this.copy.text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
        <div className="contact">
          <h1>{this.copy.contact.title}</h1>
          {this.copy.contact.text.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
        <div className="disclaimer">
          <h1>{this.copy.disclaimer.title}</h1>
          <p>{this.copy.disclaimer.text}</p>
        </div>
      </section>
    );
  }
}

About.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

About.defaultProps = {
  language: 'en'
};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(About));
