import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
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

    this.items = [];
    this.styles = [];
    this.refs = [];

    let fires = 30;
    for (let i = 0; i < fires; i++) {
      let width = 100 + Math.random() * 200;
      let height = width;
      let x = window.innerWidth / 2 + (-(window.innerWidth / 2) + Math.random() * window.innerWidth) - width / 2;
      let y = window.innerHeight + height + Math.random() * height;

      this.styles.push({
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px'
      });
    }
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
      this.refs.forEach(element => {
        if (element) {
          let y = -(window.innerHeight / 1.5 + (Math.random() * window.innerHeight) / 2);
          let delay = val * 0.01 + Math.random() * 1;
          animate.to(element, 2 + Math.random() * 2, { y: y, ease: Expo.easeOut, delay: delay });
        }
        val++;
      });
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.3, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });

    animate.to(this.box, 0.8, {
      scale: 1,
      ease: Elastic.easeOut.config(1.2, 0.9)
    });
  };

  animateOut = () => {
    animate.to(this.container, 0.5, { autoAlpha: 0, ease: Circ.easeOut }).then(() => {
      animate.set(this.box, { scale: 0.2 });
      this.refs.forEach(element => {
        if (element) {
          animate.set(element, { y: 0 });
        }
      });
    });
  };

  render() {
    this.refs = [];
    this.items = [];
    let index = 0;
    this.styles.forEach(element => {
      this.items.push(<span key={index} style={element} className="fire" ref={el => this.refs.push(el)} />);
      index++;
    });

    return (
      <div className="LevelUp" ref={el => (this.container = el)}>
        <div className="level-fire">{this.items}</div>
        <div className="level-message" ref={el => (this.box = el)}>
          <WindowsHeader isActive={false} />
          <p>{this.copy.title}</p>
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
