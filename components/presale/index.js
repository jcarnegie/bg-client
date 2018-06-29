import React, {Component} from "react";
import * as log from "loglevel";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import {Image, Row, Col, Tab, Tabs, ProgressBar} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import MDCheck from "react-icons/lib/md/check";

import tokenABI from "@/shared/contracts/token";
import bitizensIGOABI from "@/shared/contracts/bitizensIGOABI";

import ScaleLoader from "react-spinners/dist/spinners/ScaleLoader";
import networkConfig from "@/client/utils/network";

// import BGModal from "@/components/modal";
import {Mobile, Desktop} from "@/components/responsive";
import ItemSetDetailsCard from "@/components/ItemSetDetailsCard";

import style from "@/shared/constants/style";

import {client as api} from "@/client/utils/apollo";

const TOTAL_ITEMS_COUNT = 139;
const BITIZENS_GAME_ID = 3;

const SETS = [
  {
    id: "pioneer_of_the_wilds",
    tokenId: 17,
    total: 100,
    price: 60000,
  },
  {
    id: "pioneer_of_the_skies",
    tokenId: 16,
    total: 25,
    price: 180000,
  },
  {
    id: "pioneer_of_the_seas",
    tokenId: 18,
    total: 10,
    price: 480000,
  },
  {
    id: "pioneer_of_the_cyberscape",
    tokenId: 19,
    total: 1,
    price: 3000000,
  },
  {
    id: "pioneer_compass",
    tokenId: 20,
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

  state = {
    qtyOf16: null,
    qtyOf17: null,
    qtyOf18: null,
    qtyOf19: null,
    qtyOf20: null,
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

  componentDidMount() {
    ::this.getQtyOfItemsRemaining();
    this.setState({
      interval: setInterval(::this.getQtyOfItemsRemaining, 5000),
    });
  }

  textLoading() {
    return <ScaleLoader height={10} width={2} color="black" style={{display: "inline"}} />;
  }

  getQtyOfItemsRemaining() {
    SETS.map(set => ::this.getQtyOfItemRemaining(set.tokenId));
  }

  getQtyOfItemRemaining(setId) {
    if (!this.props.network.data || !this.props.network.data.id) return;
    const IGOContract = window.web3.eth.contract(bitizensIGOABI).at(networkConfig[this.props.network.data.id].bitizensIGO);


    // Trigger approval for transaction
    IGOContract.getQty(setId, (err, qty) => {
      if (err) {
        log.error(err);
      } else {
        this.setState({[`qtyOf${setId}`]: qty.c[0]});
      }
    });
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
    const remainingForSet = this.state[`qtyOf${set.tokenId}`];
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
            <Col xs={12}>
              <Image responsive src={`/static/images/games/bitizens/presale/${set.id}/banner.jpg`} className="presale-purchase-set-image" />
            </Col>
            <Col xs={12}>
              <p><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.description`} /></p>
            </Col>
          </Row>
        </Col>
        <Col xs={6} sm={5}>
          <ItemSetDetailsCard
            key={set.id}
            disabled={remainingForSet === 0}
            onClick={() => ::this.purchase(set)}
            title={set.name}
            subtitle={<>{remainingForSet || remainingForSet === 0 ? <div>{`${remainingForSet} / ${set.total}`} <FormattedMessage id="global.remaining" /></div> : ::this.textLoading()}</>}
            itemImage={<Image responsive src={`/static/images/games/${this.props.slug}/presale/${set.id}/thumbnail.jpg`} />}
            setDetails={
              set.tokenId !== 20 ? itemIndices.map((v, k) => <li key={k}><FormattedMessage id={`pages.presale.${this.props.slug}.sets.${set.id}.item${v}.name`} /></li>) : null
            }
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
            font-size: 0.9em;
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
                <Image src={`/static/images/games/${this.props.slug}/icon.jpg`} height={70} width={90} />
              </Mobile>
              <Desktop>
                <Image src={`/static/images/games/${this.props.slug}/icon.jpg`} height={100} width={129} />
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
    const {
      qtyOf16,
      qtyOf17,
      qtyOf18,
      qtyOf19,
      qtyOf20,
    } = this.state;

    const loading = (
      qtyOf16 === null ||
      qtyOf17 === null ||
      qtyOf18 === null ||
      qtyOf19 === null ||
      qtyOf20 === null
    );

    const totalSold = loading ? 0 : (TOTAL_ITEMS_COUNT - (
      (qtyOf16 || 0) +
      (qtyOf17 || 0) +
      (qtyOf18 || 0) +
      (qtyOf19 || 0) +
      (qtyOf20 || 0)
    ));

    const totalBuyers = totalSold;

    const progress = totalSold / TOTAL_ITEMS_COUNT; /* Raw items sold progress */
    const progressPercentage = progress * 100; /* Percentage items sold */

    let steps = 0;
    if (progress >= 0.3 && progress < 0.7) {
      steps = 1;
    } else if (progress >= 0.7) {
      steps = 2;
    }

    return (
      <Row className="presale-banner-row">
        <style jsx>{`
          .presale-stats-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .presale-label {
            font-size: .8em;
          }
        `}</style>
        <Col xs={12} sm={7} className="presale-banner-primary">
          <Image responsive src={`/static/images/games/${this.props.slug}/presale/header.jpg`} />
        </Col>
        <Col xs={12} sm={5}>
          <div className="presale-stats-wrapper">
            <div>
              <h5 className="presale-stat">{loading ? ::this.textLoading() : `${totalSold} / ${TOTAL_ITEMS_COUNT}`}</h5>
              <div className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.items-bought`} /></div>
            </div>
            <div>
              <h5 className="presale-stat">{loading ? ::this.textLoading() : totalBuyers}</h5>
              <div className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.total-buyers`} /></div>
            </div>
            <div>
              <h5 className="presale-stat">{loading ? ::this.textLoading() : `${steps} / 2`}</h5>
              <div className="presale-label"><FormattedMessage id={`pages.presale.${this.props.slug}.stretch-goals-unlocked`} /></div>
            </div>
          </div>
          {::this.presaleProgress(progressPercentage)}
        </Col>
      </Row>
    );
  }

  unlocked() {
    return (
      <div style={{marginTop: "10px"}}>Unlocked! <MDCheck height={20} width={20} color="green" style={{transform: "translateY(-5px)"}} /></div>
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
              display: flex;
              position: relative;
              border: 1px solid lightgray;
              vertical-align: top;
            }
            .bonus-reward-title {
              display: inline;
              height: 100%;
              padding: 10px 0 0 0;
            }
            :global(.presale-progress .bonus-reward img) {
              height: calc(100% - 20px);
              margin: 10px 0;
              display: inline;
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
              <div className={`bonus-reward ${progress > 30 ? "bonus-reward-activated" : "bonus-reward-disabled"}`}>
                <Image responsive src={`/static/images/games/${this.props.slug}/presale/pioneers_drillrbot.png`} />
                <div className="bonus-reward-title">
                  <span><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-1-title`} /></span>
                  {progress > 30 ? ::this.unlocked() : null}
                </div>
              </div>
              <div className={`bonus-reward ${progress > 70 ? "bonus-reward-activated" : "bonus-reward-disabled"}`}>
                <Image responsive src={`/static/images/games/${this.props.slug}/presale/pioneers_rocket.png`} />
                <div className="bonus-reward-title">
                  <span><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.bonus-reward-2-title`} /></span>
                  {progress > 70 ? ::this.unlocked() : null}
                </div>
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
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p5`} /></p>
              <ol>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l1`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l2`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l3`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l4`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l5`} /></li>
              </ol>
              <p><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.p6`} /></p>
              <ol>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l6`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l7`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l8`} /></li>
                <li><FormattedHTMLMessage id={`pages.presale.${this.props.slug}.rules-text.l9`} /></li>
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
