import "./index.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";


export default class GameList extends Component {
  render() {
    return (
      <Row>
        <Col className="grap gap games">
          <div className="banner">
            <Button href="/game/5af2703709bc2d18438449ad">
              <Image src="/images/buttons/play/play.png" />
              <FormattedMessage id="pages.games.play" />
            </Button>
          </div>
          <Row>
            <Col className="announce">
              <Row>
                <Col md={6}>
                  <h3><FormattedMessage id="pages.games.coming-soon" /></h3>
                  <Image src="/images/coming-soon.png" />
                </Col>
                <Col md={6}>
                  <h3><FormattedMessage id="pages.games.in-development" /></h3>
                  <Image src="/images/in-development.png" />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="explore">
            <FormattedMessage id="pages.games.questions" />
            <Link to="/faq">
              <FormattedMessage id="pages.games.faq" />
            </Link>
            <a href="https://discordapp.com/invite/pPC2frB">
              <FormattedMessage id="pages.games.discord" />
            </a>
          </div>
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
