import React, {Component} from "react";
import {Grid, Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Link from "next/link";
import Router from "next/router";
import ReactGA from "react-ga";

import {Mobile, Desktop} from "@/components/responsive";
import GameIcon from "@/components/gameicon";
import BGIcon from "@/components/bgicon";

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

export default class GameList extends Component {
  state = {
    interval: null,
    bannerInterval: null,
    countdown: null,
    showingGame: GAMES.magicacademy,
  };

  componentDidMount() {
    this.setState({
      bannerInterval: setInterval(() => {
        this.switchBanner();
      }, BANNER_SWITCH_INTERVAL),

      interval: setInterval(() => {
        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = COUNT_DOWN_DATE - now;

        // Time calculations for days, hours, minutes and seconds
        this.setState({
          countdown: {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          },
        });

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(this.state.interval);
        }
      }, 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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
    const {slug} = this.state.showingGame;
    return (
      <div className={`banner ${this.state.showingGame.name}`}>
        <div onClick={::this.switchBanner} className="carousel-nav-button carousel-nav-button-left">
          <Image src="/static/images/icons/arrow_large_left.png" />
        </div>
        <div onClick={::this.switchBanner} className="carousel-nav-button carousel-nav-button-right">
          <Image src="/static/images/icons/arrow_large_left.png" />
        </div>
        <Link href={{pathname: "/game", query: {slug}}} as={`/game/${slug}`}>
          <Button onClick={::this.onBannerClick}>
            <Image src="/static/images/icons/play_black.png" />
            <FormattedMessage id="pages.games.banner.play" />
          </Button>
        </Link>
      </div>
    );
  }

  onBannerClick() {
    ReactGA.event({
      category: "Site Interaction",
      action: "Play",
      label: this.state.showingGame.name,
    });
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
          <FormattedMessage id="pages.games.airdrop.countdown" />
          <FormattedMessage id="components.colon" />
        </div>
        <Row className="time">
          {Object.keys(countdown).map(key =>
            <Col sm={3} key={key}>
              <div className="value">{countdown[key]}</div>
              <div className="units"><FormattedMessage id={`pages.games.airdrop.${key}`} /></div>
            </Col>
          )}
        </Row>
      </Col>
    );
  }

  airdropOver() {
    return (
      <Col md={12} className="giveaway">
        <Image src="/static/images/banners/ether.online/icon.png" />
        <div className="caption">
          <FormattedMessage id="pages.games.airdrop.giveaway-over" />
        </div>
        <Link href="/airdrop">
          <Button bsStyle="primary">
            <FormattedMessage id="pages.games.airdrop.learn-more" />
          </Button>
        </Link>
      </Col>
    );
  }

  airdrop() {
    return (
      <div className="airdrop">
        <style jsx>{`
          .airdrop {
            background-image: url("/static/images/backgrounds/hexBlue.png");
            background-size: contain;
            background-color: rgb(30, 124, 187);
            color: #314B88;
            border-bottom: 1px solid #c7c6f2;
            height: 200px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .airdrop-center {
            flex-grow: 2;
            text-align: center;
          }
          .airdrop-title,
          .airdrop-subtitle {
            display: block;
            text-align: center;
            text-transform: uppercase;
            margin: 0;
          }
          .airdrop-title {
            font-size: 40px;
            font-weight: 600;
            background: -webkit-linear-gradient(rgb(254,241,161), rgb(254,196,54));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .airdrop-subtitle {
            font-size: 36px;
            color: rgb(255,255,255);
            text-shadow: 0 0 2px black;
            letter-spacing: 2px;
          }
          .airdrop-button {
            color: #130029;
            background: linear-gradient(to right,#b1c8e8 0%,#fbfcff 100%);
            font-size: 14px;
            font-weight: 700;
            padding: 10px 20px;
            margin: 12px 0 0 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
          }
          .airdrop-button:hover {
            background: linear-gradient(to right,#7189b6 0%,#dcdee8 100%);
            color: #130029;
          }
          .airdrop-title-mobile {
            font-size: 24px;
          }
          .airdrop-subtitle-mobile {
            font-size: 20px;
          }
          .bitguild-logo-wrapper {
            width: 75px;
          }
          :global(.airdrop-flex) {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
          }
        `}</style>
        <GameIcon game={{slug: "ether.online"}} className="airdrop-flex" />
        <div className="airdrop-center">
          <Mobile>
            <h2 className="airdrop-title airdrop-title-mobile">Ether Online</h2>
            <h3 className="airdrop-subtitle airdrop-subtitle-mobile">Pet Giveaway</h3>
          </Mobile>
          <Desktop>
            <h2 className="airdrop-title">Ether Online</h2>
            <h3 className="airdrop-subtitle">Pet Giveaway</h3>
          </Desktop>
          <div>
            <button className="airdrop-button" onClick={() => Router.push("/airdrop")}>
              <FormattedMessage id="pages.games.airdrop.learn-more"></FormattedMessage>
            </button>
          </div>
        </div>
        <div className="airdrop-flex bitguild-logo-wrapper">
          <BGIcon src="/static/images/icons/bitguild_logo@1x.png" className="bitguild-logo airdrop-flex" width="50px" />
        </div>
      </div>
    );
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
            background-image: url("/static/images/games/ether.online/banner.png");
          }
          .games .banner.magicacademy {
            background-image: url("/static/images/games/magicacademy/banner.png");
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
            {this.airdrop()}
          </Col>
        </Row>
        <Row className="announce">
          {this.comingSoon("/static/images/games/axie/banner.png")}
          {this.comingSoon("/static/images/games/eth_town/banner.png")}
          {this.comingSoon("/static/images/games/mythereum/banner.png")}
          {this.comingSoon("/static/images/games/bitizens/banner.png", "pages.games.announce.in-development")}
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
              ReactGA.event({
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
