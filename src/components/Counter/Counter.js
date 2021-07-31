import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

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
    if (this.timer != null) {
      this.setState({ count: count });
    }
  };

  clearTimer() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const start = moment(new Date(this.props.endDate));
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

    let minutes = duration.minutes();
    if (minutes < 0) {
      minutes = '--';
    } else {
      minutes = minutes < 10 ? '0' + minutes : minutes;
    }

    let seconds = duration.seconds();
    if (seconds < 0) {
      seconds = '--';
    } else {
      seconds = seconds < 10 ? '0' + seconds : seconds;
    }

    if (days === '--' && hours === '--' && minutes === '--' && seconds === '--') {
      this.clearTimer();
    }

    const boxClass = this.props.isLanding ? '' : ' box';

    return (
      <div className={'Counter' + boxClass} ref={el => (this.container = el)}>
        <ul>
          <li className="counter-time">
            <p>{days}</p>
            <span>{this.props.copy.title_days}</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{hours}</p>
            <span>{this.props.copy.title_hours}</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{minutes}</p>
            <span>{this.props.copy.title_minutes}</span>
          </li>
          <li className="counter-dot">:</li>
          <li className="counter-time">
            <p>{seconds}</p>
            <span>{this.props.copy.title_seconds}</span>
          </li>
        </ul>
      </div>
    );
  }
}

Counter.propTypes = checkProps({
  copy: PropTypes.object,
  isLanding: PropTypes.bool,
  endDate: PropTypes.string
});

Counter.defaultProps = {
  copy: {},
  isLanding: true,
  endDate: 'July 30, 2021 11:13:00'
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
)(Counter);
