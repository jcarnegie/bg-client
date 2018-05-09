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
          <dl>
            <dt>Q</dt>
            <dd>A</dd>
          </dl>
        </Col>
      </Row>
    );
  }
}
