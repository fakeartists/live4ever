import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkProps from '@jam3/react-check-extra-props';
import settings from '../../data/settings';
import { getUsers, getLeaderboard } from '../../data/get-site-data';
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
    // await this.updateLeaderboard();
  }

  componentDidUpdate(prevProps) {}

  async getLeaderboard(update = false, status = '', user = '') {
    if (update) {
      await this.updateLeaderboard(status, user);
    }
    return this.state.leaderboard;
  }

  getRank = (bid = null) => {
    const cookiedata = getCookie();
    const id = cookiedata.login.id;
    let index = this.state.leaderboard.findIndex(x => x._id === id);

    if (bid != null) {
      for (let i = index; i >= 0; i--) {
        const value = this.state.leaderboard[i].bid;
        if (bid >= value) {
          index = i;
        } else {
          break;
        }
      }
    }
    return index + 1;
  };

  getHighest = () => {
    const highest = this.state.leaderboard.length > 0 ? this.state.leaderboard[0].bid : 0;
    return highest;
  };

  updateLeaderboard = async (status = '', user = '') => {
    let leaderboard = [];
    if (status === 'open') {
      this.users = await getUsers();

      //let count = 0;
      for (var idx in this.users) {
        if (this.users.hasOwnProperty(idx)) {
          leaderboard.push(this.users[idx]);
        }
        // if (count >= this.maxUsers) break;
        // count++;
      }
    } else {
      leaderboard = await getLeaderboard(user);
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
              <th />
              <th>{this.props.copy.title_leaderboard_when}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaderboard.slice(0, this.maxUsers).map((item, index) => {
              return (
                <tr key={index} className="Leaderboard-item">
                  <td>{getBidWithVariation(item.bid, variation) + ' ' + this.props.copy.piramid_ico}</td>
                  <td>
                    <img src={item.image || this.avatarPath + item._id} alt={this.props.copy.image_alt} />
                  </td>
                  <td>{item.name}</td>
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
