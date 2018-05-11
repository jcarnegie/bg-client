import React, {Component} from "react";
import {Switch} from "react-router";
import {Grid} from "react-bootstrap";

import GameList from "./components/games/index";
import Game from "./components/games/game";
import SandBox from "./components/games/sandbox";
import Inventory from "./components/inventory";
import Faq from "./components/faq";

import Message from "./components/common/message";
import NotFound from "./components/common/notfound";
import Header from "./components/common/header";

import MetaMaskInstall from "./components/popups/metamask.install";
import MetaMaskLogin from "./components/popups/metamask.login";
import MetaMaskNetwork from "./components/popups/metamask.network";
import Register from "./components/popups/register";
import MyRoute from "./components/inventory/my-route";


export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <MetaMaskInstall />
        <MetaMaskLogin />
        <MetaMaskNetwork />
        <Register />
        <Grid fluid>
          <Message />
          <Switch>
            <MyRoute path="/" component={GameList} exact />
            <MyRoute path="/game/:_id" component={Game} exact />
            <MyRoute path="/sandbox" component={SandBox} exact />
            <MyRoute path="/inventory" component={Inventory} />
            <MyRoute path="/faq" component={Faq} />
            <MyRoute component={NotFound} />
          </Switch>
        </Grid>
      </>
    );
  }
}
