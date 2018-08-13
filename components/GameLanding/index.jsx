import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  injectIntl,
} from 'react-intl';

import { connect } from 'react-redux';
import Router from 'next/router';
import { Mobile, Desktop } from '@/components/responsive';
import style from '@/shared/constants/style';


@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
    layout: state.layout,
  })
)
class GameList extends Component {
  static propTypes = {
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

  navigateToGame(slug) {
    this.props.analytics.ga.event({
      category: 'Site Interaction',
      action: 'Play',
      label: slug,
    });

    Router.push({
        pathname: '/game',
        query: { slug },
      },
      `/game/${slug}`
    );
  }

  navigateToPresale(slug) {
    Router.push({ pathname: '/presale', query: { slug } }, `/presale/${slug}`);
  }

  desktopBackgroundSections() {
    return (
      <div className="background-sections">
        <style jsx>{`
          .game-landing-background-section {
            width: 100%;
          }
          .game-landing-background-section:nth-child(1) .game-landing-background-section-banner {
            width: 100%;
            position: relative;
            background-image: url(/static/images/games/bitizens/landing/bitropolis_metro_header_medium.png);
            background-size: cover;
            background-position: center;
            height: 788px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .game-landing-background-section-ocean {
            height: 1400px;
          }

          .game-landing-background-boy-and-girl {
            position: absolute;
            right: 0;
            top: 200px;
            z-index: 5;
            height: 800px;
          }

          .ocean {
            background: rgba(45,95,135,1);
            /* Slant -45deg */
            {/*background: -moz-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(45,95,135,1)), color-stop(28%, rgba(45,99,138,1)), color-stop(48%, rgba(40,125,159,1)), color-stop(69%, rgba(44,116,150,1)), color-stop(100%, rgba(45,96,135,1)));
            background: -webkit-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -o-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -ms-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: linear-gradient(135deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d5f87', endColorstr='#2d6087', GradientType=1 );*/}
            /* Vertical */
            background: -moz-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(45,95,135,1)), color-stop(28%, rgba(45,99,138,1)), color-stop(48%, rgba(40,125,159,1)), color-stop(69%, rgba(44,116,150,1)), color-stop(100%, rgba(45,96,135,1)));
            background: -webkit-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -o-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -ms-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: linear-gradient(to bottom, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d5f87', endColorstr='#2d6087', GradientType=0 );
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);

            /* Vertical Reversed */
            background: -moz-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(45,96,135,1)), color-stop(31%, rgba(44,116,150,1)), color-stop(52%, rgba(40,125,159,1)), color-stop(72%, rgba(45,99,138,1)), color-stop(100%, rgba(45,95,135,1)));
            background: -webkit-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -o-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -ms-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: linear-gradient(to bottom, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d6087', endColorstr='#2d5f87', GradientType=0 );

            height: 1400px;
          }

          .game-landing-background-bitropolis-globe {
            position: absolute;
            height: 600px;
            left: 0;
            top: 1600px;
            z-index: 5;
          }

          .landing-background-yellow {
            height: 1800px;
            background: rgb(245, 237, 162);
            clip-path: polygon(100% 0%, 100% 0, 100% 100%, -80% 100%);
          }

          .game-landing-background-rocket {
            position: absolute;
            right: 50px;
            top: 3550px;
            height: 650px;
          }
          .game-landing-background-launchpad {
            position: absolute;
            right: 50px;
            top: 3720px;
            height: 850px;
          }

          .landing-background-dark {
            height: 600px;
            background: rgb(29, 54, 63);
          }
        `}</style>

        <section className="game-landing-background-section">
          <div className="game-landing-background-section-banner" onClick={() => ::this.navigateToGame('bitizens')} />
        </section>
        <img className="game-landing-background-boy-and-girl" src={'/static/images/games/bitizens/landing/boy_and_girl.png'} />
        <section className="game-landing-background-section game-landing-background-section-ocean">
          <div className="ocean"></div>
        </section>
        <img className="game-landing-background-bitropolis-globe" src={'/static/images/games/bitizens/landing/bitropolis_globe.png'} />
        <section className="game-landing-background-section">
          <div className="landing-background-yellow"></div>
        </section>
        <img className="game-landing-background-rocket" src={'/static/images/games/bitizens/landing/rocket.png'} />
        <img className="game-landing-background-launchpad" src={'/static/images/games/bitizens/landing/launchpad.png'} />
        <section className="game-landing-background-section">
          <div className="landing-background-dark"></div>
        </section>
      </div>
    );
  }

  desktopContent() {
    return (
      <div className="content-sections-wrapper">
        <style jsx>{`
          .content-sections-wrapper {
            position: absolute;
            top: 688px;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2000px;
            padding: 0 15%;
          }

          .content-section {
            width: 100%;
            height: 400px;
            font-weight: 100;
            box-shadow: ${style.boxShadow.dark};
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            padding: 40px;
            position: relative;
            z-index: 10;
          }

          .content-section h2 {
            margin: 0 0 20px 0;
            color: rgb(40, 117, 169);
            font-weight: 100;
          }

          .content-section.play-now {
            background-color: rgb(244, 142, 92);
            color: white;
            height: 135px;
          }
          .content-section.play-now p {
            color: white;
            margin: 0 40px 0 0;
            vertical-align: middle;
          }
          .content-section.play-now button {
            background: transparent;
            border: 3px solid rgb(40, 117, 169);
            border-radius: 5px;
            color: rgb(40, 117, 169);
            padding: 10px;
            min-width: 150px;
          }
          .content-section.play-now button:hover {
            background-color: rgb(40, 117, 169);
            color: rgb(244, 142, 92);
          }

          .content-section.bitizen-features,
          .content-section.limited-presale {
            color: white;
            box-shadow: none;
            height: 150px;
            padding: 65px 0 0 0;
          }
          .content-section.single-title h2 {
            text-align: center;
            font-weight: 100;
            font-size: 2.1em;
            margin: 0;
          }
          .content-section.bitizen-features h2 {
            color: white;
          }

          .content-section .content-section-text-left {
            width: 50%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 30px 20px 0 30px;
          }
          .content-section .content-section-text-right {
            width: 50%;
            position: absolute;
            right: 0;
            top: 0;
            padding: 30px 20px 0 45px;
          }

          .content-section.wardrobe {
            height: 280px;
            background: white;
            margin-bottom: 20px;
          }
          .content-section.wardrobe p {
            color: rgb(37, 37, 37);
          }
          .content-section.wardrobe .image-right,
          .content-section.bitropolis .image-right {
            height: 100%;
            width: 50%;
            position: absolute;
            right: 0;
            top: 0;
            background-image: url(/static/images/games/bitizens/landing/avatar_closet.png);
            background-size: cover;
          }

          .content-section.mining {
            height: 280px;
            background: white;
            margin-bottom: 20px;
          }
          .content-section.mining .image-left {
            height: 100%;
            width: 55%;
            position: absolute;
            left: 0;
            top: 0;
            background-image: url(/static/images/games/bitizens/landing/mining.png);
            background-size: cover; 
            background-position: center;
          }

          .content-section.bitropolis {
            height: 280px;
            background: white;
            margin-bottom: 20px;
          }
          .content-section.bitropolis p {
            color: rgb(37, 37, 37);
          }
          .content-section.bitropolis .image-right.bitropolis-thumbnail {
            background-image: url(/static/images/games/bitizens/landing/bitropolis_thumbnail.png);
          }
          .image-right, .image-left {
            z-index: 10;
          }

          .content-section.limited-presale {
            color: white;
            box-shadow: none;
            height: 150px;
            padding: 65px 0 0 0;
            margin: 250px 0 0 0;
          }
          .content-section.limited-presale-items {
            box-shadow: none;
            height: 800px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0;
            margin-top: -5px;
            height: initial;
          }
          .content-section.limited-presale-items img {
            max-width: 50%;
            max-height: 500px;
            cursor: pointer;
          }
          .content-section.limited-presale-items img:nth-child(odd) {
            transform: translateY(-10%);
          }

          .content-section.limited-presale h2 {

          }
          .content-section.limited-presale-text {
            flex-direction: column;
            box-shadow: none;
          }
          .content-section.limited-presale-text p {
            color: rgb(38, 160, 154);
          }
          .content-section.limited-presale-text button {
            background: rgb(244, 142, 92);
            border: 3px solid rgb(244, 142, 92);
            border-radius: 5px;
            color: rgb(40, 117, 169);
            padding: 10px;
            min-width: 150px;
          }
          .content-section.limited-presale-text button:hover {
            background: transparent;
          }
        `}</style>
        <section className="content-section play-now">
          <p>Create & customize your personal 3D Bitizen, and  discover what Bitropolis has to offer. Take your first steps in a new social blockchain experience today!</p>
          <button onClick={() => ::this.navigateToGame('bitizens')}>PLAY NOW</button>
        </section>
        <section className="content-section single-title bitizen-features">
          <h2>BITIZEN FEATURES</h2>
        </section>
        <section className="content-section wardrobe">
          <div className="content-section-text-left">
            <h2>WARDROBE</h2>
            <p>Dress up your Bitizen! In this update, you&apos;ll be able to fully customize your new Bitizen with fancy threads.</p>
            <p>Create an outfit that really represents you, and get ready to flaunt your style!</p>
          </div>
          <div className="image-right" />
        </section>
        <section className="content-section mining">
          <div className="image-left" />
          <div className="content-section-text-right">
            <h2>MINING</h2>
            <p>Get your hands dirty in the depths below as you search for valuable items.</p>
            <p>Grow your item collection and join the ranks of the illustriuous self-made Bitizens.</p>
          </div>
        </section>
        <section className="content-section bitropolis">
          <div className="content-section-text-left">
            <h2>BITROPOLIS</h2>
            <p>Take your first real steps in a new world of wonder, magic, and crypto. Explore the city of Bitropolis, and discover all the different activities on offer!</p>
            <p>Your journey is just beginning!</p>
          </div>
          <div className="image-right bitropolis-thumbnail" />
        </section>
        <section className="content-section single-title limited-presale">
          <h2>LIMITED PRE-SALE ITEMS</h2>
        </section>
        <section className="content-section limited-presale-items">
          <img src={'/static/images/games/bitizens/landing/wilds.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/skies.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/seas.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/cyberspace.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
        </section>
        <section className="content-section limited-presale-text">
          <p>We&apos;re offering you a change to secure some unique, limited-run items! These fancy outfits are only obtainable during the pre-sale, and will not be available for direct purchase ever again once the pre-sale concludes!</p>
          <button onClick={() => ::this.navigateToPresale('bitizens')}>SEE PRE-SALE</button>
        </section>
      </div>
    );
  }

  mobileBackgroundSections() {
    return (
      <div className="background-sections">
        <style jsx>{`
          .game-landing-background-section {
            width: 100%;
          }
          .game-landing-background-section:nth-child(1) {
            cursor: pointer;
          }
          .game-landing-background-section:nth-child(1) .game-landing-background-section-banner {
            width: 100%;
            position: relative;
            background-image: url(/static/images/games/bitizens/landing/bitropolis_metro_header_small.png);
            background-size: cover;
            background-position: center;
            height: 550px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .game-landing-background-section-ocean {
            height: 1400px;
          }

          .game-landing-background-boy-and-girl {
            position: absolute;
            right: 0;
            top: 350px;
            z-index: 5;
            height: 300px;
          }

          .ocean {
            background: rgba(45,95,135,1);
            /* Slant -45deg */
            {/*background: -moz-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(45,95,135,1)), color-stop(28%, rgba(45,99,138,1)), color-stop(48%, rgba(40,125,159,1)), color-stop(69%, rgba(44,116,150,1)), color-stop(100%, rgba(45,96,135,1)));
            background: -webkit-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -o-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -ms-linear-gradient(-45deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: linear-gradient(135deg, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d5f87', endColorstr='#2d6087', GradientType=1 );*/}
            /* Vertical */
            background: -moz-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(45,95,135,1)), color-stop(28%, rgba(45,99,138,1)), color-stop(48%, rgba(40,125,159,1)), color-stop(69%, rgba(44,116,150,1)), color-stop(100%, rgba(45,96,135,1)));
            background: -webkit-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -o-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: -ms-linear-gradient(top, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            background: linear-gradient(to bottom, rgba(45,95,135,1) 0%, rgba(45,99,138,1) 28%, rgba(40,125,159,1) 48%, rgba(44,116,150,1) 69%, rgba(45,96,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d5f87', endColorstr='#2d6087', GradientType=0 );
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);

            /* Vertical Reversed */
            background: -moz-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(45,96,135,1)), color-stop(31%, rgba(44,116,150,1)), color-stop(52%, rgba(40,125,159,1)), color-stop(72%, rgba(45,99,138,1)), color-stop(100%, rgba(45,95,135,1)));
            background: -webkit-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -o-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: -ms-linear-gradient(top, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            background: linear-gradient(to bottom, rgba(45,96,135,1) 0%, rgba(44,116,150,1) 31%, rgba(40,125,159,1) 52%, rgba(45,99,138,1) 72%, rgba(45,95,135,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d6087', endColorstr='#2d5f87', GradientType=0 );

            height: 1400px;
          }

          .game-landing-background-bitropolis-globe {
            position: absolute;
            height: 450px;
            left: -50px;
            top: 1850px;
            z-index: 5;
          }

          .landing-background-yellow {
            height: 1400px;
            background: rgb(245, 237, 162);
            clip-path: polygon(100% 0%, 100% 0, 100% 100%, -60% 100%);
          }

          .game-landing-background-rocket {
            position: absolute;
            right: 0;
            top: 3050px;
            height: 400px;
          }
          .game-landing-background-launchpad {
            position: absolute;
            right: 50px;
            top: 3200px;
            height: 400px;
          }

          .landing-background-dark {
            height: 300px;
            background: rgb(29, 54, 63);
          }
        `}</style>

        <section className="game-landing-background-section">
          <div className="game-landing-background-section-banner" onClick={() => ::this.navigateToGame('bitizens')} />
        </section>
        <img className="game-landing-background-boy-and-girl" src={'/static/images/games/bitizens/landing/boy_and_girl.png'} />
        <section className="game-landing-background-section game-landing-background-section-ocean">
          <div className="ocean"></div>
        </section>
        <img className="game-landing-background-bitropolis-globe" src={'/static/images/games/bitizens/landing/bitropolis_globe.png'} />
        <section className="game-landing-background-section">
          <div className="landing-background-yellow"></div>
        </section>
        <img className="game-landing-background-rocket" src={'/static/images/games/bitizens/landing/rocket.png'} />
        <img className="game-landing-background-launchpad" src={'/static/images/games/bitizens/landing/launchpad.png'} />
        <section className="game-landing-background-section">
          <div className="landing-background-dark"></div>
        </section>
      </div>
    );
  }

  mobileContent() {
    return (
      <div className="content-sections-wrapper">
        <style jsx>{`
          .content-sections-wrapper {
            position: absolute;
            top: 688px;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2000px;
            padding: 5%;
          }

          .content-section {
            width: 100%;
            height: 400px;
            font-weight: 100;
            box-shadow: ${style.boxShadow.dark};
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            padding: 5px;
            position: relative;
            z-index: 10;
            font-size: 0.9em;
            text-align: center;
          }

          .content-section h2 {
            margin: 0 0 20px 0;
            color: rgb(40, 117, 169);
            font-weight: 100;
          }

          .content-section.play-now {
            background-color: rgb(244, 142, 92);
            color: white;
            height: 200px;
            flex-direction: column;
          }
          .content-section.play-now p {
            color: white;
            margin: 0;
            vertical-align: middle;
          }
          .content-section.play-now button {
            background: rgb(244, 142, 92);
            border: 3px solid rgb(40, 117, 169);
            color: rgb(40, 117, 169);
            border-radius: 5px;
            padding: 10px;
            min-width: 150px;
            font-weight: 600;
          }

          .content-section.bitizen-features,
          .content-section.limited-presale {
            color: white;
            box-shadow: none;
            height: 150px;
            padding: 65px 0 0 0;
          }
          .content-section.single-title h2 {
            text-align: center;
            font-weight: 100;
            font-size: 2.1em;
            margin: 0;
          }
          .content-section.bitizen-features h2 {
            color: white;
          }

          .content-section .content-section-text-left {
            width: 50%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 20px 10px 0 10px;
          }
          .content-section .content-section-text-right {
            width: 50%;
            position: absolute;
            right: 0;
            top: 0;
            padding: 20px 10px 0 10px;
          }

          .content-section.wardrobe {
            height: 280px;
            background: white;
            margin-bottom: 40px;
          }
          .content-section.wardrobe p {
            color: rgb(37, 37, 37);
          }
          .content-section.wardrobe .image-right,
          .content-section.bitropolis .image-right {
            height: 100%;
            width: 50%;
            position: absolute;
            right: 0;
            top: 0;
            background-image: url(/static/images/games/bitizens/landing/avatar_closet.png);
            background-size: cover;
          }

          .content-section.mining {
            height: 280px;
            background: white;
            margin-bottom: 40px;
          }
          .content-section.mining .image-left {
            height: 100%;
            width: 50%;
            position: absolute;
            left: 0;
            top: 0;
            background-image: url(/static/images/games/bitizens/landing/mining.png);
            background-size: cover; 
            background-position: center;
          }

          .content-section.bitropolis {
            height: 280px;
            background: white;
            margin-bottom: 40px;
          }
          .content-section.bitropolis p {
            color: rgb(37, 37, 37);
          }
          .content-section.bitropolis .image-right.bitropolis-thumbnail {
            background-image: url(/static/images/games/bitizens/landing/bitropolis_thumbnail.png);
          }
          .image-right, .image-left {
            z-index: 10;
          }

          .content-section.limited-presale {
            color: white;
            box-shadow: none;
            height: 150px;
            padding: 65px 0 0 0;
            margin: 250px 0 0 0;
          }
          .content-section.limited-presale-items {
            box-shadow: none;
            height: 800px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0;
            margin-top: -5px;
            height: initial;
          }
          .content-section.limited-presale-items img {
            max-width: 50%;
            max-height: 500px;
            cursor: pointer;
          }
          .content-section.limited-presale-items img:nth-child(odd) {
            transform: translateY(-10%);
          }

          .content-section.limited-presale h2 {

          }
          .content-section.limited-presale-text {
            flex-direction: column;
            box-shadow: none;
          }
          .content-section.limited-presale-text p {
            color: rgb(38, 160, 154);
          }
          .content-section.limited-presale-text button {
            background: rgb(244, 142, 92);
            border: 3px solid rgb(244, 142, 92);
            border-radius: 5px;
            color: rgb(40, 117, 169);
            padding: 10px;
            min-width: 150px;
            font-weight: 600;
          }
          .content-section.limited-presale-text button:hover {
            background: transparent;
          }
         {/* .header-play-now-button {
            font-weight: 600;
            position: absolute;
            top: 500px;
            left: 20px;
            background: rgb(244, 142, 92);
            border: 3px solid rgb(244, 142, 92);
            border-radius: 5px;
            color: rgb(40, 117, 169);
            padding: 10px;
            min-width: 150px;
          }*/}
        `}</style>
        <section className="content-section play-now">
          <p>Create & customize your personal 3D Bitizen, and  discover what Bitropolis has to offer. Take your first steps in a new social blockchain experience today!</p>
          <button onClick={() => ::this.navigateToGame('bitizens')}>PLAY NOW</button>
        </section>
        <section className="content-section single-title bitizen-features">
          <h2>BITIZEN FEATURES</h2>
        </section>
        <section className="content-section wardrobe">
          <div className="content-section-text-left">
            <h2>WARDROBE</h2>
            <p>Dress up your Bitizen! In this update, you&apos;ll be able to fully customize your new Bitizen with fancy threads.</p>
            <p>Create an outfit that really represents you, and get ready to flaunt your style!</p>
          </div>
          <div className="image-right" />
        </section>
        <section className="content-section mining">
          <div className="image-left" />
          <div className="content-section-text-right">
            <h2>MINING</h2>
            <p>Get your hands dirty in the depths below as you search for valuable items.</p>
            <p>Grow your item collection and join the ranks of the illustriuous self-made Bitizens.</p>
          </div>
        </section>
        <section className="content-section bitropolis">
          <div className="content-section-text-left">
            <h2>BITROPOLIS</h2>
            <p>Take your first real steps in a new world of wonder, magic, and crypto. Explore the city of Bitropolis, and discover all the different activities on offer!</p>
            <p>Your journey is just beginning!</p>
          </div>
          <div className="image-right bitropolis-thumbnail" />
        </section>
        <section className="content-section single-title limited-presale">
          <h2>LIMITED PRE-SALE ITEMS</h2>
        </section>
        <section className="content-section limited-presale-items">
          <img src={'/static/images/games/bitizens/landing/wilds.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/skies.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/seas.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
          <img src={'/static/images/games/bitizens/landing/cyberspace.png'} onClick={() => ::this.navigateToPresale('bitizens')} />
        </section>
        <section className="content-section limited-presale-text">
          <p>We&apos;re offering you a change to secure some unique, limited-run items! These fancy outfits are only obtainable during the pre-sale, and will not be available for direct purchase ever again once the pre-sale concludes!</p>
          <button onClick={() => ::this.navigateToPresale('bitizens')}>SEE PRE-SALE</button>
        </section>
      </div>
    );
  }


  render() {
    return (
      <div className="game-landing">
        <style jsx>{`
          .game-landing {
            width: 100%;
            position: relative;
          }
        `}</style>
        <Desktop>
          {::this.desktopBackgroundSections()}
          {::this.desktopContent()}
        </Desktop>
        <Mobile>
          {::this.mobileBackgroundSections()}
          {::this.mobileContent()}
        </Mobile>
      </div>
    );
  }
}

export default GameList;
