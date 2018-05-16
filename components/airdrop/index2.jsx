import React, {Component} from "react";
import {Col, Image, Row} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";
import Chat from "../../components/chat";
// import style from "./style";


export default class Airdrop2 extends Component {
  render() {
    return (
      <>
        {/* <style jsx>{style}</style> */}
        <Row>
          <Col md={9} className="gap airdrop">

            <Image src="/images/airdrop.png" />

            <p><FormattedHTMLMessage id="pages.airdrop2.p1" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop2.p2" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop2.p3" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop2.p4" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop2.p5" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop2.p6" /></p>

          </Col>
          <Col className="chat">
            <Chat />
          </Col>
        </Row>
      </>
    );
  }
}
