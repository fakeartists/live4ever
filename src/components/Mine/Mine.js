import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';

import MineNav from './MineNav/MineNav';
import ADBanner from '../AdBanner/AdBanner';
import LevelUp from '../LevelUp/LevelUp';
import Onboarding from '../Onboarding/Onboarding';

import { setMineState, setLevelUpState, setOnboardingState } from '../../redux/modules/mine';
import { getCopy } from '../../data/get-site-data';
import { updateCookie, getCookie } from '../../util/cookies';

import './Mine.scss';

class Mine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'mine');
    this.adsadded = false;

    const cookiedata = getCookie();
    this.level = cookiedata && cookiedata.bidData && cookiedata.bidData.level ? cookiedata.bidData.level : 1;
    this.bid = cookiedata && cookiedata.bidData && cookiedata.bidData.bid ? cookiedata.bidData.bid : 0;

    this.count = 5;
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
        this.mineNav.getWrappedInstance().updateCount(this.bid);

        const cookiedata = getCookie();
        if (!cookiedata.onboarding) {
          this.props.setOnboardingState(true);
        } else {
          this.startAds();
        }

        this.props.setMineState(this.props.data);
        this.animateIn();
        this.isOpen = true;
      } else {
        if (!this.adsadded && !this.props.onboarding) {
          this.startAds();
        }
      }
    } else {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }

  startAds = () => {
    const div = this.bid % this.level;
    this.addAd(this.count - div, []);
    this.adsadded = true;
  };

  animateIn = () => {
    animate.to(this.container, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
    this.mineNav.getWrappedInstance().animateIn();

    //to check
    // this.mineNav.getWrappedInstance().animateShareBarIn();
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
    let sharetime = this.bid % 10 === 0;

    if (sharetime) {
      this.mineNav.getWrappedInstance().animateShareBarIn();
    }

    this.addAd(0, ads);
    const currentLevel = Math.floor(this.bid / this.count);

    if (currentLevel > this.level) {
      this.level = currentLevel;
      this.props.setLevelUpState(true);
      animate
        .to({ alpha: 0 }, 3, {
          alpha: 1
        })
        .then(() => {
          this.props.setLevelUpState(false);
          this.addAd(this.count, ads);
        });
      //this.addAd(3 + parseInt(Math.random() * 4), ads);
    }

    this.saveData(this.level, this.bid);
  };

  saveData = (level, bid) => {
    updateCookie({ bidData: { level, bid } });
  };

  handleClose = () => {
    this.saveData(this.level, this.bid);
    this.animateOut().then(() => {
      this.props.setMineState(null);
    });
  };

  render() {
    let mine;
    if (this.props.data) {
      mine = (
        <section className="Mine" ref={el => (this.container = el)}>
          <button className="mine-close active" onClick={this.handleClose}>
            {this.copy.exit_button}
          </button>
          <MineNav copy={this.copy} ref={mineNav => (this.mineNav = mineNav)} data={this.props.data} />
          <div className="mine-container">{this.state.ads}</div>
          <LevelUp language={this.props.language} />
          <Onboarding language={this.props.language} />
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
  setLevelUpState: PropTypes.func,
  setOnboardingState: PropTypes.func,
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onboarding: PropTypes.bool
});

Mine.defaultProps = {
  language: 'en',
  data: null
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.mineState.data,
    isOpen: state.mineState.isOpen,
    onboarding: state.mineState.onboarding
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMineState: val => dispatch(setMineState(val)),
    setLevelUpState: val => dispatch(setLevelUpState(val)),
    setOnboardingState: val => dispatch(setOnboardingState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Mine);
