import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';
import { path } from 'ramda';
import Router from 'next/router';

import BGButton from '@/components/bgbutton';
import {
  withWallet,
} from '@/shared/utils/context';
import {
  client,
  mutations,
} from '@/shared/utils/apollo';

import * as bgLocalStorage from '@/client/utils/localStorage';


@connect(
  state => ({
    layout: state.layout,
    analytics: state.analytics,
  })
)
class Login extends Component {
  static propTypes = {
    analytics: PropTypes.object,
    dispatch: PropTypes.func,
    wallet: PropTypes.string,
  };

  state = {};

  static toHex(text) {
    return '0x' + Buffer.from(text, 'utf8').toString('hex');
  }

  async sign() {
    const {
      wallet,
    } = this.props;

    const { data } = await client.mutate({
      mutation: mutations.createSigningMessage,
      variables: { wallet, action: 'login' },
    });

    const signingMessage = path(['createSigningMessage', 'signingMessage'], data);

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [Login.toHex(signingMessage), wallet],
      from: wallet,
    }, async(err, result) => {
      if (err || result.error) {
        log.error(err || result.error);
        return;
      }

      const { data } = await client.mutate({
        mutation: mutations.login,
        variables: {
          wallet,
          signature: result.result,
        },
      });
      const {
        // user,
        tokenData,
      } = data.login;
      const {
        accessToken,
        refreshToken,
      } = tokenData;

      bgLocalStorage.setItem('refreshToken', refreshToken);
      bgLocalStorage.setItem('accessToken', accessToken);

      this.props.analytics.ga.event({
        category: 'Site Interaction',
        action: 'Sign-up',
        label: 'Create account',
      });

      Router.push('/');
    });
  }

  render() {
    const { wallet, layout } = this.props;
    const mobile = layout.type.mobile;

    return (
      <div className="login">
        <style jsx>{`
          .login {
            background: linear-gradient(to bottom, #B4D0F5, #D8D8EF);
            height: ${mobile ? null : 'calc(100vh - 62px)'};
          }
          .login-container {
            display: flex;
            align-items: center;
            width: ${mobile ? '100%' : '50%'};
            height: ${mobile ? null : '100%'};
            padding-bottom: ${mobile ? '30px' : null};
          }
          .login-header {
            margin-top: 60px;
            margin-bottom: 20px;
            text-align: center;
          }
          .login-wallet {
            display: block;
            width: 100%;
            margin-top: 20px;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-weight: 300;
            font-size: 12px;
          }
          .login-wallet-input {
            width: 100%;
            display: block;
            border: 0;
            outline: 0;
            background-color: #E0E6FC;
            margin-bottom: 30px;
            height: 45px;
            font-size: 14px;
            font-weight: 300;
          }
          .login-register-route {
            width: ${mobile ? '100%' : '50%'};
            display: block;
            margin-top: 20px;
            font-weight: .8em;
          }
          .login-register-route:hover {
            cursor: pointer;
          }
          .login-image-container {
            display: flex;
            align-items: center;
            width: ${mobile ? '100%' : '50%'};
            float: left;
            height: ${mobile ? null : '100%'};
            margin-top: ${mobile ? '30px' : null};
            margin-bottom: ${mobile ? '30px' : null};
          }
          .login-image {
            border-radius: 50%;
            width: 70%;
            display: block;
            margin-left: auto;
            margin-right: 15%;
            position: relative;
            max-width: 500px;
            max-height: 500px;
          }
          :glboal(.login-block) {
            width: ${mobile ? '75%' : '50%'};
            display: block;
            margin-right: auto;
            margin-left: ${mobile ? 'auto' : '15%'};
          }
          :global(.login-btn) {
            width: 100% !important;
            font-size: 18px !important;
            font-weight: 500 !important
          }
          .login-select-btn {
            width: ${mobile ? '80%' : '50%'};
            margin: 0 auto 0 auto;
          }
          :global(.btn-block-login-active) {
            color: white;
            background: #314B88;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            padding: 10px 0px 10px 0px !important;
          }
          :global(.btn-block-login) {
            color: #6C5A5A !important;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            background-color: #D7DEF6 !important;
            padding: 10px 0px 10px 0px !important;
          }
        `}</style>
        <div className="login-image-container">
          <img src="/static/images/misc/auth.png" className="login-image" />
        </div>
        <div className="login-container">
          <div className="login-block">
            <div className="login-select-btn">
              <BGButton className="btn-block-login text-uppercase">
                <FormattedHTMLMessage id="pages.register.register" />
              </BGButton>
              <BGButton className="btn-block-login-active text-uppercase" onClick={() => Router.push('/register')}>
                <FormattedHTMLMessage id="pages.register.login" />
              </BGButton>
            </div>
            <h1 className="login-header">
              <FormattedMessage id="components.login.welcome-back" />
            </h1>
            <span className="login-wallet">
              <FormattedMessage id="components.login.wallet" />
            </span>
            <input className="login-wallet-input" readOnly defaultValue={wallet}></input>
            <BGButton className="btn-block login-btn text-uppercase" onClick={() => ::this.sign(wallet)}>
              <FormattedMessage id="buttons.login" />
            </BGButton>
          </div>
        </div>
      </div>
    );
  }
}

export default withWallet(Login);
