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
        <nav className="footer-nav" aria-label={props.ariaNavLabel}>
          <ul className="nav-list">
            {props.links.map((link, index) => {
              if (link.type === 'link') {
                return (
                  <li key={index} className="nav-item">
                    <BaseLink link={link.path}>{link.text}</BaseLink>
                  </li>
                );
              } else if (link.type === 'image-link') {
                return (
                  <li key={index} className="footer-image">
                    <p className="footer-image-title">powered by</p>
                    <BaseLink link={link.path}>
                      <div className="footer-logo" />
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
      {/* {props.children}
      {props.copyright && <p className="footer-copyright">{props.copyright}</p>} */}
    </footer>
  ))
);

Footer.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  ariaNavLabel: PropTypes.string,
  copyright: PropTypes.string
});

Footer.defaultProps = {
  ariaNavLabel: 'Footer Navigation',
  copyright: '© Copyright'
};

export default Footer;
