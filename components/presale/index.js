import React, {Component} from "react";
import * as log from "loglevel";
import cx from "classnames";
import PropTypes from "prop-types";
import {Image, Row, Col, Tab, Tabs, ProgressBar} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";

// import BGModal from "@/components/modal";
import {Mobile, Desktop} from "@/components/responsive";
import ItemSetDetailsCard from "@/components/ItemSetDetailsCard";

import style from "@/shared/constants/style";

const TOTAL_ITEMS_COUNT = 278;

const SETS = [
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
    // TODO - complete purchase logic
    console.log('purchase set: ', set);
  }

  setSection(set) {
    const itemIndices = [1, 2, 3, 4];
    return (
      <Row key={set.id}>
        <style jsx>{`
          :global(.presale-purchase-set-banner) {
            margin-bottom: 5px;
          }
        `}</style>
        <Col xs={6} sm={7}>
          <Row>
            <Col xs={12}>
              <h3>{set.name}</h3>
            </Col>
            <Col lg={4}>
              <Image responsive src={`/static/images/games/bitizens/presale/${set.id}/thumbnail.jpg`} className="presale-purchase-set-banner" />
            </Col>
            <Col lg={8}>
              <p><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.description`} /></p>
            </Col>
          </Row>
        </Col>
        <Col xs={6} sm={5}>
          <ItemSetDetailsCard
            key={set.id}
            onClick={() => ::this.purchase(set)}
            title={set.name}
            subtitle={<>40 / {set.total} <FormattedMessage id="global.remaining" /></>}
            itemImages={itemIndices.map((v, k) => <img key={k} src={`/static/images/games/${this.props.slug}/presale/${set.id}/items/${v}.png`} />)}
            setDetails={itemIndices.map((v, k) => <li key={k}><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.item${v}.name`} /></li>)}
            buttonText={`BUY for ${set.price} PLAT`}
          />
        </Col>
      </Row>
    );
  }

  presaleIntro() {
    return (
      <>
        <Row>
          <style jsx>{`
            .presale {
              padding-top: 25px;
            }
            .presale-stat {
              margin: 0;
              line-height: 1em;
              font-weight: 500;
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
          `}</style>
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
      </>
    );
  }

  presaleProgress(progress) {
    const progressDisclaimer = (num, imgSrc, active, xsOffset = 0) => {
      return (
        <Col xs={4} xsOffset={xsOffset}>
          <style jsx>{`
            .progress-disclaimer {
              display: flex;
              font-size: .7em;
              opacity: .4;
            }
            .progress-disclaimer.active {
              opacity: 1;
            }
            .progress-popover {
              display: inline-block;
            }
            :global(.progress-disclaimer .progress-popover img) {
              box-shadow: ${style.boxShadow.default};
              margin-bottom: 10px;
            }
          `}</style>
          <div className={cx({active}, "progress-disclaimer")}>
            <Row>
              <Col lg={4} md={12}>
                <div className="progress-popover">
                  <Image responsive src={imgSrc} />
                </div>
              </Col>
              <Col lg={8} md={12}>
                <span className="progress-disclaimer-text">
                  <p><strong><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-${num}`} /></strong></p>
                  <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-${num}-description`} /></p>
                </span>
              </Col>
            </Row>
          </div>
        </Col>
      );
    };
    return (
      <Row>
        <Col md={12}>
          <div className="presale-progress">
            <ProgressBar key={1} now={progress} />
          </div>
        </Col>
        {progressDisclaimer(1, "/static/images/games/bitizens/presale/pioneer_drillr/icon.png", progress >= 30, 4)}
        {progressDisclaimer(2, "http://via.placeholder.com/100x100", progress >= 60)}
      </Row>
    );
  }

  presaleInfo() {
    return (
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
    );
  }

  render() {
    console.log(this.props);
    // TODO - Get sold items count
    const progress = Math.floor((84 / TOTAL_ITEMS_COUNT) * 100); /* Percentage items sold */
    return (
      <div className="presale">
        <style jsx global>{`
          .presale .row {
            margin-bottom: 40px;
          }
          .presale .popover {
            padding: 0;
          }
        `}</style>
          {::this.presaleIntro()}
          {::this.presaleProgress(progress)}
          {::this.presaleInfo()}
          {SETS.map(set => ::this.setSection(set))}
      </div>
    );
  }
}

export default Presale;
