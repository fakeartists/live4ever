import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkProps from '@jam3/react-check-extra-props';
import { getUsers } from '../../data/get-site-data';

import './Leaderboard.scss';

class Leaderboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { leaderboard: [] };
  }

  async componentDidMount() {
    this.users = await getUsers();
    const leaderboard = [];
    for (var idx in this.users) {
      if (this.users.hasOwnProperty(idx)) {
        leaderboard.push(this.users[idx]);
      }
    }

    this.setState({
      leaderboard: leaderboard
    });
  }

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
            {this.state.leaderboard.map((item, index) => {
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
