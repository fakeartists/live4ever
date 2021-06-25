import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';

import MineNav from '../MineNav/MineNav';
import ADBanner from '../AdBanner/AdBanner';

import { setMineState } from '../../redux/modules/mine';

import './Mine.scss';

class Mine extends React.PureComponent {
  numAdsClosed = 0;
  currentKey = 0;
  isOpen = 0;

  constructor(props) {
    super(props);
    this.state = { ads: [] };
  }

  componentDidMount() {
    this.props.setMineState(this.props.isOpen);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
        this.addAd(10, []);
        this.animateIn();
        this.isOpen = true;
      }
    } else {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
    this.mineNav.getWrappedInstance().animateIn();
  };

  animateOut = () => {
    animate.to(this.container, 0.3, { autoAlpha: 0, ease: Circ.easeOut });
    return this.mineNav.getWrappedInstance().animateOut();
  };

  addAd = (qtd, base) => {
    let items = [];
    for (let index = 0; index < qtd; index++) {
      this.currentKey++;
      items.push(
        <ADBanner
          key={this.currentKey}
          id={this.currentKey}
          isStatic={false}
          onClose={this.onAdClosed}
          delay={index * (0.05 + Math.random() * 0.2)}
        />
      );
    }

    this.setState({
      ads: [...base, ...items]
    });
  };

  onAdClosed = id => {
    this.numAdsClosed++;
    this.mineNav.getWrappedInstance().updateCount(this.numAdsClosed);

    const ads = this.state.ads.filter(item => item.props.id !== id);
    this.addAd(3 + parseInt(Math.random() * 4), ads);
  };

  handleButtonClick = () => {
    this.animateOut().then(() => {
      this.props.setMineState(false);
    });
  };

  render() {
    let mine;
    if (this.props.isOpen) {
      mine = (
        <section className="Mine" ref={el => (this.container = el)}>
          <button className="mine-close active" onClick={this.handleButtonClick}>
            Get me out of here
          </button>
          <MineNav numAdsClosed={0} ref={mineNav => (this.mineNav = mineNav)} />
          <div className="mine-container">{this.state.ads}</div>
        </section>
      );
    } else {
      mine = <section className="Mine" ref={el => (this.container = el)} />;
    }
    return mine;
  }
}

Mine.propTypes = checkProps({
  setMineState: PropTypes.func,
  isOpen: PropTypes.bool
});

Mine.defaultProps = {
  isOpen: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.mineState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMineState: val => dispatch(setMineState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Mine);
