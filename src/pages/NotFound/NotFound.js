import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './NotFound.scss';

import { ReactComponent as NotFoundIcon } from '../../assets/svg/not-found-icon.svg';

const NotFound = props => {
  const componentProps = {
    className: classnames('NotFound', props.className)
  };

  return (
    <div {...componentProps}>
      <NotFoundIcon />
      <h1>Not Found</h1>
    </div>
  );
};

NotFound.propTypes = checkProps({
  language: PropTypes.string,
  className: PropTypes.string
});

NotFound.defaultProps = {
  language: 'en',
  className: ''
};

export default NotFound;
