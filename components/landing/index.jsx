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
        `}</style>
        <Col>
          <Carousel interval={null} className="hero-carousel">
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
            font-size: ${mobile ? "0.9em" : "initial"}
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
    );
  }

  allGames() {
    return (
      <BGGrid
        title={<FormattedMessage id="global.all-games"></FormattedMessage>}
        titleIconSrc="/static/images/icons/all_games.png"
        underlayImage="/static/images/backgrounds/people_and_interactions.png"
        >
        {this.props.games.active.map((game, k) => <BGGameCard key={k} game={game} onClick={() => ::this.navigateToGame(game.slug)} playButton />)}
      </BGGrid>
    );
  }

  comingSoon() {
    return (
      <BGGrid title={<FormattedMessage id="global.coming-soon"></FormattedMessage>} titleIconSrc="/static/images/icons/coming_soon.png" backgroundImage={"linear-gradient(#DFECFE 50%, #DFECFE 75%, white 50%)"}>
        {this.props.games.comingSoon.map((game, k) => <BGGameCard key={k} game={game} />)}
      </BGGrid>
    );
  }

  aboutBitGuild() {
    const {mobile} = this.props.layout.type;
    return (
      <BGGrid title={<FormattedMessage id="global.about-bitguild"></FormattedMessage>} titleIconSrc="/static/images/icons/about.png" style={{background: "#A5BEE4"}}>
        <style jsx>{`
          .social-media {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
          }
          :global(.social-media a) {
            margin: 0 10px;
            max-width: 30%;
            cursor: pointer;
          }
          h3 {
            font-size: ${mobile ? "2.5em" : "3em"};
            font-weight: 300;
          }
          :global(.about-bitguild p) {
            max-width: 100%;
          }
        `}</style>
        <Row className="about-bitguild">
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
          </Col>
        </Row>
        <Row style={{width: "100%", margin: "10px 20px"}}>
          <Col xs={12} sm={6} style={{borderBottom: "1px solid #3B5998"}}><div /></Col>
        </Row>
        <Row>
          <Col>
            <div className="social-media">
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
          </Col>
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
