import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';

import MineNav from '../MineNav/MineNav';
import ADBanner from '../AdBanner/AdBanner';
import { setMineState } from '../../redux/modules/mine';
import { getCopy } from '../../data/get-site-data';

import './Mine.scss';

class Mine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'mine');

    this.bid = 0;
    this.currentKey = 0;
    this.isOpen = false;
    this.state = { ads: [] };
  }

  componentDidMount() {
    this.props.setMineState(this.props.data);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.data) {
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
    this.bid++;
    this.mineNav.getWrappedInstance().updateCount(this.bid);

    const ads = this.state.ads.filter(item => item.props.id !== id);
    this.addAd(0, ads);
    //this.addAd(3 + parseInt(Math.random() * 4), ads);
  };

  handleButtonClick = () => {
    this.animateOut().then(() => {
      this.props.setMineState(null);
    });
  };

  render() {
    let mine;
    if (this.props.data) {
      mine = (
        <section className="Mine" ref={el => (this.container = el)}>
          <button className="mine-close active" onClick={this.handleButtonClick}>
            {this.copy.exit_button}
          </button>
          <MineNav copy={this.copy} ref={mineNav => (this.mineNav = mineNav)} data={this.props.data} />
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
  language: PropTypes.string,
  setMineState: PropTypes.func,
  data: PropTypes.object
});

Mine.defaultProps = {
  language: 'en',
  data: null
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.mineState
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
