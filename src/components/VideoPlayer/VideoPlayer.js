import React from 'react';
import PropTypes from 'prop-types';
import BackgroundVideo from 'react-background-video-player';
import fullScreen from 'fullscreen-handler';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';
import animate, { Circ } from '../../util/gsap-animate';
import VideoControls from './VideoControls/VideoControls';

import { ReactComponent as PlayIcon } from './VideoControls/assets/play.svg';

import './VideoPlayer.scss';

export default class VideoPlayer extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.windowWidth !== prevState.containerWidth || nextProps.windowHeight !== prevState.containerHeight) {
      return {
        containerWidth: nextProps.windowWidth,
        containerHeight: nextProps.windowHeight
      };
    }

    if (nextProps.startTime !== prevState.startTime) {
      return { startTime: nextProps.startTime };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      containerWidth: props.windowWidth || 0,
      containerHeight: props.windowHeight || 0,
      isPlaying: false,
      isMuted: props.muted,
      isFullScreen: false,
      isShowingControls: props.showControlsOnLoad,
      isShowingCaptions: props.captions && props.captions.default,
      currentCaptions: '',
      currentTime: 0,
      progress: 0,
      duration: 0,
      startTime: props.startTime,
      firstPlay: false
    };
  }

  componentDidMount() {
    this.fullScreen = fullScreen(this.container, this.onEnterFullScreen, this.onExitFullScreen);
    this.controls = this.container.querySelector('.VideoControls');

    if (this.props.hasControls) {
      this.props.showControlsOnLoad ? this.setHideControlsTimeout() : this.hideControls(0);
    }

    if (this.props.autoPlay) {
      this.autoPlayTimeout = setTimeout(() => {
        this.play();
        this.clearAutoPlayTimeout();
      }, this.props.autoPlayDelay * 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        this.props.onPlay();
        this.props.hasControls && this.setHideControlsTimeout();
      } else {
        this.props.onPause();
        if (this.props.hasControls) {
          this.clearHideControlsTimeout();
          this.showControls();
        }
      }
    }

    if (this.props.captions && prevProps.captions.src !== this.props.captions.src) {
      this.setCaptions(this.props.captions);
    }
  }

  componentWillUnmount() {
    this.fullScreen.destroy();
    this.pause();
    this.clearAutoPlayTimeout();
    this.props.hasControls && this.clearHideControlsTimeout();
    this.captions && this.captions.removeEventListener('cuechange', this.onTrackChange);
  }

  open = () => {
    this.container.style.display = 'block';
    animate.to(this.container, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
  };

  close = () => {
    animate.to(this.container, 0.3, { autoAlpha: 0, ease: Circ.easeOut }).then(() => {
      this.container.style.display = 'none';
    });
  };

  showControls = () => {
    this.setState({ isShowingControls: true });
  };

  hideControls = () => {
    this.setState({ isShowingControls: false });
  };

  play = () => {
    !this.state.isPlaying && this.video.play();
  };

  pause = () => {
    this.state.isPlaying && this.video.pause();
  };

  mute = () => {
    !this.state.isMuted && this.video.mute();
  };

  unmute = () => {
    this.state.isMuted && this.video.unmute();
  };

  togglePlay = () => {
    this.video.togglePlay();
  };

  toggleMute = () => {
    this.video.toggleMute();
  };

  toggleFullscreen = () => {
    this.state.isFullScreen ? this.fullScreen.exit() : this.fullScreen.enter();
  };

  toggleCaptions = () => {
    this.setState({ isShowingCaptions: !this.state.isShowingCaptions });
  };

  setCaptions = (captions = this.props.captions) => {
    const video = this.video.video;
    if (video.contains(this.captions)) {
      video.removeChild(this.captions);
      this.captions.removeEventListener('cuechange', this.onTrackChange);
    }

    const track = document.createElement('track');
    track.kind = captions.kind;
    track.label = captions.label;
    track.srclang = captions.srclang;
    track.default = captions.default;
    track.src = captions.src;
    track.mode = 'hidden';

    this.captions = track;
    video.appendChild(this.captions);
    video.textTracks[0].mode = 'hidden';

    this.captions.addEventListener('cuechange', this.onTrackChange);
  };

  clearHideControlsTimeout = () => {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = undefined;
    }
  };

  clearAutoPlayTimeout = () => {
    this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout);
  };

  setHideControlsTimeout = () => {
    this.clearHideControlsTimeout();
    this.hideControlsTimeout = setTimeout(() => {
      this.state.isPlaying && this.hideControls();
    }, this.props.controlsTimeout * 1000);
  };

  updateTime = currentTime => {
    this.video.setCurrentTime(Number(currentTime));
  };

  onReady = duration => {
    if (this.props.captions) {
      this.props.captions.src && this.setCaptions();
    }
    this.setState({ duration });
  };

  onTrackChange = () => {
    const trackList = this.video.video.textTracks;
    const textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
    let cue = textTracks && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
    let text = cue ? cue.text : '';
    this.setState({ currentCaptions: text });
  };

  onFirstPlayClick = () => {
    this.play();
    this.setState({ firstPlay: true });
  };

  onResize = newSize => {
    this.setState(newSize);
  };

  onEnterFullScreen = () => {
    this.setState({ isFullScreen: true });
  };

  onExitFullScreen = () => {
    this.setState({ isFullScreen: false });
  };

  onPlay = () => {
    this.setState({ isPlaying: true });
  };

  onPause = () => {
    this.setState({ isPlaying: false });
  };

  onTimeUpdate = (currentTime, progress, duration) => {
    this.setState({ currentTime, progress, duration });
  };

  onMute = () => {
    this.setState({ isMuted: true });
  };

  onUnmute = () => {
    this.setState({ isMuted: false });
  };

  onEnd = () => {
    this.props.onEnd();
    this.fullScreen.isFullScreen() && this.fullScreen.exit();

    this.close();
  };

  onMouseMove = () => {
    if (this.state.isPlaying && this.props.hasControls) {
      this.showControls();
      this.setHideControlsTimeout();
    }
  };

  onMouseOut = () => {
    this.setHideControlsTimeout();
  };

  onKeyPress = e => {
    if (this.props.allowKeyboardControl) {
      const event = e.keyCode || e.which || e.charCode;
      if (event === 32) {
        this.togglePlay();
      }
    }
  };

  onSkip = () => {
    this.pause();
    this.mute();
    this.onEnd();
  };

  render() {
    let skip;
    if (this.props.haSkip) {
      skip = (
        <button className="button_skip" onClick={this.onSkip}>
          Skip
        </button>
      );
    }

    return (
      <div
        className={classnames('VideoPlayer', this.props.className, {
          'show-controls': this.state.isShowingControls,
          'show-captions': this.state.isShowingCaptions
        })}
        style={this.props.style}
        onMouseOut={this.onMouseOut}
        ref={r => (this.container = r)}
      >
        <BackgroundVideo
          ref={r => (this.video = r)}
          src={this.props.src}
          containerWidth={this.state.containerWidth}
          containerHeight={this.state.containerHeight}
          autoPlay={this.props.autoPlay}
          poster={this.props.poster}
          muted={this.props.muted}
          loop={this.props.loop}
          disableBackgroundCover={this.props.disableBackgroundCover}
          preload={this.props.preload}
          playsInline={this.props.playsInline}
          volume={this.props.volume}
          startTime={this.state.startTime}
          onReady={this.onReady}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onTimeUpdate={this.onTimeUpdate}
          onMute={this.onMute}
          onUnmute={this.onUnmute}
          onEnd={this.onEnd}
          extraVideoElementProps={{ type: 'video/mp4', crossorigin: 'anonymous' }}
          onClick={this.props.togglePlayOnClick ? this.togglePlay : f => f}
          onKeyPress={this.onKeyPress}
          className="bg-video"
        />
        {this.props.captions && (
          <div className="VideoPlayer-captions-container" ref={r => (this.captionsContainer = r)}>
            {this.state.currentCaptions && <p>{this.state.currentCaptions}</p>}
          </div>
        )}
        <div className="VideoPlayer-controls-container" onMouseMove={this.onMouseMove} />
        {this.props.hasControls && (
          <VideoControls
            captions={Boolean(this.props.captions)}
            currentTime={Number(this.state.currentTime)}
            isPlaying={this.state.isPlaying}
            isMuted={this.state.isMuted}
            isFullScreen={this.state.isFullScreen}
            isShowingCaptions={this.state.isShowingCaptions}
            duration={this.state.duration}
            onPlayToggle={this.togglePlay}
            onMuteToggle={this.toggleMute}
            onFullscreenToggle={this.toggleFullscreen}
            onCaptionsToggle={this.toggleCaptions}
            onTimeUpdate={this.updateTime}
          />
        )}
        {!this.state.firstPlay && this.props.showFirstPlayOverlay && !this.props.autoPlay && (
          <div className="VideoPlayer-ini-play" onClick={this.onFirstPlayClick}>
            <PlayIcon />
          </div>
        )}
        {skip}
      </div>
    );
  }
}

VideoPlayer.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  preload: PropTypes.string,
  captions: PropTypes.object,
  disableBackgroundCover: PropTypes.bool,
  allowKeyboardControl: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  togglePlayOnClick: PropTypes.bool,
  showControlsOnLoad: PropTypes.bool,
  hasControls: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlayDelay: PropTypes.number,
  controlsTimeout: PropTypes.number,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  volume: PropTypes.number,
  startTime: PropTypes.number,
  haSkip: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
  showFirstPlayOverlay: PropTypes.bool
});

VideoPlayer.defaultProps = {
  style: {},
  togglePlayOnClick: true,
  allowKeyboardControl: true,
  autoPlay: false,
  autoPlayDelay: 0, // in seconds
  muted: false,
  loop: false,
  hasControls: true,
  controlsTimeout: 2.5, // in seconds
  showControlsOnLoad: true,
  disableBackgroundCover: true,
  preload: 'auto',
  playsInline: true,
  volume: 1,
  startTime: 0, // in seconds
  haSkip: false,
  onPlay: noop,
  onPause: noop,
  onEnd: noop,
  showFirstPlayOverlay: true
};
