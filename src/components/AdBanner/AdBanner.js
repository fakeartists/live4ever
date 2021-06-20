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

    console.log(backgroundImage);

    // Body copy
    var bodyCopyOptions = [
      'Get [adj] quick !',
      '[verb] forever now !',
      'Meet your [adj] double and [verb] forever!',
      'Every [noun] knows this trick! ',
      '[verb] now and become a [noun] now!',
      'Become a [adj] [noun] and [verb] quick!',
      'Only 2 left! [verb] Fast!',
      '[verb] like a [adj] [noun]!',
      'Wanna be a [adj] [noun]? [verb] now!',
      'Are you ready to [verb]?',
      'You Too! Become a [adj] [noun].',
      'Time to [verb] and become a [noun]!'
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

    // DEBUG
    console.log(bodyCopy);

    this.setState({
      backgroundImage: backgroundImage,
      bodyCopy: bodyCopy
    });
    // -------------------------------------------------------------------------------------------------------
  }

  componentDidUpdate(prevProps) {
    //const { width, height, path } = this.props;
  }

  render() {
    return (
      <section
        className={classnames(`Adbanner`)}
        ref={node => {
          this.node = node;
        }}
      >
        <div>
          <header className="Adbanner-header">
            <ul>
              <li className="Adbanner-header-close">X</li>
              <li className="Adbanner-header-windows" />
              <li className="Adbanner-header-minimize">_</li>
            </ul>
          </header>
          <div className="Adbanner-content">
            <span>{this.state.bodyCopy}</span>
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
  path: PropTypes.string
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
