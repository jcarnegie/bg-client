import "./index.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";


const GAMES = {
  'etheronline': {
    url: "/game/ether.online",
    name: "etheronline",
  },
  'magicacademy': {
    url: "/game/magicacademy",
    name: "magicacademy",
  },
}

export default class GameList extends Component {

  state = {
    interval: null,
    bannerInterval: null,
    countdown: null,
    showingGame: GAMES.etheronline,
  };

  componentDidMount() {
    const countDownDate = new Date("2018-05-19T22:15:00.000Z").getTime();

    this.setState({
      bannerInterval: setInterval(() => {
        this.switchBanner()
      }, 5000),

      interval: setInterval(() => {
        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = countDownDate - now;

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

    this.banner = this.banner.bind(this);
    this.switchBanner = this.switchBanner.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    clearInterval(this.state.bannerInterval);
  }

  renderCountDown() {
    const {countdown} = this.state;

    if (!countdown) {
      return null;
    }

    return (
      <Row className="time">
        {Object.keys(countdown).map(key =>
          <Col sm={3} key={key}>
            <div className="value">{countdown[key]}</div>
            <div className="units"><FormattedMessage id={`pages.games.airdrop.${key}`} /></div>
          </Col>
        )}
      </Row>
    );
  }

  switchBanner() {
    if (this.state.showingGame.name === 'etheronline') {
      this.setState({showingGame: GAMES.magicacademy })
    } else {
      this.setState({showingGame: GAMES.etheronline })
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
    )
  }

  render() {
    return (
      <Row>
        <Col className="grap gap games">
          {this.banner()}
          <Row className="airdrop">
            <Col md={6} className="countdown">
              <div className="caption">
                <FormattedMessage id="pages.games.airdrop.countdown" />
                <FormattedMessage id="components.colon" />
              </div>
              {this.renderCountDown()}
            </Col>
            <Col md={6} className="giveaway">
              <Image src="/images/ether_logo.png" />
              <div className="caption">
                <FormattedMessage id="pages.games.airdrop.giveaway" />
              </div>
              <Button href="/airdrop">
                <FormattedMessage id="pages.games.airdrop.learn-more" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="announce">
              <Row>
                <Col md={6}>
                  <h3><FormattedMessage id="pages.games.announce.coming-soon" /></h3>
                  <Image src="/images/coming-soon.png" />
                </Col>
                <Col md={6}>
                  <h3><FormattedMessage id="pages.games.announce.in-development" /></h3>
                  <Image src="/images/in-development.png" />
                </Col>
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
