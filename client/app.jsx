import React, {Component} from "react";
import {Route, Switch} from "react-router";

import Community from "./components/community";
import Exchange from "./components/exchange";
import GamesDev from "./components/games/index.development";
import GamesProd from "./components/games/index.production";
import SandBox from "./components/games/sandbox";
import Inventory from "./components/inventory";

import Message from "./components/common/message";
import NotFound from "./components/common/notfound";
import HeaderDev from "./components/common/header.development";
import HeaderProd from "./components/common/header.production";
import MetaMask from "./components/common/metamask";
import Register from "./components/common/register";
import {Grid} from "react-bootstrap";


// TODO remove this condition once we have proper staging
const isProd = typeof window !== "undefined" && window.document.location.host === "bitguild.com";

export default class App extends Component {
  render() {
    return (
      <div>
        {isProd ? <HeaderProd /> : <HeaderDev />}
        <MetaMask />
        <Register />
        <Grid>
          <Message />
          <Switch>
            <Route path="/" component={isProd ? GamesProd : GamesDev} exact />
            <Route path="/sandbox" component={SandBox} exact />
            <Route path="/community" component={Community} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/inventory" component={Inventory} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    );
  }
}
