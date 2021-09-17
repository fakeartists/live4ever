import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';
import MineNav from './MineNav/MineNav';
import ADBanner from '../AdBanner/AdBanner';
import LevelUp from '../LevelUp/LevelUp';
import Onboarding from '../Onboarding/Onboarding';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

import { setMineState, setLevelUpState, setOnboardingState } from '../../redux/modules/mine';
import { getCopy } from '../../data/get-site-data';
import { updateCookie, getCookie } from '../../util/cookies';
import { updateUser } from '../../data/get-site-data';

import './Mine.scss';

class Mine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'mine');
    this.adsadded = false;

    const cookiedata = getCookie();
    this.level = cookiedata && cookiedata.bidData && cookiedata.bidData.level ? cookiedata.bidData.level : 1;
    this.bid = cookiedata && cookiedata.bidData && cookiedata.bidData.bid ? cookiedata.bidData.bid : 0;
    this.animatebar = !cookiedata.promotionbanner;

    this.count = 25;
    let currentLevel = Math.floor(this.bid / this.count) + 1;

    if (this.level > currentLevel) {
      this.level = currentLevel;
      this.saveData(this.level, this.bid);
    }

    this.rank = '-';
    this.highest = 0;
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
        this.updateBar();
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
    let div = this.bid % this.count;
    let toAdd = this.count - div;
    toAdd = toAdd <= 0 ? this.count : toAdd;

    this.addAd(toAdd, []);
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

    this.updateBar();

    const ads = this.state.ads.filter(item => item.props.id !== id);
    let sharetime = this.bid % 10 === 0;

    if (sharetime && this.animatebar) {
      this.mineNav.getWrappedInstance().animateShareBarIn();
      updateCookie({ promotionbanner: true });
      this.animatebar = false;
    }

    this.addAd(0, ads);
    const currentLevel = Math.floor(this.bid / this.count) + 1;

    if (currentLevel > this.level) {
      this.level = currentLevel;
      this.props.setLevelUpState(true);
      this.playSound('level', 0.5);

      animate
        .to({ alpha: 0 }, 3, {
          alpha: 1
        })
        .then(() => {
          this.props.setLevelUpState(false);
          this.addAd(this.count, ads);
        });
      //this.addAd(3 + parseInt(Math.random() * 4), ads);
    } else {
      this.playSound('click', 0.3);
    }

    this.saveData(this.level, this.bid);
  };

  updateBid = bid => {
    this.bid = bid;
    const currentLevel = Math.floor(this.bid / this.count) + 1;
    if (this.level > currentLevel) {
      this.level = currentLevel;
      this.saveData(this.level, this.bid);
    }
  };

  updateBar = () => {
    if (this.props.data.leadeboard) {
      this.rank = this.props.data.leadeboard
        .getWrappedInstance()
        .getRank(this.bid)
        .toString();

      this.highest = this.props.data.leadeboard.getWrappedInstance().getHighest();
    }

    this.mineNav.getWrappedInstance().updateAll(this.bid, this.rank, this.highest);
  };

  updateShareBonus = bid => {
    const cookiedata = getCookie();
    if (!cookiedata.bannershared) {
      const currentLevel = Math.floor(bid / this.count);
      this.level = currentLevel;
      this.bid = bid;
      this.saveData(this.level, this.bid);
      updateCookie({ bannershared: true });
    }

    this.animatebar = false;
    this.mineNav.getWrappedInstance().animateShareBarOut();
  };

  saveData = (level, bid) => {
    updateCookie({ bidData: { level, bid } });
  };

  handleClose = async () => {
    this.saveData(this.level, this.bid);

    const cookiedata = getCookie();
    await updateUser(
      cookiedata.login.id,
      cookiedata.login.name,
      cookiedata.bidData.bid,
      cookiedata.bidData.level,
      cookiedata.login.email
    );

    //update leaderboards
    if (this.props.data.updateFunction) {
      this.props.data.updateFunction();
    }

    this.animateOut().then(() => {
      this.props.setMineState(null);
    });
  };

  playSound = (sound = 'click', volume = 0.4) => {
    if (this.audioPlayer) {
      this.audioPlayer.getWrappedInstance().play(sound, volume);
    }
  };

  render() {
    let mine;
    if (this.props.data) {
      mine = (
        <section className="Mine" ref={el => (this.container = el)}>
          <AudioPlayer ref={el => (this.audioPlayer = el)} />
          <button className="mine-close active" onClick={this.handleClose}>
            {this.copy.exit_button}
          </button>
          <MineNav
            copy={this.copy}
            ref={mineNav => (this.mineNav = mineNav)}
            data={this.props.data}
            updateBid={this.updateShareBonus}
          />
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
