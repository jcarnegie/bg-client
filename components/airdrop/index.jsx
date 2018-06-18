import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";

import Article from "@/components/article";


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

            ol, ul {
              margin-bottom: 30px;
            }
          `}</style>

          <h2><FormattedHTMLMessage id="pages.airdrop.title" /></h2>

          <p><FormattedHTMLMessage id="pages.airdrop.p1" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p2" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p3" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p4" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p5" /></p>

          <ol>
            <li>
              <a className="e-widget no-button generic-loader" href="https://gleam.io/Qv4W7/bitguild-giveaway-ether-online-warbear" rel="nofollow noopener noreferrer">
                <FormattedHTMLMessage id="pages.airdrop.l1" />
              </a>
            </li>
            <li><FormattedHTMLMessage id="pages.airdrop.l2" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l3" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l4" /></li>
          </ol>

          <p><FormattedHTMLMessage id="pages.airdrop.p6" /></p>

          <ol>
            <li><FormattedHTMLMessage id="pages.airdrop.l5" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l6" /></li>
            <li>
            <a className="e-widget no-button generic-loader" href="https://gleam.io/Ksqof/bitguild-giveaway-ether-online-royal-eagle" rel="nofollow noopener noreferrer">
              <FormattedHTMLMessage id="pages.airdrop.l7" />
            </a>
            </li>
            <li><FormattedHTMLMessage id="pages.airdrop.l8" /></li>
            <li><FormattedHTMLMessage id="pages.airdrop.l9" /></li>
          </ol>

          <p><FormattedHTMLMessage id="pages.airdrop.p7" /></p>

          <ol>
            <li>
              <a className="e-widget no-button generic-loader" href="https://gleam.io/VsjzO/bitguild-giveaway-ether-online-raging-tiger" rel="nofollow noopener noreferrer">
                <FormattedHTMLMessage id="pages.airdrop.l10" />
              </a>
            </li>
            <li><FormattedHTMLMessage id="pages.airdrop.l11" /></li>
          </ol>

          <p><FormattedHTMLMessage id="pages.airdrop.p8" /></p>
          <p><FormattedHTMLMessage id="pages.airdrop.p9" /></p>

          <Image src="/static/images/misc/pet-giveaway.png" className="airdrop-image" />
        </div>
      </Article>
    );
  }
}
