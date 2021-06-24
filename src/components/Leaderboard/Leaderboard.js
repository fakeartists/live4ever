import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './Leaderboard.scss';

//temp
import leaderboardData from '../../data/leaderboard';

class Leaderboard extends React.PureComponent {
  async componentDidMount() {
    //const { path, history } = this.props;
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  convertTime = time => {
    const start = moment(time);
    const now = moment();
    const duration = moment.duration(now.diff(start));
    //duration.days() + 'd ' +
    return duration.hours() + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  };

  render() {
    return (
      <div className={classnames(`Leaderboard-content`)}>
        <table>
          <thead>
            <tr>
              <th>{leaderboardData.header.event}</th>
              <th>{leaderboardData.header.value}</th>
              <th>{leaderboardData.header.from}</th>
              <th>{leaderboardData.header.time}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.itens.map((item, index) => {
              return (
                <tr key={index} className="Leaderboard-item">
                  <td>{item.event}</td>
                  <td>{item.value}</td>
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
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string
});

Leaderboard.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  path: ''
};

const mapStateToProps = state => ({
  width: selectWindowWidth(state),
  height: selectWindowHeight(state),
  path: selectPath(state)
});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
