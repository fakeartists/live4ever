import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'default-passive-events';
import checkProps from '@jam3/react-check-extra-props';
import { device, os } from '@jam3/detect';

import './RotateScreen.scss';
import { getCopy } from '../../data/get-site-data';

export default class RotateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: device.getOrientation()
    };

    this.copy = getCopy(this.props.language, 'rotate');
  }

  componentDidMount() {
    this.setOrientationParentClass();

    if (os.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.addEventListener('resize', this.handleOrientationChange);
    }

    this.container.addEventListener('touchmove', this.preventScrolling, { passive: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.orientation !== prevState.orientation) {
      this.setOrientationParentClass();
    }
  }

  componentWillUnmount() {
    if (os.isAndroid) {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.removeEventListener('resize', this.handleOrientationChange);
    }
    this.container.removeEventListener('touchmove', this.preventScrolling);
  }

  preventScrolling = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  setOrientationParentClass = (orientation = this.state.orientation) => {
    orientation === 'landscape'
      ? document.body.classList.add('rotate-screen-visible')
      : document.body.classList.remove('rotate-screen-visible');
  };

  handleOrientationChange = () => {
    if (device.getOrientation() !== this.state.orientation) {
      this.setState({ orientation: device.getOrientation() });
    }
  };

  render() {
    const visible = this.state.orientation === 'landscape';
    const style = {
      visibility: visible ? 'visible' : 'hidden'
    };

    return (
      <div className={classnames('RotateScreen', this.props.className)} style={style} ref={r => (this.container = r)}>
        <div className="container">
          {<img src={this.props.iconSrc} className="rotate-icon" alt={this.copy.iconAlt} />}
          {<p className="rotate-text">{this.copy.text}</p>}
          {this.props.children}
        </div>
      </div>
    );
  }
}

RotateScreen.propTypes = checkProps({
  language: PropTypes.string,
  iconSrc: PropTypes.string
});

RotateScreen.defaultProps = {
  language: 'en'
};
