import "./games.less";
import "./chat.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";


export default class GameList extends Component {
  render() {
    return (
      <Row>
        <Col className="grap gap">
          <div className="iframe">
            <div className="gradient">
              <div className="title">Ether Online</div>
              <div className="description">
                BitSociety is an avatar creation game built into the BitGuild<br />
                portal that let's you find fantastic high-value items, show them<br />
                off to everyone, or barter them at the BitGuild marketplace.<br />
              </div>
              <Button href="/game/5af2703709bc2d18438449ad">
                <Image src="/images/buttons/play/play.png" />
                PLAY
              </Button>
            </div>
          </div>
          <Row>
            <Col lg={5} className="preview">
              <h3>In-Game Items Preview</h3>
              <Row>
                <Col sm={4}>
                  <Image src="/images/preview/preview_1.png" />
                </Col>
                <Col sm={4}>
                  <Image src="/images/preview/preview_2.png" />
                </Col>
                <Col sm={4}>
                  <Image src="/images/preview/preview_3.png" />
                </Col>
              </Row>
            </Col>
            <Col lg={7} className="announce">
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
          <div className="explore">
            <FormattedMessage id="pages.games.questions" />
            <Link to="/faq">FAQ</Link>
            <a href="https://discordapp.com/invite/pPC2frB">DISCORD</a>
          </div>
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
