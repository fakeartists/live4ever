import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';
import WindowsHeader from '../WindowsHeader/WindowsHeader';
import { setOnboardingState } from '../../redux/modules/mine';
import { getCopy } from '../../data/get-site-data';
import { updateCookie } from '../../util/cookies';

import './Onboarding.scss';

class Onboarding extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'onboarding');
    this.isOpen = false;
    this.box = null;

    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    this.props.setOnboardingState(this.props.isOpen);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
        this.animateIn();
        this.isOpen = true;
      }
    } else {
      if (this.isOpen) {
        this.animateOut();
        this.isOpen = false;
      }
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.3, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
  };

  animateOut = () => {
    animate.to(this.container, 0.5, { autoAlpha: 0, ease: Circ.easeOut });
  };

  handleAction = () => {
    if (this.state.page === 0) {
      this.setState({ page: 1 });
    } else {
      updateCookie({ onboarding: true });
      this.props.setOnboardingState(false);
    }
  };

  render() {
    let title;
    let button;
    if (this.state.page === 0) {
      title = this.copy.text_intro;
      button = this.copy.button_intro;
    } else {
      title = this.copy.text_start;
      button = this.copy.button_start;
    }

    return (
      <div className="Onboarding" ref={el => (this.container = el)}>
        <div className="onboarding-message">
          <WindowsHeader isActive={false} />
          <h1>{this.copy.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: title }} />
          <button className="action-button" onClick={this.handleAction}>
            {button}
          </button>
        </div>
      </div>
    );
  }
}

Onboarding.propTypes = checkProps({
  language: PropTypes.string,
  setOnboardingState: PropTypes.func,
  isOpen: PropTypes.bool
});

Onboarding.defaultProps = {
  language: 'en',
  isOpen: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.mineState.onboarding
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOnboardingState: val => dispatch(setOnboardingState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Onboarding);
