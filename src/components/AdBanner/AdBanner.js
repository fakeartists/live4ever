import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import animate, { Circ } from '../../util/gsap-animate';

import './AdBanner.scss';

class ADBanner extends React.PureComponent {
  backgroundImage = '';
  bodyCopy = '';
  buttonActive = false;
  posX = 0;
  posY = 0;

  constructor(props) {
    super(props);

    this.buildAd();
    this.state = {
      isOpen: false
    };
  }

  buildAd = () => {
    // Background image
    // FA_POP_500x300_01.gif
    // FA_POP_800x400_01.gif

    var filenamePrefix = Math.floor(Math.random() * 2) === 0 ? 'FA_POP_500x300' : 'FA_POP_800x400';
    filenamePrefix = 'FA_POP_800x400';

    var index = Math.floor(Math.random() * 10) + 1;
    var paddedIndex = String(index).padStart(2, '0');

    var backgroundImage = './assets/images/popups/' + filenamePrefix + '_' + paddedIndex + '.gif';

    //console.log(backgroundImage);   // DEBUG

    // Body copy
    var bodyCopyOptions = [
      'Get [adj] quick!',
      '[verb] forever now!',
      'Meet your [adj] double<br/>and [verb] forever!',
      'Every [noun] knows this trick! ',
      '[verb] now and<br/>become a [noun] now!',
      'Become a [adj] [noun]<br/>and [verb] quick!',
      'Only 2 left!<br/>[verb] Fast!',
      '[verb] like a<br/>[adj] [noun]!',
      'Wanna be a [adj] [noun]?<br/>[verb] now!',
      'Are you ready<br/>to [verb]?',
      'You Too!<br/>Become a [adj] [noun].',
      'Time to [verb] and<br/>become a [noun]!'
    ];

    var verbOptions = [
      'CLICK',
      'LIVE',
      'EARN',
      'SUCCEED',
      'WIN',
      'GAIN',
      'PROFIT',
      'TRIUMPH',
      'CONQUER',
      'ASCEND',
      'PRAY'
    ];

    var adjectiveOptions = [
      'Eternal',
      'Rich',
      'Immortal',
      'Famous',
      'Alpha',
      'Sexy',
      'Groovy',
      'Invicible',
      'Legendary',
      'Divine',
      'Prestigious',
      'Lush',
      'Mega',
      'Almighty',
      'Low key',
      'Blessed',
      'Prosperous',
      'Opulent',
      'Supreme'
    ];

    var nounOptions = [
      'God',
      'Billionaire',
      'Unicorn',
      'Visionary',
      'Deity',
      'Idol',
      'Divinity',
      'Almighty',
      'Sex Machine',
      'Super Star',
      'Winner',
      'Achiever',
      'Performer',
      'Influencer',
      'Celebrity',
      'Entrepreneur',
      'Creator',
      'O.G.',
      'Motha F****'
    ];

    var bodyCopyTemplate = bodyCopyOptions[Math.floor(Math.random() * bodyCopyOptions.length)];
    var verb = verbOptions[Math.floor(Math.random() * verbOptions.length)];
    var adjective = adjectiveOptions[Math.floor(Math.random() * adjectiveOptions.length)];
    var noun = nounOptions[Math.floor(Math.random() * nounOptions.length)];

    var bodyCopy = bodyCopyTemplate
      .replace('[verb]', verb)
      .replace('[adj]', adjective)
      .replace('[noun]', noun);

    // Split into array and insert <br /> in between
    // Assume only one br max. Key is always 0
    const intersperse = (arr, sep) => arr.reduce((a, v, i) => [...a, v, sep], []).slice(0, -1);
    bodyCopy = intersperse(bodyCopy.split('<br/>'), <br key={0} />);

    //console.log(bodyCopy);   // DEBUG

    this.posX = parseInt(Math.random() * (window.innerWidth - 640));
    this.posY = parseInt(Math.random() * (window.innerHeight * 0.7 - 480) + 150);
    this.backgroundImage = backgroundImage;
    this.bodyCopy = bodyCopy;
  };

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
          <header className="Adbanner-header">
            <ul>
              <li className={'Adbanner-header-close ' + this.buttonActive} onClick={this.handleButtonClick}>
                X
              </li>
              <li className={'Adbanner-header-windows ' + this.buttonActive} />
              <li className={'Adbanner-header-minimize ' + this.buttonActive}>_</li>
            </ul>
          </header>
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
