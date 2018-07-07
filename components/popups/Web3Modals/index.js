import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import * as log from "loglevel";
import {withRouter} from "next/router";

import {
  USER_SHOW_REGISTER_WORKFLOW,
} from "@/shared/constants/actions";

import {
  networkIsSupported,
} from "@/shared/utils/network";

import Web3Install from "@/components/popups/Web3Modals/Web3.install";
import Web3Login from "@/components/popups/Web3Modals/Web3.login";
import Web3Network from "@/components/popups/Web3Modals/Web3.network";
import Register from "@/components/popups/register";


@injectIntl
@withRouter
@connect(
  state => ({
    account: state.account,
    network: state.network,
    user: state.user,
  })
)
class Web3 extends Component {
  static propTypes = {
    account: PropTypes.object,
    router: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    pathname: PropTypes.string,
  };

  static getInitialProps(ctx) {
    let props = {};
    if (ctx && ctx.req) props.pathname = ctx.req.originalUrl;
    return props;
  }

  hideRegistrationWorkflowModals() {
    return this.props.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: false});
  }

  render() {
    const {network, account, pathname, router, user} = this.props;

    const guestRoutes = [
      "",
      "faq",
      "events",
      "presale",
    ];

    /* Regex is insensitive, matches startswith. Ex: presale/bitizens is public. */
    const matchExp = new RegExp(`^(${guestRoutes.reduce((a, b) => (a + `|\\/${b}`))})`, "i");
    const path = pathname || router.pathname;

    if (!path || (path.match(matchExp) && !user.showRegisterWorkflow)) {
      return null;
    }

    if (user.showRegisterWorkflow && !network.available) {
      return <Web3Install show onHide={::this.hideRegistrationWorkflowModals} />;
    }

    const onSupportedNetwork = networkIsSupported(network);
    const networkLoadedSuccess = !network.isLoading && network.success;
    const showNetwork = networkLoadedSuccess && !onSupportedNetwork;
    const showWeb3Login = !account.isLoading && !account.wallet;
    const showRegister = !showNetwork && !showWeb3Login && (
      user.showRegisterWorkflow || (
        networkLoadedSuccess && onSupportedNetwork && !user.isLoading && !user.success
      )
    );

    log.info(`show modals: network: ${showNetwork}, login: ${showWeb3Login}, register: ${showRegister}`);

    return (
      <>
        <Web3Login show={showWeb3Login} onHide={::this.hideRegistrationWorkflowModals} />
        <Web3Network show={showNetwork} onHide={::this.hideRegistrationWorkflowModals} />
        <Register show={showRegister} onHide={::this.hideRegistrationWorkflowModals} />
      </>
    );
  }
}

export default Web3;
