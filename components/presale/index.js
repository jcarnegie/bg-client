import React, {Component} from "react";
import * as log from "loglevel";
import PropTypes from "prop-types";
import {Image, Row, Col, Tab, Tabs, ProgressBar} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";

// import BGModal from "@/components/modal";
import {Mobile, Desktop} from "@/components/responsive";

import style from "@/shared/constants/style";

const sets = [
  {
    id: "pioneer_of_the_wilds",
    name: "Pioneer of the Wilds",
    total: 100,
    price: 60000,
  },
  {
    id: "pioneer_of_the_skies",
    name: "Pioneer of the Skies",
    total: 25,
    price: 180000,
  },
  {
    id: "pioneer_of_the_seas",
    name: "Pioneer of the Seas",
    total: 10,
    price: 480000,
  },
  {
    id: "pioneer_of_the_cyberscape",
    name: "Cyberspace Pioneer",
    total: 1,
    price: 3000000,
  },
  {
    id: "pioneer_compass",
    name: "Pioneers Compass",
    total: 3,
    price: 720000,
  },
];


@injectIntl
class Presale extends Component {
  static propTypes = {
    slug: PropTypes.string,
  }

  static getInitialProps({err, req, res, query, store, isServer}) {
    if (err) {
      log.error(err);
    }
    return {...query};
  }

  purchase(set) {
    console.log('purchase set: ', set);
  }

  purchaseBlock(set) {
    const itemIndices = [1, 2, 3, 4];
    return (
      <div className="presale-purchase-block" key={set.id} onClick={() => ::this.purchase(set)}>
        <style jsx>{`
          :global(.presale-purchase-block img) {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
          .presale-purchase-block {
            display: flex;
            flex-direction: column;
            box-shadow: ${style.boxShadow.default};
            border-radius: 5px;
            max-width: 300px;
            cursor: pointer;
            font-size: 0.8em;
          }
          .presale-purchase-block:hover {
            box-shadow: ${style.boxShadow.hover};
          }
          h5 {
            font-size: 1.1em;
            margin-bottom: 0;
          }
          button {
            border: 0;
            background-color: ${style.colors.secondary};
            color: white;
            font-weight: 100;
            padding: 10px 0;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            outline: 0;
          }
          .presale-item-grid {
            background-color: rgb(243, 247, 255);
            display: flex;
            flex-wrap: wrap;
            padding: 1% 5px 3.5% 5px;
          }
          .presale-item-grid img {
            margin: 2.5% 5% 0 5%;
            width: 40%;
            height: 10%;
            border-radius: 0;
          }
          .presale-item-grid img:nth-child(even) {
            margin-left: 2.5%;
            margin-right: 7.5%;
          }
          .presale-item-grid img:nth-child(odd) {
            margin-right: 2.5%;
            margin-left: 7.5%;
          }
          .presale-item-details {
            background: white;
            padding: 0 10px;
          }
          .details {
            font-size: 0.9em;
            padding: 0 0 0 10%;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
          }
          .presale-item-remaining {
            margin: 0 0 10px 0;
          }
          .details li {
            width: 50%;
            margin-bottom: 3px;
          }
        `}</style>
        <div className="presale-item-grid">
          {itemIndices.map((v, k) => <img key={k} src={`/static/images/games/${this.props.slug}/presale/${set.id}/items/${v}.png`} />)}
        </div>
        <div className="presale-item-details">
          <h5>{set.name}</h5>
          <p className="presale-item-remaining">40 / {set.total} <FormattedMessage id="global.remaining" /></p>
          <ul className="details">
             {itemIndices.map((v, k) => <li key={k}><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.item${v}.name`} /></li>)}
          </ul>
        </div>
        <button>BUY for {set.price} PLAT</button>
      </div>
    );
  }

  set(set) {
    return (
      <Row key={set.id}>
        <style jsx>{`
          :global(.purchase-set-banner) {
            margin-bottom: 5px;
          }
        `}</style>
        <Col xs={6} sm={7} className="presale-purchase">
          <Row>
            <Col xs={12}>
              <h3>{set.name}</h3>
            </Col>
            <Col lg={4}>
              <Image responsive src={`/static/images/games/bitizens/presale/${set.id}/thumbnail.jpg`} className="purchase-set-banner" />
            </Col>
            <Col lg={8}>
              <p><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.description`} /></p>
            </Col>
          </Row>
        </Col>
        <Col xs={6} sm={5}>
            {::this.purchaseBlock(set)}
        </Col>
      </Row>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className="presale">
        <style jsx>{`
          :global(.presale .row) {
            margin-bottom: 40px;
          }
          :global(.presale .popover) {
            padding: 0;
          }
          .presale {
            padding-top: 25px;
          }
          .presale-banner-primary {

          }
          .presale-stat {
            margin: 0;
            line-height: 1em;
            font-weight: 500;
          }
          .presale-progress {

          }
          .presale-info {
            background-color: blue;
          }
          .presale-aside {
            background-color: green;
          }
          
          .title.with-subtitle {
            margin: 0 0 14px 0;
          }
          .subtitle {
            margin: 0;
          }
          .title-section {
            display: flex;
          }
          .titles {
            height: 100px;
            display: inline-block;
            margin-left: 5%;
          }
          .title-image {
            display: inline-block;
          }
          .presale-label {
            margin: 0 0 10px 0;
          }
          .presale-stat {
            margin: 20px 0 0 0;
          }
          .progress-disclaimer {
            display: flex;
            font-size: .7em;
          }
          .progress-popover {
            display: inline-block;
          }
          :global(.progress-disclaimer .progress-popover img) {
            box-shadow: ${style.boxShadow.default};
            margin-bottom: 10px;
          }
          .progress-disclaimer-text {

          }
        `}</style>
          <Row>
            <Col md={12}>
              <div className="title-section">
                <div className="title-image">
                  <Mobile>
                    <Image src="http://via.placeholder.com/70x70" />
                  </Mobile>
                  <Desktop>
                    <Image src="http://via.placeholder.com/100x100" />
                  </Desktop>
                </div>
                <div className="titles">
                  <h1 className="title with-subtitle"><FormattedMessage id={`pages.presale.${this.props.slug}.title`} /></h1>
                  <h2 className="subtitle"><FormattedMessage id={`pages.presale.${this.props.slug}.subtitle`} /></h2>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={7} className="presale-banner-primary">
              <Image responsive src="/static/images/games/bitizens/presale/header.jpg" />
            </Col>
            <Col xs={12} sm={5}>
              <p className="presale-stat">72 / 138</p>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.items-bought`} /></p>
              <p className="presale-stat">138</p>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.total-buyers`} /></p>
              <p className="presale-stat">2 / 3</p>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.stretch-goals-unlocked`} /></p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="presale-progress">
                <ProgressBar key={1} now={33} />
              </div>
            </Col>
            <Col xs={4} xsOffset={4}>
              <div className="progress-disclaimer">
                <Row>
                  <Col lg={4} md={12}>
                    <div className="progress-popover">
                      <Image responsive src="/static/images/games/bitizens/presale/pioneer_drillr/thumbnail.png" />
                    </div>
                  </Col>
                  <Col lg={8} md={12}>
                    <span className="progress-disclaimer-text">
                      <p><strong><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-1`} /></strong></p>
                      <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-1-description`} /></p>
                    </span>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={4}>
              <div className="progress-disclaimer">
                <Row>
                  <Col lg={4} md={12}>
                    <div className="progress-popover">
                      <Image responsive src="http://via.placeholder.com/100x100" />
                    </div>
                  </Col>
                  <Col lg={8} md={12}>
                    <span className="progress-disclaimer-text">
                      <p><strong><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-2`} /></strong></p>
                      <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-2-description`} /></p>
                    </span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="presale-info">
              <Tabs id="presale-tabs" defaultActiveKey={1}>
                <Tab eventKey={1} title={<FormattedMessage id="global.description" />}>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p1`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p2`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p3`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p4`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p5`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p6`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p7`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p8`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p9`} /></p>
                </Tab>
                <Tab eventKey={2} title={<FormattedMessage id="global.rules" />}>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p1`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p2`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p3`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p4`} /></p>
                  <ol>
                    <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l1`} /></li>
                    <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l2`} /></li>
                    <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l3`} /></li>
                    <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l4`} /></li>
                  </ol>
                </Tab>
                <Tab eventKey={3} title={<FormattedMessage id="global.faq" />}>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p1`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p2`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p3`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p4`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p5`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p6`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p7`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p8`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p9`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p10`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p11`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p12`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p13`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p14`} /></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.faq-text.p15`} /></p>
                </Tab>
              </Tabs>
            </Col>
          </Row>

          {sets.map(set => ::this.set(set))}
      </div>
    );
  }
}

export default Presale;
