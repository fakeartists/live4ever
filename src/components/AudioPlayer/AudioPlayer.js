import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import audio from '../../data/audio';

import './AudioPlayer.scss';

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.audio = null;
    this.src = audio.click_0;
  }

  componentDidMount() {}

  play = (src = 'click', volume = 0.4) => {
    if (this.audio) {
      switch (src) {
        case 'click':
          let click = Math.floor(Math.random() * 3);
          click = click < 0 ? 0 : click;
          click = click > 2 ? 2 : click;
          this.src = audio['click_' + click];
          break;
        case 'level':
          this.src = audio.level_up;
          break;
        case 'open':
          this.src = audio.open;
          break;
        default:
          this.src = audio.click_0;
      }

      this.stop();
      this.audio.src = this.src;
      this.audio.volume = volume;
      this.audio.play();
    }
  };

  stop = () => {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  };

  pause = () => {
    if (this.audio) {
      this.audio.pause();
    }
  };

  render() {
    return <audio className={'audio'} src={this.src} ref={el => (this.audio = el)} loop={false} autoPlay={false} />;
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
