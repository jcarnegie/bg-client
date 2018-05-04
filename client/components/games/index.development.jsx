import "./games.less";
import "./chat.less";
import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Chat from "./chat";

export default class Games extends Component {
  render() {
    return (
      <Row>
        <Col md={9} className="iframe">
          <div className="title">BitSociety</div>
          <div className="description">
            BitSociety is an avatar creation game built into the BitGuild<br />
            portal that let's you find fantastic high-value items, show them<br />
            off to everyone, or barter them at the BitGuild marketplace.<br />
          </div>
          <button>
            <img src="/images/buttons/play/play.png" />
            PLAY
          </button>
        </Col>
        <Col md={3} className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
