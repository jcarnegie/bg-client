import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {Grid, Col, Image, Row, Carousel} from "react-bootstrap";
import {connect} from "react-redux";
import Link from "next/link";
import Router from "next/router";

import {Mobile, Desktop} from "@/components/responsive";
import GameIcon from "@/components/gameicon";
import BGButton from "@/components/bgbutton";
import BGIcon from "@/components/bgicon";
import BGGrid from "@/components/bggrid";
import BGGameCard from "@/components/bggamecard";

import {featureOn} from "@/shared/utils";
import {GAMES_REQUEST} from "@/shared/constants/actions";
import style from "@/shared/constants/style";


@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
    games: state.games,
  })
)
class GameList extends Component {
  static propTypes = {
    games: PropTypes.shape({
      data: PropTypes.array,
      active: PropTypes.array,
      comingSoon: PropTypes.array,
    }),
    dispatch: PropTypes.func,
    analytics: PropTypes.object,
  }

  static defaultProps = {
    games: {
      data: [],
      active: [],
      comingSoon: [],
    },
    dispatch: () => {},
  }

  componentDidMount() {
    const {games} = this.props;
    if (!games.data || !games.data.length) {
      this.props.dispatch({
        type: GAMES_REQUEST,
      });
    }
  }

  navigateToGame(slug) {
    this.props.analytics.ga.event({
      category: "Site Interaction",
      action: "Play",
      label: slug,
    });

    Router.push({
        pathname: "/game",
        query: {slug},
      },
      `/game/${slug}`
    );
  }

  banner() {
    const {games} = this.props;
    if (!games.data) return null;
    return (
      <Row>
        <style jsx>{`
          :global(.hero-carousel .carousel-inner) {
            cursor: pointer;
            background: black;
          }
          :global(.hero-carousel .carousel-image),
          :global(.hero-carousel .carousel-inner),
          :global(.hero-carousel .carousel-inner .item) {
            height: 600px;
            margin: 0 auto;
          }
          :global(.hero-carousel .carousel-control) {
            background-image: none !important; /* Bootstrap overrides */
            opacity: .9;
            max-width: 100px;
          }
          :global(.hero-carousel .carousel-control .glyphicon) {
            text-shadow: 1px 1px 4px black;
          }
          :global(.hero-carousel .carousel-control .glyphicon:before) {
            font-size: 45px !important;
          }
          :global(.hero-carousel .carousel-indicators li) {
            box-shadow: 1px 1px 4px black;
          }
          :global(.hero-carousel .carousel-control:hover) {
            opacity: 1;
          }
          :global(.hero-carousel .carousel-image) {
            background-size: auto 100%;
            background-position: center center;
            background-repeat: no-repeat;
          }
        `}</style>
        <Col>
          <Carousel interval={null} className="hero-carousel">
            {games.data.map((game, idx) => (
              <Carousel.Item key={idx} onClick={() => ::this.navigateToGame(game.slug)}>
                <div className="carousel-image" style={{backgroundImage: `url(/static/images/games/${game.slug}/banner.jpg)`}} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
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

  events() {
    return (
      <div className="events">
        <style jsx>{`
          .events {
            background-size: contain;
            background-color: #F1F5FF;
            color: #314B88;
            border-bottom: 1px solid #c7c6f2;
            height: 200px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .events-center {
            flex-grow: 2;
            text-align: center;
          }
          .events-title,
          .events-subtitle {
            display: block;
            text-align: center;
            text-transform: uppercase;
            margin: 0;
          }
          .events-title {
            font-size: 40px;
            font-weight: 600;
            color: rgb(247,200,65);
            text-shadow: 1px 1px 1px #314B88;
          }
          .events-subtitle {
            font-size: 36px;
            color: #314B88;
            text-shadow: 1px 1px 1px #999;
          }
          .events-title-mobile {
            font-size: 24px;
          }
          .events-subtitle-mobile {
            font-size: 20px;
          }
          .bitguild-logo-wrapper {
            width: 75px;
          }
          :global(.events-flex) {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
          }
          :global(.events .events-button) {
            margin-top: 10px;
          }
        `}</style>
        <GameIcon game={{slug: "ether.online"}} width="75px" className="events-flex" />
        <div className="events-center">
          <Mobile>
            <h2 className="events-title events-title-mobile">Ether Online</h2>
            <h3 className="events-subtitle events-subtitle-mobile">
              <FormattedMessage id="pages.games.events.pets-giveaway"></FormattedMessage>
            </h3>
          </Mobile>
          <Desktop>
            <h2 className="events-title">Ether Online</h2>
            <h3 className="events-subtitle">
              <FormattedMessage id="pages.games.events.pets-giveaway"></FormattedMessage>
            </h3>
          </Desktop>
          <div>
            <BGButton className="events-button" onClick={() => Router.push("/events")}>
              <FormattedMessage id="pages.games.events.learn-more"></FormattedMessage>
            </BGButton>
          </div>
        </div>
        <div className="events-flex bitguild-logo-wrapper">
          <BGIcon src="/static/images/icons/bitguild_logo@1x.png" className="bitguild-logo events-flex" width="75px" />
        </div>
      </div>
    );
  }

  allGames() {
    return (
      <BGGrid title={"All Games"} titleIconSrc={"http://via.placeholder.com/100x100"}>
        {this.props.games.active.map((game, k) => <BGGameCard key={k} game={game} />)}
      </BGGrid>
    );
  }

  comingSoon() {
    return (
      <BGGrid title={"Coming Soon"} titleIconSrc={"http://via.placeholder.com/100x100"} backgroundImage={"linear-gradient(#DFECFE 50%, #DFECFE 75%, white 50%)"}>
        {this.props.games.comingSoon.map((game, k) => <BGGameCard key={k} game={game} />)}
      </BGGrid>
    );
  }

  aboutBitGuild() {
    return (
      <BGGrid title={"About BitGuild"} titleIconSrc={"http://via.placeholder.com/100x100"} style={{background: "#A5BEE4"}}>
        <style jsx>{`
          .img-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
          }
          :global(.img-wrapper img) {
            margin: 0 10px;
            max-width: 30%;
          }
          h3 {
            font-size: 3em;
            font-weight: 300;
          }
        `}</style>
        <Row>
          <Col xs={12} sm={6}>
            <div>
              <h3><FormattedMessage id="pages.games.about.tagline"></FormattedMessage></h3>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Col>
              <div>
                <p><FormattedMessage id="pages.games.about.body"></FormattedMessage></p>
              </div>
            </Col>
            <Col>
              <div className="img-wrapper">
                <Image src="http://via.placeholder.com/100x100" circle responsive />
                <Image src="http://via.placeholder.com/100x100" circle responsive />
                <Image src="http://via.placeholder.com/100x100" circle responsive />
              </div>
            </Col>
          </Col>
        </Row>
        <Row style={{width: "100%", margin: "10px 20px"}}>
          <Col xs={12} sm={6} style={{borderBottom: "1px solid #3B5998"}}><div /></Col>
        </Row>
      </BGGrid>
    );
  }

  footer() {
    return (
      <div className="explore">
        <style jsx>{`
          .explore {
            padding: 20px;
          }
          :global(.explore span) {
            margin-left: 20px;
          }
        `}</style>
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
      </div>
    );
  }

  render() {
    return (
      <Grid fluid>

        {this.banner()}

        <Row>
          <Col>
            {this.presale("bitizens")}
          </Col>
          <Col>
            {this.events()}
          </Col>
        </Row>

        <Row>
          <Col>
            {::this.allGames()}
          </Col>
        </Row>

        <Row>
          <Col>
            {::this.comingSoon()}
          </Col>
        </Row>

        <Row>
          <Col>
            {::this.aboutBitGuild()}
          </Col>
        </Row>

        <Row>
          <Col>
            {::this.footer()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default GameList;
