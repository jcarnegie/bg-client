import * as log from 'loglevel';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { path } from 'ramda';
import {
  compose,
  graphql,
  Query,
} from 'react-apollo';

import {
  client,
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';

import { WalletContext } from '@/shared/utils/context';


class RegisterButton extends Component {
  static propTypes = {
    root: PropTypes.shape({
      network: PropTypes.object,
      user: PropTypes.object,
    }),
  }

  renderButtonWithText(text) {
    return (
      <button className="register-button" onClick={() => client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow })}>
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
        {text}
      </button>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <WalletContext.Consumer>
        {({
          web3Wallet,
          network,
          networkHasChanged,
          isUserLoggedOutOfMetaMask,
          userNeedsToLogInOrRegister,
          userWalletHasChanged,
          isCurrentWalletLinked,
        }) => {
          /* Network must be defined */
          if (!network) return null;

          /* If user does not have web3, show "register" */
          if (!network.available) {
            return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
          }

          /* Not on supported network, show "login" */
          /* Render login if error */
          if (!network.supported || path(['error'], user)) {
            return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
          }

          /* Render null if user loading */
          if (path(['loading'], user)) return null;

          /* If user wallet is not linked */
          if (userWalletHasChanged && isCurrentWalletLinked) {
            return ::this.renderButtonWithText(<FormattedMessage id="global.link-wallet" />);
          }  
        }}
      </WalletContext.Consumer>
    );
  }
}


export default RegisterButton;
