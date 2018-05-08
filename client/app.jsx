import React, {Component} from "react";
import {Route, Switch} from "react-router";
import {Grid} from "react-bootstrap";

import GamesDev from "./components/games/index.development";
import GamesProd from "./components/games/index.production";
import SandBox from "./components/games/sandbox";
import Inventory from "./components/inventory";
import Faq from "./components/faq";

import Message from "./components/common/message";
import NotFound from "./components/common/notfound";
import HeaderDev from "./components/common/header.development";
import HeaderProd from "./components/common/header.production";

import MetaMaskInstall from "./components/popups/metamask.install";
import MetaMaskLogin from "./components/popups/metamask.login";
import MetaMaskNetwork from "./components/popups/metamask.network";
import Register from "./components/popups/register";


// TODO remove this condition once we have proper staging
const isProd = typeof window !== "undefined" && window.document.location.host === "bitguild.com";

export default class App extends Component {
  render() {
    return (
      <>
        {isProd ? <HeaderProd /> : <HeaderDev />}
        {isProd ? null : <MetaMaskInstall />}
        {isProd ? null : <MetaMaskLogin />}
        {isProd ? null : <MetaMaskNetwork />}
        {isProd ? null : <Register />}
        <Grid fluid>
          <Message />
          <Switch>
            <Route path="/" component={isProd ? GamesProd : GamesDev} exact />
            <Route path="/sandbox" component={SandBox} exact />
            <Route path="/inventory" component={Inventory} />
            <Route path="/faq" component={Faq} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </>
    );
  }
}
