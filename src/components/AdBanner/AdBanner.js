import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import animate, { Circ } from '../../util/gsap-animate';
import WindowsHeader from '../WindowsHeader/WindowsHeader';
import { getAds } from '../../data/get-site-data';

import './AdBanner.scss';

class ADBanner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.adsdata = getAds();

    this.backgroundImage = '';
    this.bodyCopy = '';
    this.buttonActive = false;
    this.posX = 0;
    this.posY = 0;

    this.buildAd();
    this.state = {
      isOpen: false
    };
  }

  async componentDidMount() {
    animate.set(this.node, { autoAlpha: 0 });
    animate.to(this.node, 0.1, { autoAlpha: 1, ease: Circ.easeOut, delay: this.props.delay });
    this.setState({ isOpen: true });
  }

  componentDidUpdate(prevProps) {
    // const { isOpen } = this.props;
    // if (!isOpen) {
    //   animate.to(this.node, 0.1, { autoAlpha: 0, ease: Circ.easeOut });
    // }
  }

  buildAd = () => {
    var index = Math.round(Math.random() * this.adsdata.images.length);
    let backgroundImage = this.adsdata.images[index];

    let bodyCopyOptions = this.adsdata.body_copy_options;
    let verbOptions = this.adsdata.verb_options;
    let adjectiveOptions = this.adsdata.adjective_options;
    let nounOptions = this.adsdata.noun_options;

    let bodyCopyTemplate = bodyCopyOptions[Math.floor(Math.random() * bodyCopyOptions.length)];
    let verb = verbOptions[Math.floor(Math.random() * verbOptions.length)];
    let adjective = adjectiveOptions[Math.floor(Math.random() * adjectiveOptions.length)];
    let noun = nounOptions[Math.floor(Math.random() * nounOptions.length)];

    let bodyCopy = bodyCopyTemplate
      .replace('[verb]', verb)
      .replace('[adj]', adjective)
      .replace('[noun]', noun);

    const intersperse = (arr, sep) => arr.reduce((a, v, i) => [...a, v, sep], []).slice(0, -1);
    bodyCopy = intersperse(bodyCopy.split('<br/>'), <br key={0} />);

    this.posX = parseInt(Math.random() * (window.innerWidth - 640));
    this.posY = parseInt(Math.random() * (window.innerHeight * 0.7 - 480) + 150);
    this.backgroundImage = backgroundImage;
    this.bodyCopy = bodyCopy;
  };

  handleButtonClick = () => {
    if (!this.props.isStatic) {
      if (this.props.onClose) {
        this.setState({
          isOpen: false
        });
        this.props.onClose(this.props.id);
      }
    }
  };

  handleContentClick = () => {
    if (this.buttonActive === 'active') {
      var elms = document.querySelectorAll('.Adbanner');
      for (let i = 0; i < elms.length; i++) {
        elms[i].style.zIndex = '900';
      }
      this.node.style.zIndex = '999';
    }
  };

  render() {
    const bannerStyle = {
      position: this.props.isStatic ? 'relative' : 'absolute',
      top: this.props.isStatic ? 0 : this.posY,
      left: this.props.isStatic ? 0 : this.posX
    };
    this.buttonActive = this.props.isStatic ? '' : 'active';

    let clickButton;
    if (!this.props.isStatic) {
      clickButton = (
        <button className={this.buttonActive} onClick={this.handleButtonClick}>
          CLICK
        </button>
      );
    }

    const banner = (
      <div
        className={classnames(`Adbanner`)}
        style={bannerStyle}
        ref={node => {
          this.node = node;
        }}
        onClick={this.handleContentClick}
      >
        <div className="Adbanner-wrapper">
          <WindowsHeader isActive={!this.props.isStatic} onClose={this.handleButtonClick} />
          <div className="Adbanner-content">
            <span className={this.props.isStatic ? 'center' : ''}>{this.bodyCopy}</span>
            {clickButton}
            {/*<div style="background-image: url(this.state.backgroundImage); height: 200px; width: 400px; border: 1px solid black;"> </div>*/}
            <img src={this.backgroundImage} alt="banner" draggable="false" />
          </div>
        </div>
      </div>
    );

    let ad;
    if (this.props.isStatic) {
      ad = banner;
    } else {
      ad = (
        <Draggable
          axis="both"
          defaultPosition={{ x: 0, y: 0 }}
          // scale={1}
          // onStart={this.handleStart}
          // onDrag={this.handleDrag}
          // onStop={this.handleStop}
        >
          {banner}
        </Draggable>
      );
    }

    return ad;
  }
}

ADBanner.propTypes = checkProps({
  id: PropTypes.number,
  onClose: PropTypes.func,
  isStatic: PropTypes.bool,
  delay: PropTypes.number
});

ADBanner.defaultProps = {
  id: -1,
  isStatic: true,
  delay: 0
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ADBanner);
