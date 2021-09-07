import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import animate, { Power3 } from '../../../util/gsap-animate';
import { updateCookie, getCookie } from '../../../util/cookies';
import { getBidWithVariation, getBidValue } from '../../../util/bid';

import './MineNav.scss';

class MineNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.variation = null;
    this.state = {
      bid: 0,
      count: 0
    };
  }

  componentDidMount() {
    animate.set(this.container, { y: -80, autoAlpha: 0 });
    animate.set(this.sharebar, { y: -70, autoAlpha: 0 });

    const start = moment(new Date(this.props.data.ends));
    const now = moment();
    const duration = moment.duration(start.diff(now));

    let days = duration.days();
    if (days > 0) {
      this.timer = setInterval(() => {
        this.setState({ count: this.state.count + 1 });
      }, 100000);
    }

    this.variation = setInterval(() => {
      updateCookie({ variation: this.getVariation() });
    }, 400000);
  }

  getVariation = () => {
    return 0; //-1.5 + Math.random() * 3;
  };

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.variation != null) {
      this.variation = null;
      clearInterval(this.variation);
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.8, { y: 0, autoAlpha: 1, ease: Power3.easeOut });
  };

  animateOut = () => {
    return animate.to(this.container, 0.5, { y: '-100%', autoAlpha: 0, ease: Power3.easeOut });
  };

  animateShareBarIn = () => {
    animate.to(this.sharebar, 0.5, { y: 0, autoAlpha: 1, ease: Power3.easeOut });
  };

  animateShareBarOut = () => {
    animate.to(this.sharebar, 0.5, { y: '-100%', autoAlpha: 0, ease: Power3.easeInOut });
  };

  onCloseShare = () => {
    const cookiedata = getCookie();
    if (!cookiedata.bannershared && cookiedata.bidData) {
      const variation = cookiedata && cookiedata.variation;
      const bonus = getBidValue(75, variation);
      const bidBonus = cookiedata.bidData.bid + bonus;
      this.updateCount(bidBonus);
      if (this.props.updateBid != null) {
        this.props.updateBid(bidBonus);
      }
    }
  };

  updateCount = count => {
    const cookiedata = getCookie();
    const variation = cookiedata && cookiedata.variation;
    this.setState({ bid: getBidWithVariation(count, variation) });
  };

  render() {
    const start = moment(new Date(this.props.data.ends));
    const now = moment();
    const duration = moment.duration(start.diff(now));

    let days = duration.days();
    if (days < 0) {
      days = '--';
    } else {
      days = days < 10 ? '0' + days : days;
    }

    let hours = duration.hours();
    if (hours < 0) {
      hours = '--';
    } else {
      hours = hours < 10 ? '0' + hours : hours;
    }

    let highestbid = this.props.data.highestbid;
    if (this.state.bid > highestbid) highestbid = this.state.bid;

    return (
      <div className="MineNav" ref={el => (this.container = el)}>
        <div className="mine-info">
          <div className="time-left-wrapper">
            <span className="label">{this.props.copy.title_time_left}</span>
            <span className="digits">{days}</span>
            <span className="label">{this.props.copy.title_days}</span>
            <span className="digits">{hours}</span>
            <span className="label">{this.props.copy.title_hours}</span>
          </div>
          <div className="rank-wrapper">
            <div className="rank-count">
              <span className="label">{this.props.copy.title_rank}</span>
              <span className="digits">0</span>
            </div>
            <div className="rank-bid">
              <span className="label">{this.props.copy.title_top_bid}</span>
              <span className="digits">{highestbid + ' ' + this.props.copy.piramid_ico}</span>
            </div>
          </div>
          <div className="your-bid-wrapper">
            <span className="label user">{this.props.copy.title_your_bid}</span>
            <span className="digits user">{this.state.bid}</span>
            <span className="delta user">{this.props.copy.piramid_ico}</span>
          </div>
        </div>
        <div className="mine-promo" ref={el => (this.sharebar = el)}>
          <p>{this.props.copy.promo_message}</p>
          <div className="mine-promo-share">
            <TwitterShareButton
              url={this.props.copy.share_link}
              title={this.props.copy.share_text}
              via={this.props.copy.share_via}
              onShareWindowClose={this.onCloseShare}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <FacebookShareButton
              url={this.props.copy.share_link}
              quote={this.props.copy.share_text}
              onShareWindowClose={this.onCloseShare}
            >
              <FacebookIcon size={41} round />
            </FacebookShareButton>
          </div>
          <button className="mine-promo-close" onClick={this.animateShareBarOut}>
            {this.props.copy.promo_close}
          </button>
        </div>
      </div>
    );
  }
}

MineNav.propTypes = checkProps({
  copy: PropTypes.object,
  data: PropTypes.object,
  updateBid: PropTypes.func
});

MineNav.defaultProps = {
  copy: {},
  data: {},
  updateBid: null
};

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
)(MineNav);
