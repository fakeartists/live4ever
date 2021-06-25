import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Power3 } from '../../util/gsap-animate';

import './MineNav.scss';

class MineNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numAdsClosed: 0
    };
  }

  componentDidMount() {
    animate.set(this.container, { y: -80, autoAlpha: 0 });
  }

  animateIn = () => {
    animate.to(this.container, 0.8, { y: 0, autoAlpha: 1, ease: Power3.easeOut });
  };

  animateOut = () => {
    return animate.to(this.container, 0.5, { y: -80, autoAlpha: 0, ease: Power3.easeOut });
  };

  updateCount = count => {
    this.setState({ numAdsClosed: count });
  };

  render() {
    return (
      <div className="MineNav" ref={el => (this.container = el)}>
        <div className="time-left-wrapper">
          <span>Time left</span>
          <span className="digits">0</span>
          <span>Days</span>
          <span className="digits">0</span>
          <span>Hours</span>
        </div>
        <div className="rank-wrapper">
          <span>Rank</span>
          <span className="digits">0</span>
        </div>
        <div className="your-bid-wrapper">
          <span>Your bid</span>
          <span className="digits">{this.state.numAdsClosed}</span>
          <span className="delta">Δ</span>
        </div>
      </div>
    );
  }
}

MineNav.propTypes = checkProps({
  numAdsClosed: PropTypes.number
});

MineNav.defaultProps = {};

const mapStateToProps = state => ({});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(MineNav);
