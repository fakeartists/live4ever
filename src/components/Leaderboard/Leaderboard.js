import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkProps from '@jam3/react-check-extra-props';
import settings from '../../data/settings';
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

  updateLeaderboard = (leaderboard = []) => {
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
    const user_id = cookiedata.login && cookiedata.login.id;

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
              const userCLass = user_id === item._id ? ' user' : '';
              const name = user_id === item._id ? 'You (' + item.name + ')' : item.name;
              return (
                <tr key={index} className={'Leaderboard-item' + userCLass}>
                  <td>{getBidWithVariation(item.bid, variation) + ' ' + this.props.copy.piramid_ico}</td>
                  <td>
                    <img src={item.image || this.avatarPath + item._id} alt={this.props.copy.image_alt} />
                  </td>
                  <td>{name}</td>
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
