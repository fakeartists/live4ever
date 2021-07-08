import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './WindowsHeader.scss';

export class WindowsHeader extends React.PureComponent {
  render() {
    const { className, component } = this.props;
    const Component = component;
    this.buttonActive = this.props.isActive ? 'active' : '';

    return (
      <Component className={classnames('WindowsHeader', className)}>
        <ul>
          <li className={'windows-header-close ' + this.buttonActive} onClick={this.props.onClose}>
            X
          </li>
          <li className={'windows-header-windows ' + this.buttonActive} onClick={this.props.onWindows} />
          <li className={'windows-header-minimize ' + this.buttonActive} onClick={this.props.onMinimize}>
            _
          </li>
        </ul>
      </Component>
    );
  }
}

WindowsHeader.propTypes = checkProps({
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
  onWindows: PropTypes.func,
  onMinimize: PropTypes.func
});

WindowsHeader.defaultProps = {
  isActive: false,
  onClose: () => {},
  onWindows: () => {},
  onMinimize: () => {}
};

WindowsHeader.defaultProps = {
  component: 'header'
};

export default WindowsHeader;
