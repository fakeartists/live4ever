import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';

import MineNav from '../../components/MineNav/MineNav';
import ADBanner from '../../components/AdBanner/AdBanner';

import './Mine.scss';

class Mine extends React.PureComponent {
  numBannersClosed = 0;

  constructor(props) {
    super(props);
    this.state = { createBanners: false };
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
  }

  animateIn = () => {
    animate.to(this.container, 0.5, { autoAlpha: 1, ease: Circ.easeOut });
    this.mineNav.getWrappedInstance().animateIn();

    this.setState({ createBanners: true });
  };

  animateOut = () => {
    animate.to(this.container, 0.3, { autoAlpha: 0, ease: Circ.easeOut });
    this.mineNav.getWrappedInstance().animateOut();
  };

  onBannerClosed = () => {
    this.numBannersClosed++;
    this.mineNav.getWrappedInstance().updateCount(this.numBannersClosed);
  };

  render() {
    const items = [];
    if (this.state.createBanners) {
      var posX;
      var posY;
      for (var index = 0; index < 100; index++) {
        posX = parseInt(Math.random() * (window.innerWidth - 640));
        posY = parseInt(Math.random() * (window.innerHeight * 0.7 - 480) + 150);
        items.push(<ADBanner key={index} position="absolute" left={posX} top={posY} onClosed={this.onBannerClosed} />);
      }
    }

    return (
      <section className="Mine" ref={el => (this.container = el)}>
        <MineNav numBannersClosed={0} ref={mineNav => (this.mineNav = mineNav)} />
        <div className="mine-container">{items}</div>
      </section>
    );
  }
}

Mine.propTypes = checkProps({
  showBanners: PropTypes.bool
});

Mine.defaultProps = {};

const mapStateToProps = state => ({});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Mine);
