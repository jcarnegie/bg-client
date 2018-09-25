import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';
import { path } from 'ramda';
import Router from 'next/router';

import BGButton from '@/components/bgbutton';
import { toHex } from '@/shared/utils';
import {
  client,
  mutations,
  queries,
} from '@/shared/utils/apollo';

import * as bgLocalStorage from '@/client/utils/localStorage';


@connect(
  state => ({
    analytics: state.analytics,
  })
)
class LinkWallets extends Component {
  static propTypes = {
    analytics: PropTypes.object,
    dispatch: PropTypes.func,
    web3Wallet: PropTypes.string,
    query: PropTypes.object, // TODO - redirect context
  };

  state = {};

  async sign() {
    const { web3Wallet } = this.props;
    const { data } = await client.mutate({
      mutation: mutations.createSigningMessage,
      variables: { wallet: web3Wallet, action: 'linkWallet' },
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

      const { data } = await client.mutate({
        mutation: mutations.linkWallet,
        variables: {
          wallet: web3Wallet,
          signature: result.result,
        },
      });
      const {
        // user,
        tokenData,
      } = data.linkWallet;
      const {
        accessToken,
        refreshToken,
      } = tokenData;

      bgLocalStorage.setItem('accessToken', accessToken);
      bgLocalStorage.setItem('refreshToken', refreshToken);

      // add me data into apollo cache
      await client.query({ query: queries.me });

      this.props.analytics.ga.event({
        category: 'Site Interaction',
        action: 'Link-Wallet',
        label: 'Link wallet',
      });

      // TODO - redirect to last context / requested route
      Router.replace('/');
    });
  }

  render() {
    const { web3Wallet } = this.props;
    return (
      <div className="link-wallet-container">
        <style jsx>{`
          .link-wallet-container {
            width: 500px;
            margin: 100px auto;
          }
          .link-wallet-header {
            margin-bottom: 40px;
            text-align: center;
          }
          .link-wallet-button-group {
            margin-top: 20px;
          }
          .link-wallet {
            display: block;
            width: 100%;
            margin-top: 20px;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-weight: 300;
            font-size: 12px;
          }
          .link-wallet-input {
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
          .link-wallet-text {
            width: 100%;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .link-wallet-container .bg-link {
            margin: 5px auto 0 auto;
            text-align: center;
          }
          .link-wallet-container .register-link {
            margin-top: 20px;
          }
        `}</style>
        <h1 className="link-wallet-header"><FormattedMessage id="pages.link-wallet.new-wallet-found" /></h1>
        <span className="link-wallet"><FormattedMessage id="components.login.wallet" /></span>
        <input className="link-wallet-input" readOnly defaultValue={web3Wallet}></input>
        <div className="link-wallet-text"><FormattedMessage id="pages.link-wallet.link-wallet" /></div>
        <BGButton className="btn-block text-uppercase" onClick={::this.sign}>
          <FormattedMessage id="pages.link-wallet.cta" />
        </BGButton>
        <div className="link-wallet-button-group">
          <div className="bg-link" onClick={() => Router.push('/login')}>
            <FormattedHTMLMessage id="pages.register.already-registered" />
          </div>
          <div className="bg-link" onClick={() => Router.push('/register')}>
            <FormattedHTMLMessage id="components.login.register" />
          </div>
        </div>
      </div>
    );
  }
}

export default LinkWallets;