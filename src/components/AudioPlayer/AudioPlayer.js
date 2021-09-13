import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

import './AudioPlayer.scss';

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.audio = null;
  }

  componentDidMount() {}

  render() {
    return <audio className={'audio'} src="" ref={el => (this.audio = el)} />;
  }
}

AudioPlayer.propTypes = checkProps({
  copy: PropTypes.object
});

AudioPlayer.defaultProps = {
  copy: {}
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
)(AudioPlayer);
