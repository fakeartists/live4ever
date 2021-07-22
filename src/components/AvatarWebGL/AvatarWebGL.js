import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { warn } from '../../util/console';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

//import webgl app
// import WebGLAPP from '../../xxx/xxx';

import './AvatarWebGL.scss';

class AvatarWebGL extends React.PureComponent {
  static defaultProps = {};

  //get webgl instance
  // static getWebglApp() {
  //   return this.webglApp;
  // }

  async componentDidMount() {
    //init the webgl app
    // const { path, history } = this.props;
    // if (this.node) {
    //   this.webglApp = new WebGLAPP();
    // }
  }

  componentDidUpdate(prevProps) {
    //update the webgl app
    //const { width, height, path } = this.props;
    // if (this.webglApp) {
    //   if (width !== prevProps.width || height !== prevProps.height) {
    //     this.webglApp.resize(width, height);
    //   }
    //   this.webglApp.updateState({ path }, prevProps);
    // }
  }

  render() {
    return (
      <section
        className={classnames(`AvatarWebGL`)}
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}

AvatarWebGL.propTypes = checkProps({
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string
});

AvatarWebGL.defaultProps = {
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
)(AvatarWebGL);
