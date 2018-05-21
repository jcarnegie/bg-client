import "./index.less";
import React, {Component} from "react";
import {Col, Image, Row} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";
import Chat from "../chat/chat";


export default class Airdrop extends Component {
  render() {
    return (
      <Row>
        <Col md={9} className="gap airdrop">
          <h2 className="title"><FormattedHTMLMessage id="pages.airdrop.title" /></h2>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p1" /></strong></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p4" /></strong></p>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p5" /></strong></p>
          <Image src="/images/airdrop.png" />
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
