import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';

import './HamburgerMenu.scss';

import BaseLink from '../BaseLink/BaseLink';

class HamburgerMenu extends React.PureComponent {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.closeOnRouteChange && prevProps.location.pathname !== this.props.location.pathname) {
      this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
    }
  }

  componentWillUnmount() {
    this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
  }

  render() {
    console.log(this.props);
    return (
      <nav
        className={classnames(`HamburgerMenu`, this.props.className, { open: this.props.isMobileMenuOpen })}
        ref={r => (this.container = r)}
      >
        {this.props.links && (
          <ul className="nav-list">
            {this.props.links.map((link, index) => (
              <li key={index} className="nav-item">
                <BaseLink
                  link={link.path}
                  className={classnames({ active: cleanPath(this.props.location.pathname) === cleanPath(link.path) })}
                >
                  {this.props.copy[link.text]}
                </BaseLink>
              </li>
            ))}
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
  setIsMobileMenuOpen: PropTypes.func
});

HamburgerMenu.defaultProps = {
  copy: {},
  setIsMobileMenuOpen: noop,
  closeOnRouteChange: true
};

export default withRouter(HamburgerMenu);
