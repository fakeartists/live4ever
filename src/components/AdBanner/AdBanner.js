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
    var index = Math.floor(Math.random() * this.adsdata.images.length);
    let backgroundImage = this.adsdata.images[index];

    let bannerSize = this.adsdata.dimensions;
    let bodyCopyOptions = this.adsdata.body_copy_options;
    let verbOptions = this.adsdata.verb_options;
    let adjectiveOptions = this.adsdata.adjective_options;
    let nounOptions = this.adsdata.noun_options;
    let buttonOptions = this.adsdata.buttons;
    let buttonColors = this.adsdata.button_colors;
    let textColors = this.adsdata.colors;

    let bodyCopyTemplate = bodyCopyOptions[Math.floor(Math.random() * bodyCopyOptions.length)];
    let verb = verbOptions[Math.floor(Math.random() * verbOptions.length)];
    let adjective = adjectiveOptions[Math.floor(Math.random() * adjectiveOptions.length)];
    let noun = nounOptions[Math.floor(Math.random() * nounOptions.length)];
    let buttonCopy = buttonOptions[Math.floor(Math.random() * buttonOptions.length)].copy;

    let btStyleIndex = Math.floor(Math.random() * buttonColors.length);
    let buttonBGColor = buttonColors[btStyleIndex].background;
    let buttonTextColor = buttonColors[btStyleIndex].text;
    let buttonBGColorHover = buttonColors[btStyleIndex].over_background;
    let buttonTextColorHover = buttonColors[btStyleIndex].over_text;

    let textColorIndex = Math.floor(Math.random() * textColors.length);
    let textColorNormal = textColors[textColorIndex].normal;
    // let textColorBold = textColors[textColorIndex].bold;

    let textColorOLNormal = textColors[textColorIndex].outline_normal || 'none';
    textColorOLNormal = textColorOLNormal === 'none' ? textColorOLNormal : '1px ' + textColorOLNormal;

    // let textColorOLBold = textColors[textColorIndex].outline_bold || 'none';
    let fontSize = 130 + Math.floor(Math.random() * 50) + '%';

    let bodyCopy = bodyCopyTemplate
      .replace('[verb]', verb)
      .replace('[adj]', adjective)
      .replace('[noun]', noun);

    const intersperse = (arr, sep) => arr.reduce((a, v, i) => [...a, v, sep], []).slice(0, -1);
    bodyCopy = intersperse(bodyCopy.split('<br/>'), <br key={0} />);

    this.width = bannerSize.width.min + Math.random() * (bannerSize.width.max - bannerSize.width.min);
    this.height = bannerSize.height.min + Math.random() * (bannerSize.height.max - bannerSize.height.min);

    this.posX = parseInt(Math.random() * (window.innerWidth - this.width));
    this.posY = parseInt(Math.random() * (window.innerHeight * 0.7 - this.height) + 150);
    this.backgroundImage = backgroundImage;
    this.bodyCopy = bodyCopy;
    this.buttonCopy = buttonCopy;
    this.buttonStyle = {
      background: buttonBGColor,
      color: buttonTextColor,
      hover: {
        background: buttonBGColorHover,
        color: buttonTextColorHover
      }
    };
    this.textStyle = {
      //'text-shadow': '2px 2px $pink',
      fontSize: fontSize,
      //WebkitTextStroke: textColorOLNormal,
      textShadow: '0px 2px ' + textColorOLNormal,
      color: textColorNormal
    };
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

  handleHoverEnter = () => {
    this.button.style.background = this.buttonStyle.hover.background;
    this.button.style.color = this.buttonStyle.hover.color;
  };

  handleHoverOut = () => {
    this.button.style.background = this.buttonStyle.background;
    this.button.style.color = this.buttonStyle.color;
  };

  render() {
    const bannerStyle = {
      position: this.props.isStatic ? 'relative' : 'absolute',
      width: this.props.isStatic ? '100%' : this.width,
      height: this.props.isStatic ? '100%' : this.height,
      top: this.props.isStatic ? 0 : this.posY,
      left: this.props.isStatic ? 0 : this.posX
    };
    this.buttonActive = this.props.isStatic ? '' : 'active';

    let clickButton;
    if (!this.props.isStatic) {
      clickButton = (
        <button
          className={this.buttonActive}
          style={this.buttonStyle}
          onClick={this.handleButtonClick}
          onMouseEnter={this.handleHoverEnter}
          onMouseLeave={this.handleHoverOut}
          ref={node => {
            this.button = node;
          }}
        >
          {this.buttonCopy}
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
            <img src={this.backgroundImage} alt="banner" draggable="false" />
            <div className="Adbanner-data">
              <span className={this.props.isStatic ? 'center' : ''} style={this.textStyle}>
                {this.bodyCopy}
              </span>
              {clickButton}
            </div>
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
