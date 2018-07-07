import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid, Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import Link from "next/link";
import Router from "next/router";

import {featureOn} from "@/shared/utils";
import {Mobile, Desktop} from "@/components/responsive";
import GameIcon from "@/components/gameicon";
import BGButton from "@/components/bgbutton";
import BGIcon from "@/components/bgicon";

import style from "@/shared/constants/style";

const BANNER_SWITCH_INTERVAL = 10e3;
const COUNT_DOWN_DATE = new Date("2018-05-21T22:15:00.000Z").getTime();

// TODO use store, re-factor styles and rebuild UI
// TODO button component with styles, or global button styles

const GAMES = {
  "etheronline": {
    slug: "ether.online",
    name: "etheronline",
  },
  "magicacademy": {
    slug: "magicacademy",
    name: "magicacademy",
  },
};

@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
  })
)
export default class GameList extends Component {
  state = {
    bannerInterval: null,
    countdown: null,
    showingGame: GAMES.magicacademy,
  };

  static propTypes = {
    analytics: PropTypes.object,
  }

  componentDidMount() {
    this.setState({
      bannerInterval: setInterval(() => {
        this.switchBanner();
      }, BANNER_SWITCH_INTERVAL),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.bannerInterval);
  }

  switchBanner() {
    if (this.state.showingGame.name === "etheronline") {
      this.setState({showingGame: GAMES.magicacademy});
    } else {
      this.setState({showingGame: GAMES.etheronline});
    }
  }

  banner() {
    return (
      <div className={`banner ${this.state.showingGame.name}`}>
        <div onClick={::this.switchBanner} className="carousel-nav-button carousel-nav-button-left">
          <Image src="/static/images/icons/arrow_large_left.png" />
        </div>
        <div onClick={::this.switchBanner} className="carousel-nav-button carousel-nav-button-right">
          <Image src="/static/images/icons/arrow_large_left.png" />
        </div>
        <Button onClick={::this.onBannerClick}>
          <Image src="/static/images/icons/play_black.png" />
          <FormattedMessage id="pages.games.banner.play" />
        </Button>
      </div>
    );
  }

  onBannerClick() {
    const {slug} = this.state.showingGame;

    this.props.analytics.ga.event({
      category: "Site Interaction",
      action: "Play",
      label: this.state.showingGame.name,
    });

    Router.push({
        pathname: "/game",
        query: {slug},
      },
      `/game/${slug}`
    );
  }

  comingSoon(url = "", messageId = "pages.games.announce.coming-soon") {
    return (
      <Col className="upcoming-thumbnail" md={6}>
        <h3><FormattedMessage id={messageId} /></h3>
        <Image src={url} />
      </Col>
    );
  }

  countdownIsOver() {
    return (COUNT_DOWN_DATE - new Date().getTime()) <= 0;
  }

  countdown() {
    const {countdown} = this.state;

    if (!countdown || this.countdownIsOver()) {
      return null;
    }

    return (
      <Col md={6} className="countdown">
        <div className="caption">
          <FormattedMessage id="pages.games.events.countdown" />
          <FormattedMessage id="components.colon" />
        </div>
        <Row className="time">
          {Object.keys(countdown).map(key =>
            <Col sm={3} key={key}>
              <div className="value">{countdown[key]}</div>
              <div className="units"><FormattedMessage id={`pages.games.events.${key}`} /></div>
            </Col>
          )}
        </Row>
      </Col>
    );
  }

  eventsOver() {
    return (
      <Col md={12} className="giveaway">
        <Image src="/static/images/banners/ether.online/icon.png" />
        <div className="caption">
          <FormattedMessage id="pages.games.events.giveaway-over" />
        </div>
        <Link href="/events">
          <Button bsStyle="primary">
            <FormattedMessage id="pages.games.events.learn-more" />
          </Button>
        </Link>
      </Col>
    );
  }

  presale(slug) {
    return featureOn("bitizens_presale") ? (
      <div onClick={() => Router.push({pathname: "/presale", query: {slug}}, `/presale/${slug}`)} className="promotional-banner presale-banner">
        <style jsx>{`
          .promotional-banner.presale-banner {
            background-color: rgba(109, 151, 233, 1);
            color: ${style.colors.logos};
            border-bottom: 1px solid #c7c6f2;
            height: 200px;
            width: 100%;
            text-align: center;
            text-shadow: ${style.textShadow.default};
            cursor: pointer;
          }
          .promotional-banner.presale-banner * {
            text-align: center;
          }
          h1 {
            text-transform: uppercase;
            text-align: center;
          }
        `}</style>
        <Row>
          <BGIcon src="/static/images/icons/bitguild_logo@1x.png" width="25px" style={{marginTop: "20px"}} />
        </Row>
        <Row>
          <h1><FormattedMessage id={`pages.presale.${slug}.title`} /></h1>
        </Row>
        <Row>
          <BGButton>
            <FormattedMessage id="pages.games.events.learn-more"></FormattedMessage>
          </BGButton>
        </Row>
      </div>
    ) : null;
  }

  render() {
    return (
      <Grid fluid className="games">
        <style jsx global>{`
          .carousel-nav-button {
            position: absolute;
            top: 50%;
            height: 70px;
            width: 55px;
            background-color: rgba(255, 255, 255, 0.4);
            transform: translate(0, -50%);
            cursor: pointer;
          }
          .carousel-nav-button:hover {
            background-color: rgba(255, 255, 255, 0.75);
          }
          .carousel-nav-button-left {
            left: 0;
          }
          .carousel-nav-button-left img {
            top: 50%;
            transform: translateY(-50%);
            height: 38px;
            width: 25px;
            position: absolute;
            left: 12px;
          }
          .carousel-nav-button-right {
            right: 0;
            transform: translate(0, -50%) rotate(180deg);
          }
          .carousel-nav-button-right img {
            top: 50%;
            transform: translateY(-50%);
            height: 38px;
            width: 25px;
            position: absolute;
            left: 12px;
          }
          .games .banner {
            background-size: auto 100%;
            background-position: center;
            background-repeat: none;
            height: 450px;
            position: relative;
          }
          .games .banner.etheronline {
            background-image: url("/static/images/games/ether.online/banner.jpg");
          }
          .games .banner.magicacademy {
            background-image: url("/static/images/games/magicacademy/banner.jpg");
          }
          .games .banner .btn {
            color: #130029;
            background: linear-gradient(to right, #b1c8e8 0%, #fbfcff 100%);
            font-size: 22px;
            font-weight: 700;
            padding: 0;
            width: 148px;
            height: 54px;
            line-height: 54px;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            position: absolute;
            bottom: 0;
            margin: 30px auto;
            left: 0;
            right: 0;
          }
          .games .banner .btn:hover {
            background: linear-gradient(to right, #7189b6 0%, #dcdee8 100%);
            color: #130029;
          }
          .games .banner .btn img {
            width: 16px;
            height: 16px;
            margin-top: -5px;
            margin-right: 5px;
          }
          .giveaway img {
            width: 66px;
            height: 45px;
            display: block;
            margin: 0 auto;
          }
          .giveaway .caption {
            font-weight: 600;
            font-size: 24px;
            line-height: 24px;
            color: #130029;
            text-transform: uppercase;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .giveaway .btn {
            text-transform: uppercase;
          }
          .giveaway button {
            font-size: 14px;
            background-color: rgb(49, 75, 136);
            color: #fff;
            border: 0;
            padding: 10px;
            border-radius: 2px;
            width: 150px;
            margin: 0 auto;
            margin-bottom: 50px;
            display: block;
          }
          .games .announce {
            margin-bottom: 62px;
            margin-top: 18px;
          }
          .games .announce h3 {
            font-size: 24px;
            text-align: center;
            font-weight: 500;
            margin-bottom: 25px;
            text-transform: uppercase;
          }
          .games .announce img {
            margin: 0 auto;
            display: block;
            width: 100%;
          }
          .games .announce .upcoming-thumbnail {
            margin-top: 40px;
          }
          .games .announce .upcoming-thumbnail:nth-child(1),
          .games .announce .upcoming-thumbnail:nth-child(2) {
            margin-top: 0;
          }
          .games .announce .upcoming-thumbnail img {
            max-width: 400px;
            height: 200px;
          }
          .games .explore {
            line-height: 32px;
            font-size: 14px;
            background-color: #fef9fb;
            color: #88789a;
            padding: 0 90px;
          }
          .games .explore a {
            text-transform: uppercase;
            margin-left: 20px;
            color: #88789A;
          }
        `}</style>
        <Row>
          <Col>
            {this.banner()}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.presale("bitizens")}
          </Col>
        </Row>
        <Row className="announce">
          {this.comingSoon("/static/images/games/axie/thumbnail.jpg")}
          {this.comingSoon("/static/images/games/eth_town/thumbnail.jpg")}
          {this.comingSoon("/static/images/games/mythereum/thumbnail.jpg")}
          {this.comingSoon("/static/images/games/bitizens/thumbnail.jpg", "pages.games.announce.in-development")}
        </Row>
        <Row className="explore">
          <Col>
            <FormattedMessage id="pages.games.explore.questions" />
            <Link href="/faq">
              <a>
                <FormattedMessage id="pages.games.explore.faq" />
              </a>
            </Link>
            <a href="https://discordapp.com/invite/pPC2frB" target="_blank" rel="noopener noreferrer" onClick={() => {
              this.props.analytics.ga.event({
                category: "Site Interaction",
                action: "Page Visit",
                label: "Discord",
              });
            }}>
              <FormattedMessage id="pages.games.explore.discord" />
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}