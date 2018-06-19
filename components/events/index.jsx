import React, {Component} from "react";
import {Image, Row, Col} from "react-bootstrap";
import {FormattedHTMLMessage} from "react-intl";

import Article from "@/components/article";
import BGModal from "@/components/modal";
import {Mobile, Desktop} from "@/components/responsive";

import style from "@/shared/constants/style";


export default class Events extends Component {
  state = {
    popupUrl: "",
  }

  desktopPopup() {
    const {popupUrl} = this.state;
    return popupUrl ? (
      <BGModal className="events-popup" show={Boolean(popupUrl)} onHide={() => this.setState({popupUrl: ""})}>
        <style jsx>{`
          :global(.modal-dialog),
          :global(.modal-content) {
            position: fixed;
            top: 35px;
            bottom: 10px;
            left: 0%;
            right: 0%;
          }
          :global(.modal-content) {
            height: calc(100vh);
          }
          :global(.events-popup iframe) {
            width: 600px;
            max-width: calc(100%);
            background: white;
            opacity: 1;
            border-radius: 6px;
            z-index: 1090;
          }
          :global(.events-popup iframe),
          :global(.modal-content) {
            height: calc(100vh - 82px);
          }
          :global(.events-popup-close) {
            position: absolute;
            right: 10px;
            top: 10px;
            margin: 0;
            cursor: pointer;
          }
          :global(.events-popup .modal-dialog),
          :global(.events-popup .modal-dialog .modal-content) {
            height: (100vh - 62px - 20px);
          }
        `}</style>
        <img src="/static/images/icons/close.png" className="events-popup-close" onClick={() => this.setState({popupUrl: ""})} />
        <iframe src={popupUrl} />
      </BGModal>
    ) : null;
  }

  mobilePopup() {
    const {popupUrl} = this.state;
    return popupUrl ? (
      <BGModal className="events-popup" show={Boolean(popupUrl)} onHide={() => this.setState({popupUrl: ""})}>
        <style jsx>{`
          :global(.modal-dialog),
          :global(.modal-content) {
            position: fixed;
            top: 2px;
            left: 0%;
            right: 0%;
          }
          :global(.events-popup iframe),
          :global(.modal-content) {
            height: calc(100vh - 82px);
          }
          :global(.events-popup iframe) {
            height: calc(100vh - 82px);
            width: 600px;
            max-width: calc(100%);
            background: white;
            opacity: 1;
            border-radius: 6px;
            z-index: 1090;
          }
          :global(.events-popup-close) {
            position: absolute;
            right: 10px;
            top: 10px;
            margin: 0;
            cursor: pointer;
          }
          :global(.events-popup .modal-dialog),
          :global(.events-popup .modal-dialog .modal-content) {
            height: (100vh - 62px - 20px);
          }
        `}</style>
        <img src="/static/images/icons/close.png" className="events-popup-close" onClick={() => this.setState({popupUrl: ""})} />
        <iframe src={popupUrl} />
      </BGModal>
    ) : null;
  }

  render() {
    return (
      <Article>
        <div className="events">
          <style jsx global>{`
            .events .btn {
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
            .events .btn:hover,
            .events .btn:focus,
            .events .btn:active,
            .events .btn:focus:active {
              background-color: #536EAD;
              color: #ffffff;
              outline: 0;
              box-shadow: none;
            }
            .events .btn img {
              margin: 0;
              width: 11px;
              height: 13px;
              display: inline-block;
              margin-top: -5px;
              margin-right: 5px;
            }
            .events-image {
              width: 90%;
            }

            .article-inline-image {
              max-width: 100%;
            }
          `}</style>
          <Mobile>
            {this.mobilePopup()}
          </Mobile>
          <Desktop>
            {this.desktopPopup()}
          </Desktop>
          <h2><FormattedHTMLMessage id="pages.events.title" /></h2>

          <p><FormattedHTMLMessage id="pages.events.p1" /></p>
          <p><FormattedHTMLMessage id="pages.events.p2" /></p>

          <Image src="/static/images/misc/pet-giveaway.png" className="events-image" />

          <p><FormattedHTMLMessage id="pages.events.p3" /></p>
          <p><FormattedHTMLMessage id="pages.events.p4" /></p>
          <h3><FormattedHTMLMessage id="pages.events.p5" /></h3>

          <Row>
            <Col xs={12} sm={3}>
              <a onClick={() => this.setState({popupUrl: "https://gleam.io/Qv4W7/bitguild-giveaway-ether-online-warbear"})}>
                <Image src="/static/images/misc/pet-giveaway-warbear.png" className="article-inline-image" />
              </a>
            </Col>
            <Col xs={12} sm={9}>
              <ol>
                <li>
                  <a href="https://discordapp.com/invite/pPC2frB" target="_blank" rel="noopener noreferrer">
                    <FormattedHTMLMessage id="pages.events.l1" />
                  </a>
                </li>
                <li>
                  <a onClick={() => this.setState({popupUrl: "https://gleam.io/Qv4W7/bitguild-giveaway-ether-online-warbear"})}>
                    <FormattedHTMLMessage id="pages.events.l2" />
                  </a>
                </li>
                <li><FormattedHTMLMessage id="pages.events.l3" /></li>
                <li><FormattedHTMLMessage id="pages.events.l4" /></li>
              </ol>
            </Col>
          </Row>

          <h3><FormattedHTMLMessage id="pages.events.p6" /></h3>

          <Row>
            <Col xs={12} sm={3}>
              <a onClick={() => this.setState({popupUrl: "https://gleam.io/Ksqof/bitguild-giveaway-ether-online-royal-eagle"})}>
                <Image src="/static/images/misc/pet-giveaway-eagle.png" className="article-inline-image" />
              </a>
            </Col>
            <Col xs={12} sm={9}>
              <ol>
                <li><FormattedHTMLMessage id="pages.events.l5" /></li>
                <li><FormattedHTMLMessage id="pages.events.l6" /></li>
                <li>
                  <a onClick={() => this.setState({popupUrl: "https://gleam.io/Ksqof/bitguild-giveaway-ether-online-royal-eagle"})}>
                    <FormattedHTMLMessage id="pages.events.l7" />
                  </a>
                </li>
                <li><FormattedHTMLMessage id="pages.events.l8" /></li>
                <li><FormattedHTMLMessage id="pages.events.l9" /></li>
              </ol>
            </Col>
          </Row>

          <h3><FormattedHTMLMessage id="pages.events.p7" /></h3>

          <Row>
            <Col xs={12} sm={3} className="inline-image-container">
              <a onClick={() => this.setState({popupUrl: "https://gleam.io/VsjzO/bitguild-giveaway-ether-online-raging-tiger"})}>
                <Image src="/static/images/misc/pet-giveaway-raging-tiger.png" className="article-inline-image" />
              </a>
            </Col>
            <Col xs={12} sm={9}>
              <ol>
                <li>
                  <a onClick={() => this.setState({popupUrl: "https://gleam.io/VsjzO/bitguild-giveaway-ether-online-raging-tiger"})}>
                    <FormattedHTMLMessage id="pages.events.l10" />
                  </a>
                </li>
                <li><FormattedHTMLMessage id="pages.events.l11" /></li>
              </ol>
            </Col>
          </Row>

          <br />

          <p><FormattedHTMLMessage id="pages.events.p8" /></p>
          <p>* <FormattedHTMLMessage id="pages.events.p9" /></p>
        </div>
      </Article>
    );
  }
}
