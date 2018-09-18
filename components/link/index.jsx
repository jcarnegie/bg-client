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
      variables: { wallet, action: 'linkWallet' },
    });

    const signingMessage = path(['createSigningMessage', 'signingMessage'], data);

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [LinkWallets.toHex(signingMessage), wallet],
      from: wallet,
    }, async(err, result) => {
      if (err || result.error) {
        log.error(err || result.error);
        return;
      }

      const { data } = await client.mutate({
        mutation: mutations.linkWallet,
        variables: {
          wallet,
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
      const { me } = await client.query({ query: queries.me });
      console.log('zzz linkWallet me: ', me);

      this.props.analytics.ga.event({
        category: 'Site Interaction',
        action: 'Link-Wallet',
        label: 'Link wallet',
      });
    });
  }

  render() {
    const { wallet } = this.props;
    return (
      <div className="link-wallet-container">
        <style jsx>{`
          .link-wallet-container {
            width: 500px;
            margin: 100px auto;
          }
          .link-wallet-header {
            margin-bottom: 20px;
          }
          .link-wallet-button-group {
            margin-top: 20px;
          }
          .link-wallet-input {
            width: 100%;
            margin-bottom: 10px;
          }
          .link-wallet-text {
            width: 100%;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .login-register-route{
            margin-top: 20px;
            font-weight: .8em;
          }
          .login-register-route:hover {
            cursor: pointer;
          }
        `}</style>
        <h2 className="link-wallet-header">
          <FormattedMessage id="pages.link-wallet.new-wallet-found" />
        </h2>
        <input className="link-wallet-input" readOnly defaultValue={wallet}></input>

        <div className="link-wallet-button-group">
          <span className="link-wallet-text">
            <FormattedHTMLMessage id="pages.link-wallet.link-wallet" />
          </span>
          <BGButton className="btn-block text-uppercase" onClick={() => ::this.sign(wallet)}>
            <FormattedMessage id="pages.link-wallet.cta" />
          </BGButton>
        </div>


        <div className="link-wallet-button-group">
          <div className="login-register-route" onClick={() => Router.push('/login')}>
            <FormattedHTMLMessage id="pages.register.already-registered" />
          </div>
          <div className="login-register-route" onClick={() => Router.push('/register')}>
            <FormattedHTMLMessage id="components.login.register" />
          </div>
        </div>
      </div>
    );
  }
}

export default withWallet(LinkWallets);
