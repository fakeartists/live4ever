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
  constructor(props) {
    super(props);

    this.numAdsClosed = 0;
    this.currentKey = 0;
    this.isOpen = 0;
    this.state = { ads: [] };
  }

  componentDidMount() {
    this.props.setMineState(this.props.isOpen);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
        this.addAd(50, []);
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
          delay={index * (0.01 + Math.random() * 0.1)}
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
    this.addAd(0, ads);
    //this.addAd(3 + parseInt(Math.random() * 4), ads);
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
            Save bid & quit
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
