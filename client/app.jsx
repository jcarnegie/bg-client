import React, {Component} from "react";
import {Route, Switch} from "react-router";

import Community from "./components/community";
import Exchange from "./components/exchange";
import Games from "./components/games";
import Inventory from "./components/inventory";

import Message from "./components/common/message";
import NotFound from "./components/common/notfound";
import Header from "./components/common/header";
import MetaMask from "./components/common/metamask";
import Register from "./components/common/register";
import {Grid} from "react-bootstrap";


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MetaMask />
        <Register />
        <Grid>
          <Message />
          <Switch>
            <Route path="/" component={Games} exact />
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
