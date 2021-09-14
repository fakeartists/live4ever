import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
import animate, { Circ } from '../../util/gsap-animate';
import WindowsHeader from '../WindowsHeader/WindowsHeader';
import { setLoginState } from '../../redux/modules/login';
import settings from '../../data/settings';
import { getCopy } from '../../data/get-site-data';
import { updateCookie, checkCookieLogin, setName } from '../../util/cookies';

import './Login.scss';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = getCopy(this.props.language, 'login');

    this.isOpen = false;
    this.state = {
      active: true
    };
  }

  componentDidMount() {
    this.props.setLoginState(this.props.isOpen);
    animate.set(this.container, { autoAlpha: 0 });
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      if (!this.isOpen) {
        this.animateIn();
        this.isOpen = true;
      }
    } else {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
  };

  animateOut = () => {
    return animate.to(this.container, 0.3, { autoAlpha: 0, ease: Circ.easeOut });
  };

  handleClose = () => {
    this.animateOut().then(() => {
      this.props.setLoginState(false);
    });
  };

  logoutResponse = () => {
    updateCookie({ login: null });

    this.setState({ active: true });
    this.handleClose();
  };

  loginResponse = response => {
    const cookiedata = {
      id: response.googleId,
      name: setName(response.profileObj.name),
      email: response.profileObj.email,
      image: response.profileObj.imageUrl,
      token: response.accessToken
    };
    updateCookie({ login: cookiedata });

    this.setState({ active: true });
    this.handleClose();
  };

  errorResponse = response => {
    this.setState({ active: true });

    //to do?
    //console.log('error::', response);
  };

  onRequestConnection = () => {
    this.setState({ active: false });
  };

  render() {
    let title;
    let copy;
    let button;
    let active = !this.state.active;
    if (checkCookieLogin()) {
      title = <h1 className="logout">{this.copy.connected_title}</h1>;
      copy = '';
      button = (
        <GoogleLogout
          className="login-bt"
          clientId={settings.clientID}
          buttonText={this.copy.connected_button}
          theme="dark"
          onLogoutSuccess={this.logoutResponse}
          disabled={active}
        />
      );
    } else {
      title = <h1>{this.copy.disconected_title}</h1>;
      copy = <p>{this.copy.disconected_desc}</p>;
      button = (
        <GoogleLogin
          className="login-bt"
          clientId={settings.clientID}
          buttonText={this.copy.disconected_button}
          onSuccess={this.loginResponse}
          onFailure={this.errorResponse}
          theme="dark"
          cookiePolicy={'single_host_origin'}
          onRequest={this.onRequestConnection}
          disabled={active}
        />
      );
    }

    return (
      <section className="Login" ref={el => (this.container = el)}>
        <div className="login-bg" />
        <div className="login-container">
          <WindowsHeader isActive={true} onClose={this.handleClose} />
          <div className="login-info">
            {title}
            {copy}
          </div>
          <div className="login-bt-container">{button}</div>
        </div>
      </section>
    );
  }
}

Login.propTypes = checkProps({
  language: PropTypes.string,
  setLoginState: PropTypes.func,
  isOpen: PropTypes.bool
});

Login.defaultProps = {
  language: 'en',
  isOpen: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.loginState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoginState: val => dispatch(setLoginState(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Login);
