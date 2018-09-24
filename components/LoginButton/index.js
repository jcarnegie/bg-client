import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Router from 'next/router';


class LoginButton extends Component {
  static propTypes = {
    show: PropTypes.bool,
  }

  render() {
    if (!this.props.show) return null;
    return (
      <button className="register-button" onClick={() => Router.push('/login')}>
        <style jsx>{`
          .register-button {
            color: white;
            margin: 0 -15px 0 0;
            border: 0;
            background-color: #5DBE81;
            padding: 0 30px;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1px;
            height: 62px;
            outline: none;
          }
          :global(.settings .register-button span) {
            vertical-align: middle;
          }
          .register-button:hover, .register-button:focus {
            background-color: #54A97C;
          }
          .register-icon {
            width: 14px;
            height: 24px;
            margin-right: 8px;
          }
        `}</style>
        <img className="register-icon" src="/static/images/icons/register.png" />
        <FormattedMessage id="buttons.login" />
      </button>
    );
  }
}


export default LoginButton;
