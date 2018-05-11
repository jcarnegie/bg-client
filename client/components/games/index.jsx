import "./index.less";
import React, {Component} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";


export default class GameList extends Component {

  state = {
    interval: null,
    countdown: null
  };

  componentDidMount() {
    const countDownDate = new Date("2018-05-20T06:59:59.000Z").getTime();

    this.setState({
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
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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

  render() {
    return (
      <Row>
        <Col className="grap gap games">
          <div className="banner">
            <Button href="/game/5af2703709bc2d18438449ad">
              <Image src="/images/buttons/play/black.png" />
              <FormattedMessage id="pages.games.banner.play" />
            </Button>
          </div>
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
              <Button>
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
            <a href="https://discordapp.com/invite/pPC2frB">
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
