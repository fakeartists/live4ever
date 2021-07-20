import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

import './Leaderboard.scss';

//temp
import leaderboardData from '../../data/leaderboard';

class Leaderboard extends React.PureComponent {
  async componentDidMount() {}
  componentDidUpdate(prevProps) {}

  convertTime = time => {
    const start = moment(new Date(time));
    const now = moment();
    const duration = moment.duration(now.diff(start));
    return (
      duration.days() +
      'd ' +
      duration.hours() +
      'h ' +
      duration.minutes() +
      'm ' +
      duration.seconds() +
      's ' +
      this.props.copy.sufix_leaderboard_when
    );
  };

  render() {
    return (
      <div className={classnames(`Leaderboard-content`)}>
        <table>
          <thead>
            <tr>
              <th>{this.props.copy.title_leaderboard_bid}</th>
              <th>{this.props.copy.title_leaderboard_from}</th>
              <th>{this.props.copy.title_leaderboard_when}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item, index) => {
              return (
                <tr key={index} className="Leaderboard-item">
                  <td>{item.bid + ' ' + this.props.copy.piramid_ico}</td>
                  <td>
                    <img src={item.image} alt="bid user avatar" />
                    <p>{item.name}</p>
                  </td>
                  <td>{this.convertTime(item.time)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Leaderboard.propTypes = checkProps({
  copy: PropTypes.object
});

Leaderboard.defaultProps = {
  copy: {}
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
