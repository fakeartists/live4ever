import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
//import wait from '@jam3/wait';
import Cookies from 'universal-cookie';
import checkProps from '@jam3/react-check-extra-props';
import Transition from '../PagesTransitionWrapper';
import animate, { Expo } from '../../util/gsap-animate';

import { setAssetLoaded } from '../../redux/modules/asset';
import { setMineState } from '../../redux/modules/mine';
import { setLoginState } from '../../redux/modules/login';

import BoxInfo from '../../components/BoxInfo/BoxInfo';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

import './Asset.scss';

class Asset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });
    if (!this.props.loaded) {
      this.props.setAssetLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    //await wait(prevSectionExitDuration);
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.8, { x: '0%', autoAlpha: 1, ease: Expo.easeOut });
  };

  animateOut = () => {
    animate.to(this.container, 0.1, { x: '0%', autoAlpha: 0, ease: Expo.easeOut });
  };

  onClickBid = () => {
    const cookiedata = this.cookies.get('pyramid');
    if (cookiedata !== undefined && cookiedata.email !== undefined) {
      this.props.setMineState(true);
    } else {
      this.props.setLoginState(true);
    }
  };

  render() {
    // const { params } = this.props.match;
    return (
      <div className={classnames('Asset', this.props.className)} ref={el => (this.container = el)}>
        <section className="Asset-container">
          <BoxInfo isSingle={true} clickFunction={this.onClickBid} />
        </section>
        <section className="Asset-container leaderboard">
          <h1>Leaderboard</h1>
          <Leaderboard />
        </section>
      </div>
    );
  }
}

Asset.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setAssetLoaded: PropTypes.func,
  setMineState: PropTypes.func,
  setLoginState: PropTypes.func
});

Asset.defaultProps = {
  loaded: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.assetLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAssetLoaded: val => dispatch(setAssetLoaded(val)),
    setMineState: val => dispatch(setMineState(val)),
    setLoginState: val => dispatch(setLoginState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Asset));
