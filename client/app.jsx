import React, {Component} from "react";
import {Switch} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";

import GameList from "./components/games/index";
import Game from "./components/games/game";
import SandBox from "./components/games/sandbox";
import Inventory from "./components/inventory";
import Faq from "./components/faq";
import Airdrop from "./components/airdrop";

import Message from "./components/common/message";
import MetaMask from "./components/common/metamask";
import NotFound from "./components/common/notfound";
import Header from "./components/common/header";
import GAListener from "./components/common/galistener";

import LLRoute from "./components/common/routes/last-location";
import Chat from "./components/chat/chat";


export default class App extends Component {
  render() {
    return (
      <>
        <GAListener trackingId={process.env.GOOGLE_ANALYTICS_TRACKING_ID} />
        <Header />
        <MetaMask />
        <Grid fluid className="app-grid">
          <Message />
          <Row>
            <Col className="content">
              <Switch>
                <LLRoute path="/" component={GameList} exact />
                <LLRoute path="/game/:_id" component={Game} exact />
                <LLRoute path="/sandbox" component={SandBox} exact />
                <LLRoute path="/inventory" component={Inventory} />
                <LLRoute path="/faq" component={Faq} />
                <LLRoute path="/airdrop" component={Airdrop} />
                <LLRoute component={NotFound} />
              </Switch>
            </Col>
            <Chat />
          </Row>
        </Grid>
      </>
    );
  }
}
