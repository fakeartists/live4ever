import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import BaseLink from '../../components/BaseLink/BaseLink';
import checkProps from '@jam3/react-check-extra-props';
import Transition from '../PagesTransitionWrapper';
import { setGalleryLoaded } from '../../redux/modules/gallery';
import animate, { Expo } from '../../util/gsap-animate';
import { getData } from '../../data/get-site-data';
import { getCopy } from '../../data/get-site-data';

import './Gallery.scss';

class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { assets: [] };
    this.copy = getCopy(this.props.language, 'gallery');
  }

  async componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });

    if (!this.props.loaded) {
      let assets;
      if (this.props.assetdata.length === 0) {
        assets = await getData();
      } else {
        assets = this.props.assetdata.length;
      }

      this.setState({
        assets: assets
      });

      this.props.setGalleryLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.8, { x: '0%', autoAlpha: 1, ease: Expo.easeOut });
  };

  animateOut = () => {
    animate.to(this.container, 0.1, { x: '0%', autoAlpha: 0, ease: Expo.easeOut });
  };

  render() {
    let header;

    if (this.props.isHome) {
      header = (
        <header className="Gallery-header">
          <h1>{this.copy.gallery_title}</h1>
        </header>
      );
    }

    //+ (closed ? '' : ' active')
    return (
      <div className={classnames('Gallery', this.props.className)} ref={el => (this.container = el)}>
        <section className="Gallery-container">
          {header}
          <section className="Gallery-content">
            <ul className="gallery-list">
              {this.state.assets
                .filter(item => !item.hot_sale || !this.props.isHome)
                .map((item, index) => {
                  let closed = item.status === 'closed';
                  let copyclick = closed ? this.copy.image_click : this.copy.image_click_bid;
                  return (
                    <li key={index} className="gallery-item">
                      <BaseLink className="gallery-item-content" link={'./asset/' + item._id}>
                        <div className="image-container">
                          <img src={item.image} alt="alt" />
                          <div className="image-overlay">
                            <div className="image-overlay-ico" />
                            <p>{copyclick}</p>
                          </div>
                        </div>
                        <h2 className="gallery-item-title">{item.title}</h2>
                        <div className="gallery-item-info">
                          {!this.props.isHome && <p className="gallery-item-info-title">{item.sub_title}</p>}
                          {this.props.isHome && <p className="gallery-item-info-bid">{item.highestbid + ' Δ'}</p>}
                          <button className={'gallery-item-info-button active'}>
                            {closed ? this.copy.button_sold : this.copy.button_view}
                          </button>
                        </div>
                      </BaseLink>
                    </li>
                  );
                })}
            </ul>
          </section>
        </section>
      </div>
    );
  }
}

Gallery.propTypes = checkProps({
  language: PropTypes.string,
  assetdata: PropTypes.array,
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  isHome: PropTypes.bool,
  setGalleryLoaded: PropTypes.func
});

Gallery.defaultProps = {
  language: 'en',
  assetdata: []
};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.galleryLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGalleryLoaded: val => dispatch(setGalleryLoaded(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Gallery));
