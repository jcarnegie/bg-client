import React, {Component} from "react";
import * as log from "loglevel";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import {Image, Row, Col, Tab, Tabs, ProgressBar} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";

import tokenABI from "@/shared/contracts/token";
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
    layout: state.layout,
  }),
)
class Presale extends Component {
  static propTypes = {
    slug: PropTypes.string,
    balancePLAT: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    layout: PropTypes.object,
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
      },
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
            <Row>
              <Col lg={10}>
                <Image responsive src={`/static/images/games/bitizens/presale/${set.id}/banner.jpg`} className="presale-purchase-set-image" />
              </Col>
            </Row>
            <Row>
              <Col lg={10}>
                <p><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.description`} /></p>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={6} sm={5}>
          <ItemSetDetailsCard
            key={set.id}
            onClick={() => ::this.purchase(set)}
            title={set.name}
            subtitle={<>{remainingForSet} / {set.total} <FormattedMessage id="global.remaining" /></>}
            itemImage={<Image responsive src={`/static/images/games/${this.props.slug}/presale/${set.id}/thumbnail.jpg`} />}
            setDetails={itemIndices.map((v, k) => <li key={k}><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.item${v}.name`} /></li>)}
            buttonText={`BUY for ${set.price} PLAT`}
          />
        </Col>
      </Row>
    );
  }

  presaleTitles() {
    const {mobile} = this.props.layout.type;
    return (
      <Row>
        <style jsx>{`
          .title-section {
            display: flex;
            margin-bottom: ${mobile ? "0" : "20px"};
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
                <Image src={`/static/images/games/${this.props.slug}/icon.png`} height={70} width={90} />
              </Mobile>
              <Desktop>
                <Image src={`/static/images/games/${this.props.slug}/icon.png`} height={100} width={129} />
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
    const {mobile} = this.props.layout.type;
    // TODO - Get sold items count
    const progress = Math.floor((84 / TOTAL_ITEMS_COUNT) * 100); /* Percentage items sold */

    return (
      <Row className="presale-banner-row">
        <style jsx>{`
          :global(.presale-banner-row) {
            // box-shadow: ${style.boxShadow.default};
          }
          :global(.presale-banner-row > div:nth-child(1)) {
            padding: ${mobile ? "initial" : "0"};
          }
          :global(.presale-banner-row > div:nth-child(2)) {

          }
          .presale-stats-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .presale-stat {
            // margin: 20px 0 0 0;
          }
          .presale-label {
            // margin: 0 0 10px 0;
            font-size: .8em;
          }
        `}</style>
        <Col xs={12} sm={7} className="presale-banner-primary">
          <Image responsive src={`/static/images/games/${this.props.slug}/presale/header.jpg`} />
        </Col>
        <Col xs={12} sm={5}>
          <div className="presale-stats-wrapper">
            <div>
              <h5 className="presale-stat">72 / 138</h5>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.items-bought`} /></p>
            </div>
            <div>
              <h5 className="presale-stat">138</h5>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.total-buyers`} /></p>
            </div>
            <div>
              <h5 className="presale-stat">2 / 3</h5>
              <p className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.stretch-goals-unlocked`} /></p>
            </div>
          </div>
          {::this.presaleProgress(progress)}
        </Col>
      </Row>
    );
  }

  presaleProgress(progress) {
    return (
      <div className="presale-progress">
        <Row>
          <style jsx>{`
            :global(.presale-progress) {
              font-size: .8em;
            }
            :global(.presale-progress .row) {
              margin-bottom: 0;
            }
            :global(.presale-progress-bar .progress) {
              height: 4px;
              margin: 0 0 13px 0;
            }
            .bonus-rewards {
              width: 100%;
              margin-bottom: 5px;
              display: flex;
            }
            .bonus-reward {
              width: 50%;
              height: 100px;
              display: inline-block;
              position: relative;
              border: 1px solid lightgray;
              vertical-align: top;
            }
            :global(.presale-progress .bonus-reward img) {
              max-height: calc(100% - 10px);
              margin: 5px;
              width: 25%;
              display: inline-block;
            }
            .bonus-reward-disabled {
              opacity: .4;
              background-color: gray;
            }
          `}</style>
          <Col md={12}>
            <div className="presale-progress-bar">
              <ProgressBar key={1} now={progress} />
            </div>
          </Col>
          <Col md={12}>
            <div className="bonus-rewards">
              <div className="bonus-reward bonus-reward-activated">
                <Image responsive src={`/static/images/games/${this.props.slug}/icon.png`} />
                <span>Dril'r Bot Pioneer-I</span>
              </div>
              <div className="bonus-reward bonus-reward-disabled">
                <Image responsive src={`/static/images/games/${this.props.slug}/icon.png`} />
                <span>Pioneer's Rocket</span>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-1-description`} /></p>
            <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-2-description`} /></p>
          </Col>
        </Row>
      </div>
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
    return (
      <div className="presale">
        <style jsx global>{`
          .presale .row {
            margin-bottom: 20px;
          }
          .presale .popover {
            padding: 0;
          }
        `}</style>
          {::this.presaleTitles()}
          {::this.presaleBanner()}
          {::this.presaleInfo()}
          {SETS.map(set => ::this.setSection(set))}
      </div>
    );
  }
}

export default Presale;
