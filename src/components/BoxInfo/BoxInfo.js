import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import BaseLink from '../BaseLink/BaseLink';
import Counter from '../Counter/Counter';
import { getCookie, checkCookieLogin } from '../../util/cookies';
import { getBidWithVariation } from '../../util/bid';

import './BoxInfo.scss';

class BoxInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { highest: 0, updated: true };
  }

  updateHighest = highest => {
    this.setState({
      highest: highest
    });
  };

  update = () => {
    this.setState({
      updated: !this.state.updated
    });
  };

  render() {
    const cookiedata = getCookie();
    const variation = cookiedata && cookiedata.variation;

    const start = moment(new Date(this.props.data.ends));
    const now = moment();
    const duration = moment.duration(start.diff(now));
    let durDays = Math.floor(duration.asDays());

    const logged = checkCookieLogin();
    let classSingle = this.props.isSingle ? 'single' : '';
    let description;
    let bid;
    let assetinfo;
    let reserve;
    let userbid;
    let imageOver;
    let status = durDays < 0 || isNaN(durDays) ? false : true;
    let ubid = '-';

    let highestbid = this.state.highest;
    let haswebgl = this.props.data.webgl ? ' preview' : '';
    let clickimageFunction = status ? this.props.clickFunction : this.props.previewFunction;
    let copyclick = status ? this.props.copy.image_click_bid : this.props.copy.image_click;

    if (status) {
      ubid = cookiedata.bidData.bid;
      highestbid = ubid > highestbid ? ubid : highestbid;
      ubid = getBidWithVariation(ubid, variation);
    }

    let clicks = highestbid;
    highestbid = getBidWithVariation(highestbid, variation);

    if (this.props.isSingle) {
      description = (
        <p className="box-info-desc" dangerouslySetInnerHTML={{ __html: this.props.data.full_description }} />
      );

      if (status) {
        bid = (
          <button className="box-info-button cta" onClick={this.props.clickFunction}>
            {this.props.copy.button_box_asset}
          </button>
        );
      }

      imageOver = (
        <div className="box-info-image-overlay">
          <div className="box-info-image-overlay-ico" />
          <p>{copyclick}</p>
        </div>
      );

      let contract = this.props.data.link ? (
        <p>
          <a href={this.props.data.link} target="_blank" rel="noopener noreferrer">
            {this.props.data.contract_address}
          </a>
        </p>
      ) : (
        <p>{this.props.data.contract_address}</p>
      );

      assetinfo = (
        <div className="box-info-asset">
          <li>
            <ul>
              <h1>{this.props.copy.title_chain}:</h1>
              <p>{this.props.data.chain_info}</p>
            </ul>
            <ul>
              <h1>{this.props.copy.title_contract}:</h1>
              {contract}
            </ul>
            <ul>
              <h1>{this.props.copy.title_token}:</h1>
              <p>{this.props.data.token_id}</p>
            </ul>
            <ul>
              <h1>{this.props.copy.title_blockchain}</h1>
              <p>{this.props.data.blockchain}</p>
            </ul>
          </li>
        </div>
      );

      if (this.props.data.reserve) {
        reserve = (
          <div className={'box-info-box ' + classSingle}>
            <p className="box-info-status-top-title">{this.props.copy.title_reserve}</p>
            <p className="box-info-status-top-bid">{this.props.data.reserve + ' ' + this.props.copy.piramid_ico}</p>
          </div>
        );
      }

      if (status && logged) {
        userbid = (
          <div className="box-info-status-bid">
            <p className="box-info-status-bid-title">{this.props.copy.title_user_bid}</p>
            <p className="box-info-status-bid-bid">{ubid + ' ' + this.props.copy.piramid_ico}</p>
          </div>
        );
      }
    } else {
      description = (
        <p className="box-info-desc" dangerouslySetInnerHTML={{ __html: this.props.data.short_description }} />
      );
      // haswebgl = '';
      clickimageFunction = null;

      imageOver = (
        <BaseLink className="box-info-image-overlay" link={'./asset/' + this.props.data._id}>
          <div className="box-info-image-overlay-ico" />
          {/* <p>{this.props.copy.image_click}</p> */}
        </BaseLink>
      );

      bid = (
        <BaseLink className="box-info-button cta" link={'./asset/' + this.props.data._id}>
          {this.props.copy.button_box_home}
        </BaseLink>
      );
    }

    return (
      <div className={classnames(`box-info`, classSingle)}>
        <div className="box-info-bid">
          <div className={'box-info-image' + haswebgl} onClick={clickimageFunction}>
            <img src={this.props.data.image} alt={this.props.data.title} />
            {imageOver}
          </div>
          <div className="box-info-data">
            <h2 className="box-info-data-title">{this.props.data.title}</h2>
            <p className="box-info-data-edition">
              {this.props.copy.title_edition +
                ' ' +
                this.props.data.edition +
                ' ' +
                this.props.copy.separator_edition +
                ' ' +
                this.props.data.sets}
            </p>
            <div className={'box-info-data-image' + haswebgl} onClick={clickimageFunction}>
              <img src={this.props.data.image} alt={this.props.data.title} />
              {imageOver}
            </div>
            {description}
            <div className="box-info-status">
              <div className="box-info-status-top">
                <div className={'box-info-box ' + classSingle}>
                  <p className="box-info-status-top-title">{this.props.copy.title_bid}</p>
                  <p className="box-info-status-top-bid">{highestbid + ' ' + this.props.copy.piramid_ico}</p>
                  <p className="box-info-status-info">{clicks + ' ' + this.props.copy.sub_title_bid}</p>
                </div>
                <div className={'box-info-box ' + classSingle}>
                  <p className="box-info-status-top-title">{this.props.copy.title_time}</p>
                  <Counter copy={this.props.copy} isLanding={false} endDate={this.props.data.ends} />
                </div>
                {reserve}
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
  copy: PropTypes.object,
  data: PropTypes.object,
  isSingle: PropTypes.bool,
  clickFunction: PropTypes.func,
  previewFunction: PropTypes.func,
  mineIsOpen: PropTypes.object
});

BoxInfo.defaultProps = {
  copy: {},
  data: {},
  isSingle: false,
  clickFunction: null,
  previewFunction: null
};

const mapStateToProps = state => ({
  mineIsOpen: state.mineState.data
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(BoxInfo);
