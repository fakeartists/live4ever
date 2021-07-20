import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Power3 } from '../../util/gsap-animate';
import settings from '../../data/settings';

import './MineNav.scss';

class MineNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.variation = null;
    this.bidvariation = 0;
    this.state = {
      bid: 0,
      count: 0
    };
  }

  componentDidMount() {
    animate.set(this.container, { y: -80, autoAlpha: 0 });

    const start = moment(new Date(this.props.data.ends));
    const now = moment();
    const duration = moment.duration(start.diff(now));

    let days = duration.days();
    if (days > 0) {
      this.timer = setInterval(() => {
        this.updateCount(this.state.count + 1);
      }, 100000);
    }

    this.variation = setInterval(() => {
      this.bidvariation = Math.random() * 5;
    }, 400000);
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.8, { y: 0, autoAlpha: 1, ease: Power3.easeOut });
  };

  animateOut = () => {
    return animate.to(this.container, 0.5, { y: -80, autoAlpha: 0, ease: Power3.easeOut });
  };

  updateCount = count => {
    let bidvar = parseFloat(settings.bidBase) + this.bidvariation;
    this.setState({ bid: count / bidvar });
  };

  render() {
    const start = moment(new Date(this.props.data.ends));
    const now = moment();
    const duration = moment.duration(start.diff(now));

    let days = duration.days();
    if (days < 0) {
      days = '--';
    } else {
      days = days < 10 ? '0' + days : days;
    }

    let hours = duration.hours();
    if (hours < 0) {
      hours = '--';
    } else {
      hours = hours < 10 ? '0' + hours : hours;
    }

    let highestbid = this.props.data.highestbid;
    if (this.state.bid > highestbid) highestbid = this.state.bid;

    return (
      <div className="MineNav" ref={el => (this.container = el)}>
        <div className="time-left-wrapper">
          <span className="label">{this.props.copy.title_time_left}</span>
          <span className="digits">{days}</span>
          <span className="label">{this.props.copy.title_days}</span>
          <span className="digits">{hours}</span>
          <span className="label">{this.props.copy.title_hours}</span>
        </div>
        <div className="rank-wrapper">
          <div className="rank-count">
            <span className="label">{this.props.copy.title_rank}</span>
            <span className="digits">0</span>
          </div>
          <div className="rank-bid">
            <span className="label">{this.props.copy.title_top_bid}</span>
            <span className="digits">{highestbid + ' ' + this.props.copy.piramid_ico}</span>
          </div>
        </div>
        <div className="your-bid-wrapper">
          <span className="label user">{this.props.copy.title_your_bid}</span>
          <span className="digits user">{this.state.bid}</span>
          <span className="delta user">{this.props.copy.piramid_ico}</span>
        </div>
      </div>
    );
  }
}

MineNav.propTypes = checkProps({
  copy: PropTypes.object,
  data: PropTypes.object
});

MineNav.defaultProps = {
  copy: {},
  data: {}
};

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
