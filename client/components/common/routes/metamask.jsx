import React, {Component} from "react";
import {Route} from "react-router";

import MetaMaskInstall from "../../popups/metamask.install";
import MetaMaskLogin from "../../popups/metamask.login";
import MetaMaskNetwork from "../../popups/metamask.network";


export default class MetaMaskRoute extends Component {
  render() {
    return (
      <Route render={({location}) => {
        if (location.pathname === "/faq") {
          return null;
        } else {
          return (
            <>
              <MetaMaskInstall />
              <MetaMaskLogin />
              <MetaMaskNetwork />
            </>
          );
        }
      }} />
    );
  }
}
