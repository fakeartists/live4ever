import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { warn } from '../../util/console';
import WebGLAPP from '../../webgl-app/webgl-app';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './WebGL.scss';

class WebGL extends React.PureComponent {
  static defaultProps = {};

  static getWebglApp() {
    return this.webglApp;
  }

  async componentDidMount() {
    const { path, history } = this.props;

    if (this.node) {
      this.webglApp = new WebGLAPP(history);
      this.webglApp
        .setup(this.node, true)
        .then(() => {
          this.webglApp.updateState({ path }, { path: '' });
        })
        .catch(error => {
          warn(error);
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { width, height, path } = this.props;
    if (this.webglApp) {
      if (width !== prevProps.width || height !== prevProps.height) {
        this.webglApp.resize(width, height);
      }
      this.webglApp.updateState({ path }, prevProps);
    }
  }

  render() {
    return (
      <section
        className={classnames(`WebGL`)}
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}

WebGL.propTypes = checkProps({
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string
});

WebGL.defaultProps = {
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
)(WebGL);
