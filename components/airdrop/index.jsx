import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";

import Article from "@/components/article";
import {Mobile, Desktop} from "@/components/responsive";


export default class Airdrop extends Component {
  render() {
    return (
      <Article>
        <div className="airdrop">
          <style jsx global>{`
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
            .airdrop-image {
              width: 90%;
              max-width: 440px;
            }
          `}</style>
          <h2><FormattedHTMLMessage id="pages.airdrop.title" /></h2>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p1" /></strong></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p4" /></strong></p>
          <p><strong><FormattedHTMLMessage id="pages.airdrop.p5" /></strong></p>
          <Image src="/static/images/airdrop.png" className="airdrop-image" />
        </div>
      </Article>
    );
  }
}
