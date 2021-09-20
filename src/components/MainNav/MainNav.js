import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';
import { selectWindowWidth, selectWindowHeight } from '../App/App-selectors';
import { setLoginState } from '../../redux/modules/login';
import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';
import { getCopy } from '../../data/get-site-data';
import layout from '../../data/layout';
import { checkCookieLogin } from '../../util/cookies';

import { ReactComponent as PyramidIcon } from '../../assets/svg/pyramid-icon.svg';

import './MainNav.scss';

const getButtonState = isMenuOpen => (isMenuOpen ? STATES.close : STATES.idle);

class MainTopNav extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextButtonState = getButtonState(nextProps.isMobileMenuOpen);
    if (nextButtonState !== prevState.buttonState) {
      return {
        buttonState: nextButtonState
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const { width } = this.props;
    this.xlarge = width > layout.xlarge;

    this.state = {
      buttonState: getButtonState(props.isMobileMenuOpen)
    };

    this.copy = getCopy(this.props.language, 'header');
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { width } = this.props;
    this.xlarge = width > layout.xlarge;
    this.handleScroll(null);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollpct = scrollTop / 60;
    scrollpct = Math.min(Math.max(scrollpct, 0), 1);
    this.container.style.backgroundColor = 'rgba(0, 0, 0, ' + 0.8 * scrollpct + ')';
    let translateY = 0;
    const { width } = this.props;

    if (this.xlarge) {
      if (width > 1550) {
        this.logo.style.transform = 'scale(1) translateY(0px)';
      } else {
        translateY = -12 * scrollpct;
        this.logo.style.transform = 'scale(' + (0.8 + 0.2 * (1 - scrollpct)) + ') translateY(' + translateY + 'px)';
      }
    } else {
      translateY = -12 * scrollpct;
      this.logo.style.transform = 'scale(' + (0.8 + 0.2 * (1 - scrollpct)) + ') translateY(' + translateY + 'px)';
    }
  };

  handleHamburgerClick = () => {
    this.props.setIsMobileMenuOpen(!this.props.isMobileMenuOpen);
  };

  handleLoginClick = () => {
    this.props.setLoginState(true);
  };

  render() {
    let logged = checkCookieLogin();

    return (
      <header className={classnames('MainNav', this.props.className)} ref={el => (this.container = el)}>
        {this.props.ariaSiteTitle && <h1 className="only-aria-visible">{this.props.ariaSiteTitle}</h1>}
        <nav className="nav" aria-label={this.copy.ariaNavLabel}>
          {this.props.ariaNavTitle && <h2 className="only-aria-visible">{this.props.ariaNavTitle}</h2>}
          {this.props.logoSrc && (
            <BaseLink className="nav-logo-container" link={this.props.logoLink} aria-label={this.copy.logoAriaLabel}>
              <img className="nav-logo" src={this.props.logoSrc} alt={this.copy.logoAlt} />
              <p className="nav-logo-text">{this.copy.title}</p>
            </BaseLink>
          )}
          <a href={this.props.logoLink} className="nav-mid-logo-cnt" ref={el => (this.logo = el)}>
            <PyramidIcon className="nav-mid-logo" />
            <div className="nav-mid-logo-text">
              <h1 ref={el => (this.text = el)}>{this.copy.phone}</h1>
            </div>
          </a>
          {this.props.showHamburger ? (
            <HamburgerButton onClick={this.handleHamburgerClick} currentState={this.state.buttonState} />
          ) : (
            this.props.links && (
              <ul className="nav-list">
                {this.props.links.map((link, index) => {
                  if (link.path === 'login') {
                    return (
                      <li
                        key={index}
                        className={'nav-item' + (logged ? ' active login' : '')}
                        onClick={this.handleLoginClick}
                      >
                        {this.copy[logged ? link.alt_text : link.text]}
                      </li>
                    );
                  } else {
                    return (
                      <BaseLink key={index} link={link.path}>
                        <li
                          className={classnames('nav-item', {
                            active: cleanPath(this.props.location.pathname) === cleanPath(link.path)
                          })}
                        >
                          {this.copy[link.text]}
                        </li>
                      </BaseLink>
                    );
                  }
                })}
              </ul>
            )
          )}
        </nav>
        {this.props.children}
      </header>
    );
  }
}

MainTopNav.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  ariaSiteTitle: PropTypes.string,
  ariaNavTitle: PropTypes.string,
  logoLink: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  showHamburger: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  setLoginState: PropTypes.func,
  loginState: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
});

MainTopNav.defaultProps = {
  language: 'en',
  logoLink: '/',
  setIsMobileMenuOpen: noop,
  width: window.innerWidth,
  height: window.innerHeight
};

const mapStateToProps = state => ({
  width: selectWindowWidth(state),
  height: selectWindowHeight(state),
  loginState: state.loginState
});

const mapDispatchToProps = dispatch => {
  return {
    setLoginState: val => dispatch(setLoginState(val))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
  )(MainTopNav)
);

//export default withRouter(MainTopNav);
