import React, {Component} from "react";
import {Button, Row, Col, Image} from "react-bootstrap";
import {FormattedMessage, FormattedHTMLMessage} from "react-intl";


export default class Airdrop extends Component {
  render() {
    return (
      <>
        <Row>
          <style jsx>{`
            .airdrop h2 {
              font-weight: 700;
              font-size: 38px;
              margin-top: 40px;
              margin-bottom: 70px;
            }
            .airdrop h3 {
              font-weight: 500;
              font-size: 28px;
              margin-top: 10px;
              margin-bottom: 40px;
            }
            .airdrop p,
            .airdrop ul {
              margin-bottom: 35px;
            }
            .airdrop p,
            .airdrop li {
              font-weight: 300;
            }
            .airdrop img {
              margin: 60px auto 0 auto;
              margin-bottom: 40px;
              width: 440px;
              height: 220px;
              display: block;
            }
            .airdrop ul {
              list-style: none;
            }
            .airdrop ul li {
              margin-bottom: 10px;
            }
            .airdrop strong {
              font-weight: 600;
            }
            .airdrop p,
            .airdrop li,
            .airdrop strong {
              font-size: 18px;
            }
            .airdrop .btn {
              font-size: 14px;
              background-color: #314B88;
              color: #ffffff;
              border: 0;
              padding: 10px;
              border-radius: 2px;
              width: 150px;
              margin: 0 auto;
              margin-bottom: 50px;
              display: block;
            }
            .airdrop .btn:hover,
            .airdrop .btn:focus,
            .airdrop .btn:active,
            .airdrop .btn:focus:active {
              background-color: #536EAD;
              color: #ffffff;
              outline: 0;
              box-shadow: none;
            }
            .airdrop .btn img {
              margin: 0;
              width: 11px;
              height: 13px;
              display: inline-block;
              margin-top: -5px;
              margin-right: 5px;
            }            
          `}</style>
          <Col md={9} className="gap airdrop">
            <h2><FormattedMessage id="pages.airdrop.title" /></h2>
            <h3><FormattedMessage id="pages.airdrop.description" /></h3>

            <p><FormattedHTMLMessage id="pages.airdrop.p1" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
            <p><FormattedHTMLMessage id="pages.airdrop.p4" /></p>

            <Image src="/static/images/airdrop.png" />

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
              <Image src="/static/images/buttons/play/white.png" />
              <FormattedMessage id="pages.airdrop.play" />
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
