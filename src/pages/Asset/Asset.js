import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import Transition from '../PagesTransitionWrapper';
import { setAssetLoaded } from '../../redux/modules/asset';
import animate from '../../util/gsap-animate';

import Mine from '../../components/Mine/Mine';
import BoxInfo from '../../components/BoxInfo/BoxInfo';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

import './Asset.scss';

class Asset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.bidOpen = false;
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
    if (!this.props.loaded) {
      this.props.setAssetLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  onClickBid = () => {
    if (!this.bidOpen) {
      this.mine.getWrappedInstance().animateIn();
      this.container.style.position = 'fixed';
      this.bidOpen = true;
    } else {
      this.mine.getWrappedInstance().animateOut();
      this.container.style.position = 'relative';
      this.bidOpen = false;
    }
  };

  render() {
    // const { params } = this.props.match;
    return (
      <div className={classnames('Asset', this.props.className)} ref={el => (this.container = el)}>
        <Mine ref={mine => (this.mine = mine)} />
        <section className="Asset-container">
          <BoxInfo isSingle={true} clickFunction={this.onClickBid} />
        </section>
        <section className="Asset-container leaderboard">
          <h1>Bidding Leaderboard</h1>
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
  setAssetLoaded: PropTypes.func
});

Asset.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.assetLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAssetLoaded: val => dispatch(setAssetLoaded(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Asset));
