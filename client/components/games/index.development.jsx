import "./games.less";
import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";


export default class Games extends Component {
  render() {
    return (
      <div className="games">
        <Image src="/images/landing.png" />
        <div className="title">BitSociety</div>
        <div className="description">
          BitSociety is an avatar creation game built into the BitGuild<br />
          portal that let's you find fantastic high-value items, show them<br />
          off to everyone, or barter them at the BitGuild marketplace.<br />
        </div>
        <Button />
      </div>
    );
  }
}
