import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {Grid, Col, Row, Carousel, Image} from "react-bootstrap";
import {connect} from "react-redux";
import Link from "next/link";
import Router from "next/router";

import FeatureFlag from "@/components/featureflag";
import BGButton from "@/components/bgbutton";
import BGIcon from "@/components/bgicon";
import BGGrid from "@/components/bggrid";
import BGGameCard from "@/components/bggamecard";

import {GAMES_REQUEST} from "@/shared/constants/actions";
import style from "@/shared/constants/style";


@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
    games: state.games,
    layout: state.layout,
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
    layout: PropTypes.object,
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
            height: 500px;
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
          :global(.hero-carousel .carousel-indicators) {
            bottom: 0;
          }
        `}</style>
        <Col>
          <Carousel interval={null} className="hero-carousel" defaultActiveIndex={1}>
            {games.data.map((game, idx) => {
              // TODO - database flags for game states (active|presale|development)
              // TODO - bitizens is coming soon, will need to update when launches
              if (game.slug === "bitizens") {
                return (
                  <Carousel.Item key={idx}>
                    <div
                      className="carousel-image"
                      style={{backgroundImage: "url(/static/images/games/bitizens/presale/header.jpg)"}}
                      onClick={() => Router.push({pathname: "/presale", query: {slug: game.slug}}, `/presale/${game.slug}`)}
                    />
                  </Carousel.Item>
                );
              }
              return (
                <Carousel.Item key={idx} onClick={() => ::this.navigateToGame(game.slug)}>
                  <div className="carousel-image" style={{backgroundImage: `url(/static/images/games/${game.slug}/banner.jpg)`}} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    );
  }

  presale(slug) {
    const {mobile} = this.props.layout.type;
    return (
      <div onClick={() => Router.push({pathname: "/presale", query: {slug}}, `/presale/${slug}`)} className="promotional-banner presale-banner">
        <style jsx>{`
          .promotional-banner.presale-banner {
            background-color: rgba(109, 151, 233, 1);
            color: ${style.colors.logos};
            border-bottom: 1px solid #c7c6f2;
            height: 200px;
            width: 100%;
            max-width: 100%;
            text-align: center;
            text-shadow: ${style.textShadow.default};
            cursor: pointer;
            font-size: ${mobile ? ".95em" : "initial"}
          }
          .promotional-banner.presale-banner * {
            text-align: center;
          }
          :global(.promotional-banner .row) {
            width: 100%;
            margin: auto 0;
          }
          h1 {
            text-transform: uppercase;
            text-align: center;
            margin: initial auto;
          }
          :global(.promotional-banner .button-row) {
            padding-top: 10px;
          }
        `}</style>
        <Row>
          <BGIcon src="/static/images/icons/bitguild_logo@1x.png" width="25px" style={{marginTop: "20px"}} />
        </Row>
        <Row>
          <h1><FormattedMessage id={`pages.presale.${slug}.title`} /></h1>
        </Row>
        <Row className="button-row">
          <BGButton>
            <FormattedMessage id="pages.games.events.learn-more"></FormattedMessage>
          </BGButton>
        </Row>
      </div>
    );
  }

  allGames() {
    const {mobile} = this.props.layout.type;
    return (
      <BGGrid
        title={<FormattedMessage id="global.all-games"></FormattedMessage>}
        titleIconSrc="/static/images/icons/all_games.png"
        underlayImage="/static/images/backgrounds/people_and_interactions.png"
        backgroundImageStats={{
          colors: ["#F0F6FE", "#F0F6FE", "white"],
          gap: (mobile ? "60px" : "100px"),
        }}
      >
        {this.props.games.active.map((game, k) => <BGGameCard key={k} game={game} onClick={() => ::this.navigateToGame(game.slug)} playButton />)}
      </BGGrid>
    );
  }

  comingSoon() {
    const {mobile} = this.props.layout.type;
    return (
      <BGGrid
        title={<FormattedMessage id="global.coming-soon"></FormattedMessage>}
        titleIconSrc="/static/images/icons/coming_soon.png"
        backgroundImage={"linear-gradient(#DFECFE 50%, #DFECFE calc(100% - 100px), white 100px)"}
        backgroundImageStats={{
          colors: ["#DFECFE", "#DFECFE", "white"],
          gap: (mobile ? "60px" : "100px"),
        }}
      >
        {this.props.games.comingSoon.map((game, k) => <BGGameCard key={k} game={game} />)}
      </BGGrid>
    );
  }

  aboutBitGuild() {
    const {mobile} = this.props.layout.type;
    return (
      <BGGrid
        title={<FormattedMessage id="global.about-bitguild"></FormattedMessage>}
        titleIconSrc="/static/images/icons/about.png"
        backgroundColor="#B6D0F7"
      >
        <style jsx>{`
          h3 {
            font-size: ${mobile ? "2.0em" : "2.3em"};
            font-weight: 400;
            margin-top: 0;
          }
          :global(.about-bitguild p) {
            max-width: 100%;
          }
          :global(.about-bitguild .about-text-left) {
            padding: ${mobile ? 0 : "0 10px 0 40px"};
            margin-bottom: ${mobile ? "30px" : "intiial"}
          }
          :global(.about-bitguild .about-text-right) {
            padding: ${mobile ? 0 : "0 40px 0 10px"};
          }
        `}</style>
        <Row className="about-bitguild">
          <Col xs={12} sm={6}>
            <div className="about-text-left">
              <h3><FormattedMessage id="pages.games.about.tagline"></FormattedMessage></h3>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Col>
              <div className="about-text-right">
                <p><FormattedMessage id="pages.games.about.body"></FormattedMessage></p>
              </div>
            </Col>
          </Col>
        </Row>
        {/* Divider
        <Row style={{width: "100%", margin: "10px 20px"}}>
          <Col xs={12} sm={6} style={{borderBottom: "1px solid #3B5998"}}><div /></Col>
        </Row>
        */}
      </BGGrid>
    );
  }

  footer() {
    return (
      <div className="bg-footer">
        <style jsx>{`
          .bg-footer {
            display: flex;
            flex-direction: column;
            padding: 15px 0;
            font-size: 0.8em;
          }
          :global(.bg-footer-questions, .bg-footer-socialmedia) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
          }
          :global(.bg-footer-socialmedia a) {
            margin: 0 10px;
          }
          :global(.bg-footer-questions span, .bg-footer-questions a) {
            margin: 0 4px;
          }
          :global(.socialmedia a) {
            margin: 0 10px;
            max-width: 30%;
            cursor: pointer;
          }
        `}</style>
        <div className="bg-footer-questions">
          <FormattedMessage id="pages.games.explore.questions" />
          <Link href="/faq">
            <a>
              <FormattedMessage id="pages.games.explore.faq" />
            </a>
          </Link>
        </div>
        <div className="bg-footer-socialmedia">
          <a href="https://www.facebook.com/bitguildplat/" target="_blank" rel="noopener noreferrer" onClick={() => {
            this.props.analytics.ga.event({
              category: "Site Interaction",
              action: "Page Visit",
              label: "Facebook",
            });
          }}>
            <Image responsive src="/static/images/icons/facebook.png" />
          </a>
          <a href="https://twitter.com/bitguildplat" target="_blank" rel="noopener noreferrer" onClick={() => {
            this.props.analytics.ga.event({
              category: "Site Interaction",
              action: "Page Visit",
              label: "Twitter",
            });
          }}>
            <Image responsive src="/static/images/icons/twitter.png" />
          </a>
          <a href="https://discordapp.com/invite/pPC2frB" target="_blank" rel="noopener noreferrer" onClick={() => {
            this.props.analytics.ga.event({
              category: "Site Interaction",
              action: "Page Visit",
              label: "Discord",
            });
          }}>
            <Image responsive src="/static/images/icons/discord.png" />
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Grid fluid>

        {this.banner()}

        <Row>
          <Col>
            <FeatureFlag flag="bitizens_presale">
              {this.presale("bitizens")}
            </FeatureFlag>
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
