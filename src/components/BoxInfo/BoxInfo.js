import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import BaseLink from '../BaseLink/BaseLink';
import Counter from '../Counter/Counter';
import { getCookie } from '../../util/cookies';
import { getBidWithVariation } from '../../util/bid';

import './BoxInfo.scss';

class BoxInfo extends React.PureComponent {
  async componentDidMount() {}

  render() {
    let classSingle = this.props.isSingle ? 'single' : '';
    let description;
    let bid;
    let assetinfo;
    let reserve;
    let userbid;

    let highestbid = this.props.data.highestbid;

    const cookiedata = getCookie();
    const variation = cookiedata && cookiedata.variation;
    let ubid = getBidWithVariation(cookiedata.bidData.bid, variation);
    highestbid = ubid > highestbid ? ubid : highestbid;

    if (this.props.isSingle) {
      description = (
        <p className="box-info-desc" dangerouslySetInnerHTML={{ __html: this.props.data.full_description }} />
      );

      if (this.props.data.status === 'open') {
        bid = (
          <button className="box-info-button cta" onClick={this.props.clickFunction}>
            {this.props.copy.button_box_asset}
          </button>
        );
      }

      assetinfo = (
        <div className="box-info-asset">
          <li>
            <ul>
              <h1>{this.props.copy.title_chain}:</h1>
              <p>{this.props.data.chain_info}</p>
            </ul>
            <ul>
              <h1>{this.props.copy.title_contract}:</h1>
              <p>{this.props.data.contract_address}</p>
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

      if (this.props.data.status === 'open') {
        userbid = (
          <div className="box-info-status-bid">
            <p className="box-info-status-bid-title">{this.props.copy.title_user_bid}</p>
            <p className="box-info-status-bid-bid">{ubid + ' ' + this.props.copy.piramid_ico}</p>
          </div>
        );
      }
    } else {
      description = <p className="box-info-desc">{this.props.data.short_description}</p>;

      bid = (
        <BaseLink className="box-info-button cta" link={'./asset/' + this.props.data._id}>
          {this.props.copy.button_box_home}
        </BaseLink>
      );
    }

    return (
      <div className={classnames(`box-info`, classSingle)}>
        <div className="box-info-bid">
          <div className="box-info-image" onClick={this.props.previewFunction}>
            <img src={this.props.data.image} alt={this.props.data.title} />
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
            {description}
            <div className="box-info-status">
              <div className="box-info-status-top">
                <div className={'box-info-box ' + classSingle}>
                  <p className="box-info-status-top-title">{this.props.copy.title_bid}</p>
                  <p className="box-info-status-top-bid">{highestbid + ' ' + this.props.copy.piramid_ico}</p>
                  <p className="box-info-status-info">{this.props.data.clicks + ' ' + this.props.copy.sub_title_bid}</p>
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
  mapDispatchToProps
)(BoxInfo);
