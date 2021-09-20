import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { device } from '@jam3/detect';
import { connect } from 'react-redux';
import animate, { Circ, Expo, Elastic } from '../../util/gsap-animate';
import WindowsHeader from '../WindowsHeader/WindowsHeader';
import { setLevelUpState } from '../../redux/modules/mine';
import { getCopy } from '../../data/get-site-data';

import './LevelUp.scss';

class LevelUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'levelup');
    this.isOpen = false;
    this.box = null;
    this.rank = '-';

    this.items = [];
    this.refs = [];
    this.styles = [];

    this.createEmojis();
  }

  componentDidMount() {
    this.props.setLevelUpState(this.props.isOpen);
    animate.set(this.container, { autoAlpha: 0 });
    animate.set(this.box, { scale: 0.2 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
        this.animateIn();
        this.isOpen = true;
      }
    } else {
      if (this.isOpen) {
        this.animateOut();
        this.isOpen = false;
      }
    }

    if (this.isOpen) {
      let val = 0;
      let imgPosX = -340 * Math.floor(Math.random() * 4);
      let imgPosY = -340 * Math.floor(Math.random() * 4);

      this.refs.forEach(element => {
        if (element) {
          element.style.backgroundPosition = imgPosX + 'px ' + imgPosY + 'px';
          let y = -(window.innerHeight / 1.5 + (Math.random() * window.innerHeight) / 2);
          let delay = val * 0.01 + Math.random() * 1;
          animate.to(element, 1.5 + Math.random() * 1.5, { y: y, ease: Expo.easeOut, delay: delay });
        }
        val++;
      });
    }
  }

  createEmojis = () => {
    let emojis = 30;
    let imgPosX = -340 * Math.floor(Math.random() * 4);
    let imgPosY = -340 * Math.floor(Math.random() * 4);

    for (let i = 0; i < emojis; i++) {
      let scale = device.isMobile ? 0.15 + Math.random() * 0.3 : 0.3 + Math.random() * 0.7;
      let width = 320 * scale;
      let height = width;

      let x = 0;
      if (device.isMobile) {
        x = -(window.innerWidth / 4) + Math.random() * window.innerWidth;
      } else {
        x = window.innerWidth / 2 + (-(window.innerWidth / 2) + Math.random() * window.innerWidth) - width / 2;
      }

      let y = window.innerHeight + height + Math.random() * height;

      this.styles.push({
        backgroundPosition: imgPosX + 'px ' + imgPosY + 'px',
        transform: 'translate3d(0, 0, 0) scale(' + scale + ')',
        left: x + 'px',
        top: y + 'px'
      });
    }
  };

  animateIn = () => {
    animate.to(this.container, 0.2, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });

    animate.to(this.box, 1.2, {
      scale: 1,
      ease: Elastic.easeOut.config(1, 0.9)
    });
  };

  animateOut = () => {
    animate.to(this.container, 0.4, { autoAlpha: 0, ease: Circ.easeOut }).then(() => {
      animate.set(this.box, { scale: 0.2 });
      this.refs.forEach(element => {
        if (element) {
          animate.set(element, { y: 0 });
        }
      });
    });
  };

  updateRank = (rank = '-') => {
    this.rank = rank;
  };

  render() {
    this.refs = [];
    this.items = [];
    let index = 0;

    this.styles.forEach(element => {
      this.items.push(<span key={index} style={element} className="emoji" ref={el => this.refs.push(el)} />);
      index++;
    });

    let idx = Math.floor(Math.random() * this.copy.text.length);
    let text = this.copy.text[idx];
    let rank = this.copy.message + ' ' + this.rank;

    return (
      <div className="LevelUp" ref={el => (this.container = el)}>
        <div className="level-emoji">{this.items}</div>
        <div className="level-message" ref={el => (this.box = el)}>
          <WindowsHeader isActive={false} />
          <p className="level-rank">{rank}</p>
          <h1>{this.copy.title}</h1>
          <p className="level-text">{text}</p>
        </div>
      </div>
    );
  }
}

LevelUp.propTypes = checkProps({
  language: PropTypes.string,
  setLevelUpState: PropTypes.func,
  isOpen: PropTypes.bool
});

LevelUp.defaultProps = {
  language: 'en',
  isOpen: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.mineState.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevelUpState: val => dispatch(setLevelUpState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(LevelUp);
