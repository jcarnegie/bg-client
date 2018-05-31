import "./index.less";
import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";


export default class Airdrop extends Component {
  render() {
    return (
      <div className="gap airdrop">
        <h2 className="title"><FormattedHTMLMessage id="pages.airdrop.title" /></h2>
        <p><strong><FormattedHTMLMessage id="pages.airdrop.p1" /></strong></p>
        <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
        <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
        <p><strong><FormattedHTMLMessage id="pages.airdrop.p4" /></strong></p>
        <p><strong><FormattedHTMLMessage id="pages.airdrop.p5" /></strong></p>
        <Image src="/images/airdrop.png" />
      </div>
    );
  }
}
