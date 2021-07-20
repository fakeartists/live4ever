import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Footer.scss';

import BaseLink from '../BaseLink/BaseLink';

const Footer = React.memo(
  React.forwardRef((props, ref) => (
    <footer className={classnames('Footer', props.className)} ref={ref}>
      {props.links && (
        <nav className="footer-nav" aria-label={props.copy.ariaNavLabel}>
          <ul className="nav-list">
            {props.links.map((link, index) => {
              if (link.type === 'link') {
                return (
                  <li key={index} className="nav-item">
                    <BaseLink link={link.path}>{props.copy[link.text]}</BaseLink>
                  </li>
                );
              } else if (link.type === 'image-link') {
                return (
                  <li key={index} className="footer-image">
                    <p className="footer-image-title">{props.copy.title}</p>
                    <BaseLink link={link.path}>
                      <div
                        className="footer-logo"
                        aria-label={props.copy.logoAriaLabel}
                        alt={props.copy.logoAriaLabel}
                      />
                    </BaseLink>
                  </li>
                );
              } else {
                return <li key={index} className="nav-item-empt" />;
              }
            })}
          </ul>
        </nav>
      )}
    </footer>
  ))
);

Footer.propTypes = checkProps({
  copy: PropTypes.object,
  className: PropTypes.string,
  copyright: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  )
});

Footer.defaultProps = {
  copy: {
    title: '',
    logoAriaLabel: '',
    ariaNavLabel: 'Footer Navigation',
    text_copyright: '© Copyright'
  }
};

export default Footer;
