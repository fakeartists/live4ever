import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

import settings from '../../data/settings';
// import animate, { Power3 } from '../../util/gsap-animate';

import './Counter.scss';

class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateCount(this.state.count + 1);
    }, 1000);
  }

  updateCount = count => {
    this.setState({ count: count });
  };

  componentWillUnmount() {
    this.timer.clearInterval();
    this.timer = null;
  }

  render() {
    const start = moment(new Date(settings.startDate));
    const now = moment();
    const duration = moment.duration(start.diff(now));

    let days = duration.days();
    days = days < 10 ? '0' + days : days;

    let hours = duration.hours();
    hours = hours < 10 ? '0' + hours : hours;

    let minutes = duration.minutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let seconds = duration.seconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return (
      <div className="Counter" ref={el => (this.container = el)}>
        <ul>
          <li className="counter-time">
            <p>{days}</p>
            <span>Days</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{hours}</p>
            <span>Hours</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{minutes}</p>
            <span>Minutes</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{seconds}</p>
            <span>Seconds</span>
          </li>
        </ul>
      </div>
    );
  }
}

Counter.propTypes = checkProps({
  numAdsClosed: PropTypes.number
});

Counter.defaultProps = {};

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
)(Counter);
