import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './VideoControls.scss';

import { ReactComponent as PlayIcon } from './assets/play.svg';
import { ReactComponent as PauseIcon } from './assets/pause.svg';
import { ReactComponent as MutedIcon } from './assets/muted.svg';
import { ReactComponent as UnmutedIcon } from './assets/unmuted.svg';
import { ReactComponent as CaptionsOnIcon } from './assets/captions-on.svg';
import { ReactComponent as CaptionsOffIcon } from './assets/captions-off.svg';
import { ReactComponent as ExitFullscreenIcon } from './assets/exit-fullscreen.svg';
import { ReactComponent as EnterFullscreenIcon } from './assets/enter-fullscreen.svg';

import VideoTimeline from '../VideoTimeline/VideoTimeline';
import BaseButton from '../../BaseButton/BaseButton';

const VideoControls = React.memo(props => {
  function formatTime(totalSeconds) {
    const totalSecondsFloat = totalSeconds;
    let minutes = Math.floor(totalSecondsFloat / 60);
    let seconds = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  let playbutton = props.isPlaying ? <PauseIcon /> : <PlayIcon />;
  let soundbutton = props.isMuted ? <MutedIcon /> : <UnmutedIcon />;
  let captionButton = props.isShowingCaptions ? <CaptionsOnIcon /> : <CaptionsOffIcon />;
  let fullscreenButton = props.isFullScreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />;

  return (
    <nav className={classnames('VideoControls', props.className)} aria-label="Video Controls">
      <BaseButton
        className="VideoControls-button"
        aria-label={props.isPlaying ? 'Pause Video' : 'Play Video'}
        title={props.isPlaying ? 'Pause Video' : 'Play Video'}
        onClick={props.onPlayToggle}
      >
        {playbutton}
      </BaseButton>

      <VideoTimeline
        duration={props.duration}
        currentTime={Number(props.currentTime)}
        onTimeUpdate={props.onTimeUpdate}
      />

      <time className="VideoControls-time" tabIndex="0">
        {formatTime(Number(props.currentTime))}
      </time>

      {props.captions && (
        <BaseButton
          className="VideoControls-button"
          aria-label={props.isShowingCaptions ? 'Hide Captions' : 'Show Captions'}
          title={props.isShowingCaptions ? 'Hide Captions' : 'Show Captions'}
          onClick={props.onCaptionsToggle}
        >
          {captionButton}
        </BaseButton>
      )}

      <BaseButton
        className="VideoControls-button"
        aria-label={props.isMuted ? 'Unmute Video' : 'Mute Video'}
        title={props.isMuted ? 'Unmute Video' : 'Mute Video'}
        onClick={props.onMuteToggle}
      >
        {soundbutton}
      </BaseButton>

      <BaseButton
        className="VideoControls-button"
        aria-label={props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
        title={props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
        onClick={props.onFullscreenToggle}
      >
        {fullscreenButton}
      </BaseButton>
    </nav>
  );
});

VideoControls.propTypes = checkProps({
  className: PropTypes.string,
  captions: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  isShowingCaptions: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onPlayToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onFullscreenToggle: PropTypes.func,
  onCaptionsToggle: PropTypes.func,
  onTimeUpdate: PropTypes.func
});

VideoControls.defaultProps = {
  onPlayToggle: noop,
  onMuteToggle: noop,
  onFullscreenToggle: noop,
  onCaptionsToggle: noop,
  onTimeUpdate: noop
};

export default VideoControls;
