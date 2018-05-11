import "./index.less";
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {Col, Row} from "react-bootstrap";
import Chat from "../chat/chat";


export default class Faq extends Component {
  render() {
    return (
      <Row className="faq">
        <Col md={9} className="gap content">
          <h2><FormattedMessage id="pages.faq.title" /></h2>

          <h3><FormattedMessage id="pages.faq.metamask.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.metamask.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.metamask.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.metamask.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.metamask.a2" /></dd>
            <dt><FormattedMessage id="pages.faq.metamask.q3" /></dt>
            <dd><FormattedMessage id="pages.faq.metamask.a3" /></dd>
            <dt><FormattedMessage id="pages.faq.metamask.q4" /></dt>
            <dd><FormattedMessage id="pages.faq.metamask.a4" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.plat.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.plat.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.plat.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.plat.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.plat.a2" /></dd>
            <dt><FormattedMessage id="pages.faq.plat.q3" /></dt>
            <dd><FormattedMessage id="pages.faq.plat.a3" /></dd>
            <dt><FormattedMessage id="pages.faq.plat.q4" /></dt>
            <dd><FormattedMessage id="pages.faq.plat.a4" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.games.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.games.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.games.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.games.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.games.a2" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.items.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.items.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a2" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q3" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a3" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q4" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a4" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q5" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a5" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q6" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a6" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q7" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a7" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q8" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a8" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q9" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a9" /></dd>
            <dt><FormattedMessage id="pages.faq.items.q10" /></dt>
            <dd><FormattedMessage id="pages.faq.items.a10" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.games.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.account.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.account.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.account.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.account.a2" /></dd>
            <dt><FormattedMessage id="pages.faq.account.q3" /></dt>
            <dd><FormattedMessage id="pages.faq.account.a3" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.community.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.community.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.community.a1" /></dd>
            <dt><FormattedMessage id="pages.faq.community.q2" /></dt>
            <dd><FormattedMessage id="pages.faq.community.a2" /></dd>
          </dl>

          <h3><FormattedMessage id="pages.faq.developers.title" /></h3>
          <dl>
            <dt><FormattedMessage id="pages.faq.developers.q1" /></dt>
            <dd><FormattedMessage id="pages.faq.developers.a1" /></dd>
          </dl>
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
