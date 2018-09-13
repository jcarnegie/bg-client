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
        // accessToken,
        refreshToken,
      } = tokenData;
      bgLocalStorage.setItem('refreshToken', refreshToken);

      this.props.analytics.ga.event({
        category: 'Site Interaction',
        action: 'Sign-up',
        label: 'Create account',
      });
    });
  }

  render() {
    const { wallet } = this.props;
    return (
      <div className="login-container">
        <style jsx>{`
          .login-container {
            width: 500px;
            margin: 100px auto;
          }
          .login-header {
            margin-bottom: 20px;
          }
          .login-wallet {
            width: 100%;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .login-wallet-input {
            width: 100%;
            margin-bottom: 10px;
          }
          .login-register-route {
            display: inline-block;
            margin-top: 20px;
            font-weight: .8em;
          }
          .login-register-route:hover {
            cursor: pointer;
          }
        `}</style>
        <h2 className="login-header">
          <FormattedMessage id="global.login" />
        </h2>
        <span className="login-wallet">
          <FormattedMessage id="components.login.wallet" />
        </span>
        <input className="login-wallet-input" readOnly defaultValue={wallet}></input>
        <BGButton className="btn-block text-uppercase" onClick={() => ::this.sign(wallet)}>
          <FormattedMessage id="buttons.login" />
        </BGButton>
        <span className="login-register-route" onClick={() => Router.push('/register')}>
          <FormattedHTMLMessage id="components.login.register" />
        </span>
      </div>
    );
  }
}

export default withWallet(Login);
