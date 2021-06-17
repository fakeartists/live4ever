import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './Leaderboard.scss';

class Leaderboard extends React.PureComponent {
  async componentDidMount() {
    //const { path, history } = this.props;
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  render() {
    return <div className={classnames(`Leaderboard-content`)} />;
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
