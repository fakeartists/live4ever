import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';

import { setAssetPreviewState } from '../../redux/modules/asset-preview';
import { setAssetData } from '../../redux/modules/asset-preview';
import { getCopy } from '../../data/get-site-data';

import AvatarWebGL from '../AvatarWebGL/AvatarWebGL';

import './AssetPreview.scss';

class AssetPreview extends React.PureComponent {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'assetpreview');
    this.isOpen = false;
    this.assetData = null;
  }

  componentDidMount() {
    this.props.setAssetPreviewState(this.props.isOpen);
    this.props.setAssetData(this.props.assetData);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
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
  };

  animateOut = () => {
    return animate.to(this.container, 0.3, { autoAlpha: 0, ease: Circ.easeOut });
  };

  handleButtonClick = () => {
    this.animateOut().then(() => {
      this.props.setAssetPreviewState(false);
    });
  };

  render() {
    return (
      <section
        className={classnames(`AssetPreview`)}
        ref={node => {
          this.container = node;
        }}
      >
        <div className="webgl-bg" onClick={this.handleButtonClick} />
        <div className="webgl-container">
          <AvatarWebGL data={this.props.assetData} />
        </div>
      </section>
    );
  }
}

AssetPreview.propTypes = checkProps({
  language: PropTypes.string,
  setAssetPreviewState: PropTypes.func,
  isOpen: PropTypes.bool,
  setAssetData: PropTypes.func,
  assetData: PropTypes.object
});

AssetPreview.defaultProps = {
  language: 'en',
  isOpen: false,
  assetData: {}
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.assetPreviewState.isOpen,
    assetData: state.assetPreviewState.assetData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAssetPreviewState: val => dispatch(setAssetPreviewState(val)),
    setAssetData: val => dispatch(setAssetData(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetPreview);
