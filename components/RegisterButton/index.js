import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { USER_SHOW_REGISTER_WORKFLOW } from '@/shared/constants/actions';

@injectIntl
@connect(
  state => ({
    account: state.account,
    network: state.network,
    user: state.user,
  })
)
class RegisterButton extends Component {
  static propTypes = {
    account: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  state = {}

  renderButtonWithText(text) {
    const { dispatch, user } = this.props;
    return (
      <button className="register-button" onClick={() => dispatch({
        type: USER_SHOW_REGISTER_WORKFLOW,
        payload: !user.showRegisterWorkflow,
      })}>
        <style jsx>{`
          .register-button {
            color: white;
            margin: 0 -15px 0 0;
            border: 0;
            background-color: #5DBE81;
            padding: 0 30px;
            text-transform: uppercase;
            font-weight: 100;
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
    const { account, network, user } = this.props;

    /* Delay Hack to prevent flicker of register button on initial render */
    if (this.state.timeout) return null;

    /* Render null if loading */
    if (user.isLoading || network.isLoading) return null;

    /* If network has not resolved, show nothing */
    if (network.isLoading) {
      return null;
    }

    /* If user does not have web3, show "register" */
    if (!network.available) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
    }

    /* Not on supported network, show "login" */
    if (!network.data || !network.data.supported) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
    }

    /* If wallet and user are available, show nothing */
    if (account.wallet && user.data) {
      return null;
    }

    /* If user is logged into web3 but does not have a user account, show "register" */
    if (account.wallet && !user.data) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.register" />);
    }

    /* If wallet is not available, but user is still defined in apollo cache, show render null */
    if (!account.wallet && user.data) {
      return null;
    }

    /* If wallet is not available, but user has web3, show "login" */
    if (!account.wallet && !user.data) {
      return ::this.renderButtonWithText(<FormattedMessage id="buttons.login" />);
    }

    return null;
  }
}

export default RegisterButton;
