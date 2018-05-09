import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {Col, Row} from "react-bootstrap";


export default class Faq extends Component {
  render() {
    return (
      <Row className="faq">
        <Col md={9} className="gap">
          <h2>
            <FormattedMessage id="pages.faq.title" />
          </h2>

          <h3><FormattedMessage id="faq.metamask.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.metamask.q1" /></dt>
            <dd><FormattedMessage id="faq.metamask.a1" /></dd>
            <dt><FormattedMessage id="faq.metamask.q2" /></dt>
            <dd><FormattedMessage id="faq.metamask.a2" /></dd>
            <dt><FormattedMessage id="faq.metamask.q3" /></dt>
            <dd><FormattedMessage id="faq.metamask.a3" /></dd>
            <dt><FormattedMessage id="faq.metamask.q4" /></dt>
            <dd><FormattedMessage id="faq.metamask.a4" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.plat.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.plat.q1" /></dt>
            <dd><FormattedMessage id="faq.plat.a1" /></dd>
            <dt><FormattedMessage id="faq.plat.q2" /></dt>
            <dd><FormattedMessage id="faq.plat.a2" /></dd>
            <dt><FormattedMessage id="faq.plat.q3" /></dt>
            <dd><FormattedMessage id="faq.plat.a3" /></dd>
            <dt><FormattedMessage id="faq.plat.q4" /></dt>
            <dd><FormattedMessage id="faq.plat.a4" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.games.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.games.q1" /></dt>
            <dd><FormattedMessage id="faq.games.a1" /></dd>
            <dt><FormattedMessage id="faq.games.q2" /></dt>
            <dd><FormattedMessage id="faq.games.a2" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.items.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.items.q1" /></dt>
            <dd><FormattedMessage id="faq.items.a1" /></dd>
            <dt><FormattedMessage id="faq.items.q2" /></dt>
            <dd><FormattedMessage id="faq.items.a2" /></dd>
            <dt><FormattedMessage id="faq.items.q3" /></dt>
            <dd><FormattedMessage id="faq.items.a3" /></dd>
            <dt><FormattedMessage id="faq.items.q4" /></dt>
            <dd><FormattedMessage id="faq.items.a4" /></dd>
            <dt><FormattedMessage id="faq.items.q5" /></dt>
            <dd><FormattedMessage id="faq.items.a5" /></dd>
            <dt><FormattedMessage id="faq.items.q6" /></dt>
            <dd><FormattedMessage id="faq.items.a6" /></dd>
            <dt><FormattedMessage id="faq.items.q7" /></dt>
            <dd><FormattedMessage id="faq.items.a7" /></dd>
            <dt><FormattedMessage id="faq.items.q8" /></dt>
            <dd><FormattedMessage id="faq.items.a8" /></dd>
            <dt><FormattedMessage id="faq.items.q9" /></dt>
            <dd><FormattedMessage id="faq.items.a9" /></dd>
            <dt><FormattedMessage id="faq.items.q10" /></dt>
            <dd><FormattedMessage id="faq.items.a10" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.games.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.account.q1" /></dt>
            <dd><FormattedMessage id="faq.account.a1" /></dd>
            <dt><FormattedMessage id="faq.account.q2" /></dt>
            <dd><FormattedMessage id="faq.account.a2" /></dd>
            <dt><FormattedMessage id="faq.account.q3" /></dt>
            <dd><FormattedMessage id="faq.account.a3" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.community.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.community.q1" /></dt>
            <dd><FormattedMessage id="faq.community.a1" /></dd>
            <dt><FormattedMessage id="faq.community.q2" /></dt>
            <dd><FormattedMessage id="faq.community.a2" /></dd>
          </dl>

          <h3><FormattedMessage id="faq.developers.title" /></h3>
          <dl>
            <dt><FormattedMessage id="faq.developers.q1" /></dt>
            <dd><FormattedMessage id="faq.developers.a1" /></dd>
          </dl>
        </Col>
      </Row>
    );
  }
}
