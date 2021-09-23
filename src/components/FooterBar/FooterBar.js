import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';

import './FooterBar.scss';

class FooterBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  handleScroll = event => {
    let scrollTop = Math.ceil(document.documentElement.scrollTop);
    let limit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    let onbottom = scrollTop >= parseInt(limit) - parseInt(window.innerHeight) - 100 ? false : true;
    if (onbottom !== this.state.visible) {
      this.setState({ visible: onbottom });
    }
  };

  handleClick = () => {
    if (this.props.hotsale) {
      window.open('/asset/' + this.props.hotsale + '/autoplay', '_self');
    }
  };

  render() {
    let mineOpen = this.props.mineIsOpen === null ? false : true;
    let active = this.state.visible && !mineOpen ? '' : ' hidden';
    let text = [];
    for (let i = 0; i < 50; i++) {
      const texttag = i % 2 === 0 ? <b key={i}>{this.props.copy.cta + ' '}</b> : this.props.copy.cta + ' ';
      text.push(texttag);
    }

    return (
      <div className={'FooterBar' + active} onClick={this.handleClick}>
        <p>{text}</p>
      </div>
    );
  }
}

FooterBar.propTypes = checkProps({
  copy: PropTypes.object,
  hotsale: PropTypes.string,
  mineIsOpen: PropTypes.object
});

FooterBar.defaultProps = {
  copy: {},
  hotsale: '',
  mineIsOpen: null
};

const mapStateToProps = state => {
  return {
    mineIsOpen: state.mineState.data
  };
};

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(FooterBar);
