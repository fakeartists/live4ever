import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './AdBanner.scss';

class ADBanner extends React.PureComponent {
  async componentDidMount() {
    //const { path, history } = this.props;
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  render() {
    return (
      <section
        className={classnames(`Adbanner`)}
        ref={node => {
          this.node = node;
        }}
      >
        <header className="Adbanner-header">
          <ul>
            <li className="Adbanner-header-close">X</li>
            <li className="Adbanner-header-windows" />
            <li className="Adbanner-header-minimize">_</li>
          </ul>
        </header>
        <div className="Adbanner-content">
          <img src="http://www.nyx.net/~cmeador/public/snakesonmyplane.jpg" alt="banner" />
        </div>
      </section>
    );
  }
}

ADBanner.propTypes = checkProps({
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string
});

ADBanner.defaultProps = {
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
)(ADBanner);
