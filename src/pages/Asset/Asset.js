import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Transition from '../PagesTransitionWrapper';
import animate, { Expo } from '../../util/gsap-animate';
import { setAssetLoaded } from '../../redux/modules/asset';
import { setMineState } from '../../redux/modules/mine';
import { setLoginState } from '../../redux/modules/login';
import { setAssetPreviewState } from '../../redux/modules/asset-preview';
import { setAssetData } from '../../redux/modules/asset-preview';
import BoxInfo from '../../components/BoxInfo/BoxInfo';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { getCopy, getData, getHighest, getLeaderboard } from '../../data/get-site-data';
import { checkCookieLogin } from '../../util/cookies';

import './Asset.scss';

class Asset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { asset: {} };
    this.copy = getCopy(this.props.language, 'asset');
    this.boxcopy = getCopy(this.props.language, 'boxinfo');
    this.leaderoardcopy = getCopy(this.props.language, 'leaderboard');
  }

  async componentDidMount() {
    const { params } = this.props.match;

    animate.set(this.container, { x: '100%', autoAlpha: 0 });

    if (!this.props.loaded) {
      if (params.assetId !== undefined) {
        const asset = await getData(params.assetId);
        asset.updateFunction = this.updateLeaderboard;

        this.setState({
          asset: asset
        });

        this.updateLeaderboard();
      }
      this.props.setAssetLoaded(true);

      if (params.params !== undefined) {
        if (params.params === 'autoplay' && checkCookieLogin()) {
          this.props.setMineState(this.state.asset);
        }
      }
    }
  }

  componentDidUpdate() {
    this.boxinfo.getWrappedInstance().update();
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
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
    if (checkCookieLogin()) {
      this.props.setMineState(this.state.asset);
    } else {
      this.props.setLoginState(true);
    }
  };

  onOpenPreview = () => {
    if (this.state.asset.webgl) {
      this.props.setAssetPreviewState(true);
      this.props.setAssetData(this.state.asset.webgl);
    } else if (this.state.asset.link) {
      window.open(this.state.asset.link, '_blank');
    }
  };

  updateLeaderboard = async () => {
    const leaderboard = await getLeaderboard(true, this.state.asset.status, this.state.asset._id);
    this.leaderboard.getWrappedInstance().updateLeaderboard(leaderboard);

    const highest = getHighest();
    this.boxinfo.getWrappedInstance().updateHighest(highest);
  };

  render() {
    return (
      <div className={classnames('Asset', this.props.className)} ref={el => (this.container = el)}>
        <section className="Asset-container">
          <BoxInfo
            isSingle={true}
            clickFunction={this.onClickBid}
            previewFunction={this.onOpenPreview}
            copy={this.boxcopy}
            data={this.state.asset}
            ref={el => (this.boxinfo = el)}
          />
        </section>
        <section className="Asset-container leaderboard">
          <h1>{this.copy.title_leaderboard}</h1>
          <Leaderboard copy={this.leaderoardcopy} ref={el => (this.leaderboard = el)} />
        </section>
      </div>
    );
  }
}

Asset.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setAssetLoaded: PropTypes.func,
  setMineState: PropTypes.func,
  setLoginState: PropTypes.func,
  setAssetPreviewState: PropTypes.func,
  setAssetData: PropTypes.func,
  loginOpen: PropTypes.bool
});

Asset.defaultProps = {
  language: 'en',
  loaded: false,
  loginOpen: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.assetLoaded.loaded,
    loginOpen: state.loginState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAssetLoaded: val => dispatch(setAssetLoaded(val)),
    setMineState: val => dispatch(setMineState(val)),
    setLoginState: val => dispatch(setLoginState(val)),
    setAssetPreviewState: val => dispatch(setAssetPreviewState(val)),
    setAssetData: val => dispatch(setAssetData(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Asset));
