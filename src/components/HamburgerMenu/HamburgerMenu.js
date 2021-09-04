import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import { setLoginState } from '../../redux/modules/login';
import checkProps from '@jam3/react-check-extra-props';
import { checkCookieLogin } from '../../util/cookies';
import BaseLink from '../BaseLink/BaseLink';

import './HamburgerMenu.scss';

class HamburgerMenu extends React.PureComponent {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.closeOnRouteChange && prevProps.location.pathname !== this.props.location.pathname) {
      this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
    }
  }

  componentWillUnmount() {
    this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
  }

  handleLoginClick = () => {
    this.props.setLoginState(true);
  };

  render() {
    let logged = checkCookieLogin();

    return (
      <nav
        className={classnames(`HamburgerMenu`, this.props.className, { open: this.props.isMobileMenuOpen })}
        ref={r => (this.container = r)}
      >
        {this.props.links && (
          <ul className="nav-list">
            {this.props.links.map((link, index) => {
              if (link.path === 'login') {
                return (
                  <li
                    key={index}
                    className={'nav-item login' + (logged ? ' active' : '')}
                    onClick={this.handleLoginClick}
                  >
                    {this.props.copy[logged ? link.alt_text : link.text]}
                  </li>
                );
              } else {
                return (
                  <li key={index} className="nav-item">
                    <BaseLink
                      link={link.path}
                      className={classnames({
                        active: cleanPath(this.props.location.pathname) === cleanPath(link.path)
                      })}
                    >
                      {this.props.copy[link.text]}
                    </BaseLink>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {this.props.children}
        <div className="side-links">
          <BaseLink className="side-link" link={this.props.privacy.link}>
            {this.props.copy[this.props.privacy.copy]}
          </BaseLink>
        </div>
      </nav>
    );
  }
}

HamburgerMenu.propTypes = checkProps({
  className: PropTypes.string,
  copy: PropTypes.object,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  privacy: PropTypes.object,
  closeOnRouteChange: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  setLoginState: PropTypes.func,
  loginState: PropTypes.bool
});

HamburgerMenu.defaultProps = {
  copy: {},
  setIsMobileMenuOpen: noop,
  closeOnRouteChange: true
};

const mapStateToProps = state => ({
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
  )(HamburgerMenu)
);
