import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

import './MineNav.scss';

class MineNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      //numBannersClosed: 0
    };
  }

  render() {
    return (
      <div className="score-wrapper">
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
          <span className="digits">{this.props.numBannersClosed}</span>
          <span className="delta">Δ</span>
        </div>
      </div>
    );
  }
}

MineNav.propTypes = checkProps({
  numBannersClosed: PropTypes.number
});

MineNav.defaultProps = {};

const mapStateToProps = state => ({});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MineNav);
