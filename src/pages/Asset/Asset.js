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
import BoxInfo from '../../components/BoxInfo/BoxInfo';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { getCopy } from '../../data/get-site-data';
import { getData } from '../../data/get-site-data';
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
        this.setState({
          asset: asset
        });
      }
      this.props.setAssetLoaded(true);
    }
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
    console.log('open');
    this.props.setAssetPreviewState(true);
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
          />
        </section>
        <section className="Asset-container leaderboard">
          <h1>{this.copy.title_leaderboard}</h1>
          <Leaderboard copy={this.leaderoardcopy} />
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
  setAssetPreviewState: PropTypes.func
});

Asset.defaultProps = {
  language: 'en',
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
    setLoginState: val => dispatch(setLoginState(val)),
    setAssetPreviewState: val => dispatch(setAssetPreviewState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Asset));
