import React, {Component} from "react";
import * as log from "loglevel";
import cx from "classnames";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import {Image, Row, Col, Tab, Tabs, ProgressBar} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";

import tokenABI from "@/shared/contracts/token";
// import oracleABI from "@/shared/contracts/oracle";
import networkConfig from "@/client/utils/network";

// import BGModal from "@/components/modal";
import {Mobile, Desktop} from "@/components/responsive";
import ItemSetDetailsCard from "@/components/ItemSetDetailsCard";

import style from "@/shared/constants/style";

import {client as api} from "@/client/utils/apollo";

const TOTAL_ITEMS_COUNT = 278;
const BITIZENS_GAME_ID = 3;

// TODO - move id => key, and tokenId => id
const SETS = [
  {
    id: "pioneer_of_the_wilds",
    tokenId: 16,
    name: "Pioneer of the Wilds",
    total: 100,
    price: 60000,
  },
  {
    id: "pioneer_of_the_skies",
    tokenId: 17,
    name: "Pioneer of the Skies",
    total: 25,
    price: 180000,
  },
  {
    id: "pioneer_of_the_seas",
    tokenId: 18,
    name: "Pioneer of the Seas",
    total: 10,
    price: 480000,
  },
  {
    id: "pioneer_of_the_cyberscape",
    tokenId: 19,
    name: "Cyberspace Pioneer",
    total: 1,
    price: 3000000,
  },
  {
    id: "pioneer_compass",
    tokenId: 999,
    name: "Pioneers Compass",
    total: 3,
    price: 720000,
  },
];


@injectIntl
@connect(
  state => ({
    balancePLAT: state.balancePLAT,
    network: state.network,
    user: state.user,
  }),
)
class Presale extends Component {
  static propTypes = {
    slug: PropTypes.string,
    balancePLAT: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
  }

  static getInitialProps({err, req, res, query, store, isServer}) {
    if (err) {
      log.error(err);
    }
    return {...query};
  }

  async logPurchase(tx, set) {
    const {user} = this.props;
    const mutation = gql`
      mutation createPresaleTicket($payload:CreatePresaleTicketPayload!) {
        createPresaleTicket(payload:$payload) {
          id setId wallet transactionHash state
          user { id }
          game { id }
        }
      }
    `;
    const variables = {
      payload: {
        setId: set.tokenId,
        wallet: user.data.wallet,
        transactionHash: tx,
        GameId: BITIZENS_GAME_ID,
        UserId: user.data.id,
      }
    };
    const ticket = await api.mutate({mutation, variables});
    log.info("Purchase ticket:", ticket);
  }

  purchase(set) {
    log.info("User purchase flow for set: ", set);
    const {balancePLAT} = this.props;
    // Configure contract for BitGuildToken
    const BitGuildToken = window.web3.eth.contract(tokenABI).at(networkConfig[this.props.network.data.id].token);
    const PLAT_DISCOUNT = 50;
    const priceForUser = (set.price - PLAT_DISCOUNT);
    const priceForUserBigNumber = priceForUser * 1e18;

    // Get Plat Balance and confirm user has enough...
    if (balancePLAT && balancePLAT.data < priceForUser) {
      log.error("User has insufficient PLAT balance.");
      return;
    }

    // Trigger approval for transaction
    BitGuildToken.approveAndCall(networkConfig[this.props.network.data.id].bitizensIGO, priceForUserBigNumber, set.tokenId, (err, tx) => {
      if (err) {
        log.error(err);
      } else {
        log.info("Transaction hash: ", tx);
        this.logPurchase(tx, set);
      }
    });
  }

  setSection(set) {
    const itemIndices = [1, 2, 3, 4];
    const remainingForSet = 40; // TODO - get remaining for set
    return (
      <Row key={set.id}>
        <style jsx>{`
          :global(.presale-purchase-set-image) {
            margin-bottom: 5px;
            border: 1px solid lightgray;
          }
        `}</style>
        <Col xs={6} sm={7}>
          <Row>
            <Col xs={12}>
              <h3>{set.name}</h3>
            </Col>
            <Col lg={4}>
              <Image responsive src={`/static/images/games/bitizens/presale/${set.id}/thumbnail.jpg`} className="presale-purchase-set-image" />
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
            subtitle={<>{remainingForSet} / {set.total} <FormattedMessage id="global.remaining" /></>}
            itemImages={itemIndices.map((v, k) => <img key={k} src={`/static/images/games/${this.props.slug}/presale/${set.id}/items/${v}.png`} />)}
            setDetails={itemIndices.map((v, k) => <li key={k}><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.item${v}.name`} /></li>)}
            buttonText={`BUY for ${set.price} PLAT`}
          />
        </Col>
      </Row>
    );
  }

  presaleTitles() {
    return (
      <Row>
        <style jsx>{`
          .title-section {
            display: flex;
          }
          .titles {
            height: 100px;
            display: inline-block;
            margin-left: 5%;
          }
          .title.with-subtitle {
            margin: 0 0 14px 0;
          }
          .subtitle {
            margin: 0;
          }
          .presale-stat {
            line-height: 1.8em !important;
            font-size: 1.8em !important;
            font-weight: 500;
            margin: 20px 0 0 0;
          }
          .presale-label {
            margin: 0 0 10px 0;
          }
          .title-image {
            display: inline-block;
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
    );
  }

  presaleBanner() {
    return (
      <Row>
        <style jsx>{`
          .presale-stat {
            margin: 20px 0 0 0;
          }
          .presale-label {
            margin: 0 0 10px 0;
          }
        `}</style>
        <Col xs={12} sm={7} className="presale-banner-primary">
          <Image responsive src="/static/images/games/bitizens/presale/header.jpg" />
        </Col>
        <Col xs={12} sm={5}>
          <h3 className="presale-stat">72 / 138</h3>
          <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.items-bought`} /></p>
          <h3 className="presale-stat">138</h3>
          <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.total-buyers`} /></p>
          <h3 className="presale-stat">2 / 3</h3>
          <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.stretch-goals-unlocked`} /></p>
        </Col>
      </Row>
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
              {/* <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p5`} /></p>
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p6`} /></p>
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p7`} /></p>
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p8`} /></p>
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.description-text.p9`} /></p> */}
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
          {::this.presaleTitles()}
          {::this.presaleBanner()}
          {::this.presaleProgress(progress)}
          {::this.presaleInfo()}
          {SETS.map(set => ::this.setSection(set))}
      </div>
    );
  }
}

export default Presale;
