import "./games.less";
import "./chat.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";


export default class Games extends Component {
  render() {
    return (
      <Row>
        <Col md={9}>
          <div className="iframe">
            <div className="title">BitSociety</div>
            <div className="description">
              BitSociety is an avatar creation game built into the BitGuild<br />
              portal that let's you find fantastic high-value items, show them<br />
              off to everyone, or barter them at the BitGuild marketplace.<br />
            </div>
            <Button>
              <Image src="/images/buttons/play/play.png" />
              PLAY
            </Button>
          </div>
          <Row>
            <Col md={5} className="preview">
              <h3>In-Game Items Preview</h3>
              <Row>
                <Col md={4}>
                  <a href="#">
                    <Image src="/images/item_preview.png" />
                  </a>
                </Col>
                <Col md={4}>
                  <a href="#">
                    <Image src="/images/item_preview.png" />
                  </a>
                </Col>
                <Col md={4}>
                  <a href="#">
                    <Image src="/images/item_preview.png" />
                  </a>
                </Col>
              </Row>
              <a href="#" className="explore">Explore</a>
            </Col>
            <Col md={7} className="announce">
              <Row>
                <Col md={6}>
                  <h3>Coming soon</h3>
                  <Image src="/images/coming-soon.png" />
                </Col>
                <Col md={6}>
                  <h3>In development</h3>
                  <Image src="/images/in-development.png" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="chat">
          Chat
        </Col>
      </Row>
    );
  }
}
