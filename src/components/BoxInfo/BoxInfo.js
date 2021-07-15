import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import BaseLink from '../BaseLink/BaseLink';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './BoxInfo.scss';

class BoxInfo extends React.PureComponent {
  async componentDidMount() {
    //const { path, history } = this.props;
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  render() {
    let classSingle = this.props.isSingle ? 'single' : '';
    let description;
    let bid;
    let assetinfo;
    let reserve;
    let userbid;
    
    if (this.props.isSingle) {
      description = (
        <p className="box-info-desc">
          Have you always wondered of what you could do if you were immortal? PYRΔMID can make your dream come true. Now
          with a few clicks you can acquire the <b>FIRST HUMAN POWERED</b> NFT that will save a hard copy of yourself on
          the blockchain, FOREVER. However it’s a <b>TIME LIMITED OFFER</b>, so start bidding now to get the chance to
          become immortal.
        </p>
      );

      bid = (
        <button className="box-info-button cta" onClick={this.props.clickFunction}>
          BID NOW
        </button>
      );

      assetinfo = (
        <div className="box-info-asset">
          <li>
            <ul>
              <h1>Chain Info:</h1>
              <p>NA</p>
            </ul>
            <ul>
              <h1>Contract Address:</h1>
              <p>FΔKE NUmb3rs</p>
            </ul>
            <ul>
              <h1>Token ID:</h1>
              <p>782736392920208742920377</p>
            </ul>
            <ul>
              <h1>Blockchain:</h1>
              <p>PYRΔMID</p>
            </ul>
          </li>
        </div>
      );

      reserve = (
        <li className={classSingle}>
          <p className="box-info-status-top-title">Reserve price</p>
          <p className="box-info-status-top-bid">25.00 Δ</p>
        </li>
      );

      userbid = (
        <div className="box-info-status-bid">
          <p className="box-info-status-bid-title">Your Bid</p>
          <p className="box-info-status-bid-bid">200.00 Δ</p>
        </div>
      );
    } else {
      description = (
        <p className="box-info-desc">
          Thus unique NFT will grant you digital immortality by unlocking your digital twin.
        </p>
      );

      bid = (
        <BaseLink className="box-info-button cta" link={'./asset/eternity'}>
          LEARN MORE
        </BaseLink>
      );
    }

    return (
      <div className={classnames(`box-info`, classSingle)}>
        <div className="box-info-bid">
          <div className="box-info-image">
            <img src="https://www.indiewire.com/wp-content/uploads/2019/12/avatar-2.jpg" alt="alt" />
          </div>
          <div className="box-info-data">
            <h2>Immortal #4</h2>
            <p>Edition 1 of 1</p>
            {description}
            <div className="box-info-status">
              <div className="box-info-status-top">
                <ul>
                  <li className={classSingle}>
                    <p className="box-info-status-top-title">Highest Bid</p>
                    <p className="box-info-status-top-bid">200.00 Δ</p>
                    <p className="box-info-status-info">15,000 clicks</p>
                  </li>
                  <li className={classSingle}>
                    <p className="box-info-status-top-title">Auction ending in</p>
                    <div className="box-info-status-top-counter">
                      <ul>
                        <li className="counter-day">3</li>
                        <li className="counter-hour">16</li>
                        <li className="counter-min">21</li>
                      </ul>
                    </div>
                    <div className="box-info-status-info">
                      <ul>
                        <li className="counter-info-day">Days</li>
                        <li className="counter-info-hour">Hours</li>
                        <li className="counter-info-min">Minutes</li>
                      </ul>
                    </div>
                  </li>
                  {reserve}
                </ul>
              </div>
              <div className="box-info-status-bottom">
                {bid}
                {userbid}
              </div>
            </div>
          </div>
        </div>
        {assetinfo}
      </div>
    );
  }
}

BoxInfo.propTypes = checkProps({
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string,
  isSingle: PropTypes.bool,
  clickFunction: PropTypes.func
});

BoxInfo.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  path: '',
  isSingle: false,
  clickFunction: null
};

const mapStateToProps = state => ({
  width: selectWindowWidth(state),
  height: selectWindowHeight(state),
  path: selectPath(state)
});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxInfo);
