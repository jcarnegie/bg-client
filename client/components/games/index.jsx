import "./index.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";

const BANNER_SWITCH_INTERVAL = 10e3;
const COUNT_DOWN_DATE = new Date().getTime();

const GAMES = {
  "etheronline": {
    url: "/game/ether.online",
    name: "etheronline"
  },
  "magicacademy": {
    url: "/game/magicacademy",
    name: "magicacademy"
  }
};

export default class GameList extends Component {
  state = {
    interval: null,
    bannerInterval: null,
    countdown: null,
    showingGame: GAMES.magicacademy
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
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          }
        });

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(this.state.interval);
        }
      }, 1000)
    });

    this.airdrop = ::this.airdrop;
    this.banner = ::this.banner;
    this.countdown = ::this.countdown;
    this.switchBanner = ::this.switchBanner;
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
    return (
      <div className={`banner ${this.state.showingGame.name}`}>
        <div onClick={this.switchBanner} className="carousel-nav-button carousel-nav-button-left">
          <Image src="/images/buttons/arrow_large_left.png" />
        </div>
        <div onClick={this.switchBanner} className="carousel-nav-button carousel-nav-button-right">
          <Image src="/images/buttons/arrow_large_left.png" />
        </div>
        <Button href={this.state.showingGame.url}>
          <Image src="/images/buttons/play/black.png" />
          <FormattedMessage id="pages.games.banner.play" />
        </Button>
      </div>
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
        <Image src="/images/ether_logo.png" />
        <div className="caption">
          <FormattedMessage id="pages.games.airdrop.giveaway-over" />
        </div>
        <Button href="/airdrop">
          <FormattedMessage id="pages.games.airdrop.learn-more" />
        </Button>
      </Col>
    );
  }

  airdrop() {
    return (
      <Col md={6} className="giveaway">
        <Image src="/images/ether_logo.png" />
        <div className="caption">
          <FormattedMessage id="pages.games.airdrop.giveaway" />
        </div>
        <Button href="/airdrop">
          <FormattedMessage id="pages.games.airdrop.learn-more" />
        </Button>
      </Col>
    );
  }

  render() {
    return (
      <Row>
        <Col className="grap gap games">
          {this.banner()}
          <Row className="airdrop">
            {this.countdown()}
            {this.countdownIsOver() ? this.airdropOver() : this.airdrop()}
          </Row>
          <Row>
            <Col className="announce">
              <Row>
                {this.comingSoon("/images/axie_banner.png")}
                {this.comingSoon("/images/eth_town.png")}
                {this.comingSoon("/images/mythereum_banner.png")}
                {this.comingSoon("/images/in-development.png", "pages.games.announce.in-development")}
              </Row>
            </Col>
          </Row>
          <div className="explore">
            <FormattedMessage id="pages.games.explore.questions" />
            <Link to="/faq">
              <FormattedMessage id="pages.games.explore.faq" />
            </Link>
            <a href="https://discordapp.com/invite/pPC2frB" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="pages.games.explore.discord" />
            </a>
          </div>
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
