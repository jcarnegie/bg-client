import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  client,
  viewUserByWalletQuery,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';


class RegisterButton extends Component {
  static propTypes = {
    root: PropTypes.shape({
      wallet: PropTypes.string,
      network: PropTypes.object,
    }),
    user: PropTypes.object,
  }

  state = {}

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

  componentDidMount() {
    /* Delay Hack to prevent flicker of register button on initial render */
    this.setState({ timeout: setTimeout(() => this.setState({ timeout: null }), 2000) });
  }

  render() {
    const { root, user } = this.props;
    const { wallet, network } = root;

    /* Delay Hack to prevent flicker of register button on initial render */
    if (this.state.timeout) return null;

    /* Render null if loading */
    if (user.loading) return null;

    /* If user does not have web3, show "register" */
    if (!network.available) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
    }

    /* Not on supported network, show "login" */
    if (!network || !network.supported) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
    }

    /* If wallet and user are available, show nothing */
    if (wallet && user.viewUserByWallet) {
      return null;
    }

    /* If user is logged into web3 but does not have a user account, show "register" */
    if (wallet && !user.viewUserByWallet) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
    }

    /* If wallet is not available, but user is still defined in apollo cache, show render null */
    if (!wallet && user.viewUserByWallet) {
      return null;
    }

    /* If wallet is not available, but user has web3, show "login" */
    if (!wallet && !user.viewUserByWallet) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
    }

    return null;
  }
}

export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root, { name: 'root' }),
)(RegisterButton);
