import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import Cookies from 'js-cookie';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';
import { path, pathOr } from 'ramda';
import Router from 'next/router';

import BGButton from '@/components/bgbutton';
import {
  client,
  mutations,
  queries,
} from '@/shared/utils/apollo';
import { toHex } from '@/shared/utils';
import * as bgLocalStorage from '@/client/utils/localStorage';


@connect(
  state => ({
    analytics: state.analytics,
    layout: state.layout,
  })
)
class Login extends Component {
  static propTypes = {
    analytics: PropTypes.object,
    layout: PropTypes.object,
    dispatch: PropTypes.func,
    web3Wallet: PropTypes.string,
    query: PropTypes.object, // TODO - redirect context
  };

  state = {
    loggingIn: false,
    errors: [],
  };

  async sign() {
    const { web3Wallet } = this.props;
    const { data } = await client.mutate({
      mutation: mutations.createSigningMessage,
      variables: { wallet: web3Wallet, action: 'login' },
    });

    const signingMessage = path(['createSigningMessage', 'signingMessage'], data);

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [toHex(signingMessage), web3Wallet],
      from: web3Wallet,
    }, async(err, result) => {
      if (err || result.error) {
        log.error(err || result.error);
        return;
      }

      const { data, errors } = await client.mutate({
        errorPolicy: 'all',
        mutation: mutations.login,
        variables: {
          wallet: web3Wallet,
          signature: result.result,
        },
      });
      const { login } = data;
      this.setState({
        loggingIn: false,
        errors: errors || [],
      }, async() => {
        if (!login) return;
        const {
          user,
          tokenData,
        } = login;
        const {
          accessToken,
          refreshToken,
        } = tokenData;

        bgLocalStorage.setItem('accessToken', accessToken);
        bgLocalStorage.setItem('refreshToken', refreshToken);
        Cookies.set('accessToken', accessToken);

        // update me query
        await client.writeQuery({
          query: queries.me,
          data: { me: { ...user } },
        });

        // add me data into apollo cache
        await client.query({ query: queries.me });

        this.props.analytics.ga.event({
          category: 'Site Interaction',
          action: 'Sign-up',
          label: 'Create account',
        });
        const referrer = pathOr('/', ['query', 'pathname'], this.props);
        Router.replace(referrer);
      });
    });
  }

  render() {
    const { mobile } = this.props.layout.type;
    return (
      <div className="login">
        <style jsx>{`
          .login {
            width: ${mobile ? '70%' : '70%'};
          }
          .login-header {
            margin-bottom: 40px;
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
            text-align: center;
          }
          .login-select-btn {
            width: ${mobile ? '80%' : '50%'};
            margin: 0 auto 0 auto;
          }
          .line-break {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 40px auto;
          }
          .line-break-text {
            flex-grow: 1;
            text-align: center;
          }
          .line {
            border-bottom: 1px solid black;
            flex-grow: 1;
          }
          .login .bg-link {
            text-align: center;
            margin: 20px auto;
          }
        `}</style>
        <h1 className="login-header">
          <FormattedMessage id="components.login.welcome-back" />
        </h1>
        <span className="login-wallet">
          <FormattedMessage id="components.login.wallet" />
        </span>
        <input className="login-wallet-input" readOnly defaultValue={this.props.web3Wallet}></input>
        <BGButton className="btn-block login-btn text-uppercase" onClick={::this.sign}>
          <FormattedMessage id="buttons.login" />
        </BGButton>
        {this.state.errors.map(e => e.message).map((m, i) => <p key={i} className="bg-error-message">{m}</p>)}

        <div className="line-break">
          <div className="line" />
          <span className="line-break-text"><FormattedMessage id="pages.register.no-account" /></span>
          <div className="line" />
        </div>

        <BGButton className="btn-block text-uppercase" onClick={() => Router.push('/register')}>
          <FormattedHTMLMessage id="pages.register.register" />
        </BGButton>
        <div className="bg-link" onClick={() => Router.push('/faq')}>
          <FormattedMessage id="pages.register.questions-faq" />
        </div>
      </div>
    );
  }
}

export default Login;
