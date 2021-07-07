import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';

import './MainNav.scss';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import { ReactComponent as PyramidIcon } from '../../assets/svg/pyramid-icon.svg';

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
    this.state = {
      buttonState: getButtonState(props.isMobileMenuOpen)
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollpct = scrollTop / 60;
    scrollpct = Math.min(Math.max(scrollpct, 0), 1);
    let translateY = -12 * scrollpct;
    this.container.style.backgroundColor = 'rgba(0, 0, 0, ' + 0.8 * scrollpct + ')';
    this.logo.style.transform = 'scale(' + (0.8 + 0.2 * (1 - scrollpct)) + ') translateY(' + translateY + 'px)';
  };

  handleHamburgerClick = () => {
    this.props.setIsMobileMenuOpen(!this.props.isMobileMenuOpen);
  };

  render() {
    return (
      <header className={classnames('MainNav', this.props.className)} ref={el => (this.container = el)}>
        {this.props.ariaSiteTitle && <h1 className="only-aria-visible">{this.props.ariaSiteTitle}</h1>}
        <nav className="nav" aria-label={this.props.ariaNavLabel}>
          {this.props.ariaNavTitle && <h2 className="only-aria-visible">{this.props.ariaNavTitle}</h2>}
          {this.props.logoSrc && (
            <BaseLink link={this.props.logoLink} aria-label={this.props.logoAriaLabel}>
              <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
              <p className="nav-logo-text">A few clicks away from Eternity</p>
            </BaseLink>
          )}
          <div className="nav-mid-logo-cnt" ref={el => (this.logo = el)}>
            <PyramidIcon className="nav-mid-logo" />
            <div className="nav-mid-logo-text">
              <h1 ref={el => (this.text = el)}>1-800-PYRAMID</h1>
              {/* <p>$2/text</p> */}
            </div>
          </div>
          {this.props.showHamburger ? (
            <HamburgerButton onClick={this.handleHamburgerClick} currentState={this.state.buttonState} />
          ) : (
            this.props.links && (
              <ul className="nav-list">
                {this.props.links.map((link, index) => (
                  <BaseLink
                    key={index}
                    link={link.path}
                    className={classnames({
                      active: cleanPath(this.props.location.pathname) === cleanPath(link.path)
                    })}
                  >
                    <li className="nav-item">{link.text}</li>
                  </BaseLink>
                ))}
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
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  ariaSiteTitle: PropTypes.string,
  ariaNavTitle: PropTypes.string,
  ariaNavLabel: PropTypes.string,
  logoLink: PropTypes.string,
  logoAriaLabel: PropTypes.string,
  logoAlt: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  showHamburger: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func
});

MainTopNav.defaultProps = {
  logoAlt: 'logo',
  logoLink: '/',
  logoAriaLabel: 'Home',
  ariaNavLabel: 'Main Navigation',
  setIsMobileMenuOpen: noop
};

export default withRouter(MainTopNav);