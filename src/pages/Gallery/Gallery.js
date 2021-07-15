import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import BaseLink from '../../components/BaseLink/BaseLink';
//import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

// import getSiteData from '../../data/get-site-data';

import './Gallery.scss';

import Transition from '../PagesTransitionWrapper';
import { setGalleryLoaded } from '../../redux/modules/gallery';
import animate, { Expo } from '../../util/gsap-animate';

//temp
import galeryData from '../../data/assets';

class Gallery extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { x: '100%', autoAlpha: 0 });
    if (!this.props.loaded) {
      // galeryData = await getSiteData();
      this.props.setGalleryLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    //await wait(prevSectionExitDuration);
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
    let title;

    if (this.props.isHome) {
      header = (
        <header className="Gallery-header">
          <h1>Recent Drops</h1>
        </header>
      );
    } else {
      title = <p className="gallery-item-info-title">The Original Pimp</p>;
    }

    return (
      <div className={classnames('Gallery', this.props.className)} ref={el => (this.container = el)}>
        <section className="Gallery-container">
          {header}
          <section className="Gallery-content">
            <ul className="gallery-list">
              {galeryData
                .filter(item => !item.hot_sale)
                .map((item, index) => {
                  let closed = item.status === 'closed';
                  return (
                    <li key={index} className="gallery-item">
                      <BaseLink className="gallery-item-content" link={'./asset/' + item._id}>
                        <div className="image-container">
                          <img src={item.image} alt="alt" />
                        </div>
                        <h2 className="gallery-item-title">{item.title}</h2>
                        <div className="gallery-item-info">
                          {title}
                          {this.props.isHome && <p className="gallery-item-info-bid">{item.highestbid + ' Δ'}</p>}
                          <button className={'gallery-item-info-button' + (closed ? '' : ' active')}>
                            {closed ? 'SOLD' : 'VIEW'}
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
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  isHome: PropTypes.bool,
  setGalleryLoaded: PropTypes.func
});

Gallery.defaultProps = {};

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
