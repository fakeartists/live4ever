import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkProps from '@jam3/react-check-extra-props';
import settings from '../../data/settings';
import { getUsers } from '../../data/get-site-data';
import { getBidWithVariation } from '../../util/bid';
import { getCookie } from '../../util/cookies';

import './Leaderboard.scss';

class Leaderboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.avatarPath = settings.avatarPath;
    this.maxUsers = 25;
    this.state = { leaderboard: [] };
  }

  async componentDidMount() {
    await this.updateLeaderboard();
  }

  componentDidUpdate(prevProps) {}

  getLeaderboard = () => {
    return this.state.leaderboard;
  };

  getRank = bid => {
    const cookiedata = getCookie();
    const id = cookiedata.login.id;
    const index = this.state.leaderboard.findIndex(x => x._id === id);
    return index + 1;
  };

  getHighest = () => {
    const highest = this.state.leaderboard.length > 0 ? this.state.leaderboard[0].bid : 0;
    return highest;
  };

  updateLeaderboard = async () => {
    this.users = await getUsers();
    const leaderboard = [];

    let count = 0;
    for (var idx in this.users) {
      if (this.users.hasOwnProperty(idx)) {
        leaderboard.push(this.users[idx]);
      }
      if (count >= this.maxUsers) break;
      count++;
    }

    leaderboard.sort((a, b) => {
      return a.bid > b.bid ? -1 : 1;
    });

    this.setState({
      leaderboard: leaderboard
    });
  };

  convertTime = time => {
    const start = moment(new Date(time));
    const now = moment();
    const duration = moment.duration(now.diff(start));
    return (
      Math.floor(duration.asDays()) +
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
    const cookiedata = getCookie();
    const variation = cookiedata && cookiedata.variation;

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
            {this.state.leaderboard.map((item, index) => {
              return (
                <tr key={index} className="Leaderboard-item">
                  <td>{getBidWithVariation(item.bid, variation) + ' ' + this.props.copy.piramid_ico}</td>
                  <td>
                    <img src={item.image || this.avatarPath + item._id} alt="bid user avatar" />
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
  mapDispatchToProps,
  null,
  { withRef: true }
)(Leaderboard);
