import React, {Component} from "react";
import {Switch} from "react-router";
import {Grid} from "react-bootstrap";
import ReactGA from "react-ga";

import GameList from "./components/games/index";
import Game from "./components/games/game";
import SandBox from "./components/games/sandbox";
import Inventory from "./components/inventory";
import Faq from "./components/faq";
import Airdrop from "./components/airdrop";

import Message from "./components/common/message";
import NotFound from "./components/common/notfound";
import Header from "./components/common/header";
import Register from "./components/popups/register";

import LLRoute from "./components/common/routes/last-location";
import MMRoute from "./components/common/routes/metamask";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <MMRoute />
        <Register />
        <Grid fluid>
          <Message />
          <Switch>
            <LLRoute path="/" component={GameList} exact />
            <LLRoute path="/game/:_id" component={Game} exact />
            <LLRoute path="/sandbox" component={SandBox} exact />
            <LLRoute path="/inventory" component={Inventory} />
            <LLRoute path="/faq" component={Faq} />
            <LLRoute path="/airdrop" component={Airdrop} />
            <LLRoute component={NotFound} />
          </Switch>
        </Grid>
      </>
    );
  }
}
