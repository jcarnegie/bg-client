import "./index.less";
import React, {Component} from "react";
import {Button, Row, Col, Image} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import Chat from "../chat/chat";


export default class Airdrop extends Component {
  render() {
    return (
      <Row>
        <Col md={9} className="gap airdrop">
          <h2><FormattedMessage id="pages.airdrop.title" /></h2>
          <h3><FormattedMessage id="pages.airdrop.description" /></h3>

          <p><FormattedHTMLMessage id="pages.airdrop.p1" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p4" /></p>

          <Image src="/images/airdrop.png" />

          <p><FormattedHTMLMessage id="pages.airdrop.p5" /></p>

          <ul>
            <li><FormattedHTMLMessage id="pages.airdrop.l1" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l2" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l3" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l4" /></li>
          </ul>

          <p><FormattedHTMLMessage id="pages.airdrop.p6" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p7" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p8" /></p>

          <Button href="/game/ether.online">
            <Image src="/images/buttons/play/white.png" />
            <FormattedMessage id="pages.airdrop.play" />
          </Button>
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
