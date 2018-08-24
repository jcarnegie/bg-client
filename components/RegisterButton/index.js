import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
      wallet: PropTypes.string,
      network: PropTypes.object,
    }),
  }

  state = {
    timeout: null,
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

  componentDidMount() {
    this.setState({
      /* Delay Hack to prevent flicker of register button on initial render */
      timeout: setTimeout(() => this.setState({ timeout: null }), 2000),
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    return (
      <WalletContext.Consumer>
        {({ wallet }) => {
          const { root } = this.props;
          const { network } = root;

          /* Delay Hack to prevent flicker of register button on initial render */
          if (this.state.timeout) return null;

          /* If user does not have web3, show "register" */
          if (!network.available) {
            return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
          }

          /* Not on supported network, show "login" */
          if (!network || !network.supported) {
            return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
          }

          /* Render register if no wallet */
          if (!wallet) return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);

          return (
            <Query
              query={queries.viewUserByWallet}
              variables={{ wallet }}
              fetchPolicy="no-cache"
            >
              {({ data }) => {
                /* Render null if loading */
                if (data && data.loading) return null;

                /* Render register if error */
                if (data && data.error) return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);


                /* If wallet and user are available, show nothing */
                if (data) {
                  return null;
                }

                /* If user is logged into web3 but does not have a user account, show "register" */
                if (!data) {
                  return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
                }

                return null;
              }}
            </Query>
          );
        }}
      </WalletContext.Consumer>
    );
  }
}

export default compose(
  graphql(localQueries.root, { name: 'root' }),
)(RegisterButton);
