import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

import './AdBanner.scss';

class ADBanner extends React.PureComponent {
  state = {
    backgroundImage: '',
    bodyCopy: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      showComponent: true
    };
  }

  async componentDidMount() {
    //const { path, history } = this.props;

    // -------------------------------------------------------------------------------------------------------
    // TODO: Refactor this

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

    this.setState({
      backgroundImage: backgroundImage,
      bodyCopy: bodyCopy
    });

    // -------------------------------------------------------------------------------------------------------
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  handleClick = () => {
    if (this.props.onClosed) {
      this.setState({
        clicked: true,
        showComponent: false
      });

      this.props.onClosed();
    }
  };

  render() {
    const bannerStyle = {
      display: this.state.showComponent ? 'block' : 'none',
      position: this.props.position ? this.props.position : '',
      top: this.props.top,
      left: this.props.left
    };

    return (
      <section
        className={classnames(`Adbanner`)}
        style={bannerStyle}
        ref={node => {
          this.node = node;
        }}
      >
        <div className="Adbanner-wrapper">
          <header className="Adbanner-header">
            <ul>
              <li className="Adbanner-header-close">X</li>
              <li className="Adbanner-header-windows" />
              <li className="Adbanner-header-minimize">_</li>
            </ul>
          </header>
          <div className="Adbanner-content">
            <span>{this.state.bodyCopy}</span>
            <button onClick={this.handleClick}>CLICK</button>
            <img src={this.state.backgroundImage} alt="banner" />
          </div>
        </div>
      </section>
    );
  }
}

ADBanner.propTypes = checkProps({
  width: PropTypes.number,
  height: PropTypes.number,
  position: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  path: PropTypes.string,
  onClosed: PropTypes.func
});

ADBanner.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  path: ''
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
)(ADBanner);
