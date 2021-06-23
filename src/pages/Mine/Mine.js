import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import MineNav from '../../components/MineNav/MineNav';
import ADBanner from '../../components/AdBanner/AdBanner';

import './Mine.scss';

import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';

class Mine extends React.PureComponent {
  numBannersClosed = 0;

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
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

  onBannerClosed = () => {
    this.numBannersClosed++;
    console.log(this.numBannersClosed);
    //this.forceUpdate()
  };

  render() {
    const items = [];
    var posX;
    var posY;
    for (var index = 0; index < 100; index++) {
      posX = parseInt(Math.random() * (window.innerWidth - 640) - window.innerWidth / 2) + 320;
      posY = parseInt(Math.random() * (window.innerHeight * 0.7 - 480) + 150);
      items.push(<ADBanner key={index} position="absolute" left={posX} top={posY} onClosed={this.onBannerClosed} />);
    }

    return (
      <section className={classnames('Mine', this.props.className)} ref={el => (this.container = el)}>
        <MineNav numBannersClosed={this.numBannersClosed} />
        <div>{items}</div>
      </section>
    );
  }
}

Mine.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

Mine.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Mine));
