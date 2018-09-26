import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';

import GameIframeConnection from '@/components/GameIframeConnection';
import { defaultLanguage } from '@/shared/constants/language';

class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    game: PropTypes.object,
    slug: PropTypes.string,
    query: PropTypes.object,
    root: PropTypes.object,
    me: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {},
    game: {},
    slug: '',
    query: {},
    root: {
      network: {},
    },
  };

  static getInitialProps({ err, req, res, query, store, isServer }) {
    if (err) {
      log.error(err);
    }
    return { ...query };
  };

  renderGame(game, user, query) {
    let url = '';
    try {
      url = game.url + (game.url.includes('?') ? '&' : '?') + queryString.stringify(query);
      if (process.env.DEPLOYED_ENV !== 'production' && game.stagingUrl) {
        url = game.stagingUrl + (game.stagingUrl.includes('?') ? '&' : '?') + queryString.stringify(query);
      }
      log.info(`game URL: ${url}`);
    } catch (err) {
      log.error('Unable to parse url for game: ', err);
      return 'Error';
    }

    return (
      <div id="game-frame-wrapper">
        <GameIframeConnection user={user} />
        <iframe
          id="game-frame"
          src={url}
          key={user ? user.language : defaultLanguage}
          className="game"
        />
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const nextNetworkId = path(['network', 'id'], nextProps.root);
    const networkId = path(['network', 'id'], this.props.root);
    const nextGameId = path(['id'], nextProps.game);
    const gameId = path(['id'], this.props.game);
    const shouldRender = (
      nextNetworkId !== networkId ||
      nextGameId !== gameId
    );
    return shouldRender;
  }

  render() {
    const { query, me, game } = this.props;
    return (
      <div id="game-component-wrapper">
        <style jsx global>{`
          iframe.game {
            height: calc(100vh - 62px);
            width: 100%;
            border: 0;
            display: block;
          }
        `}</style>
        {this.renderGame(game, me, query)}
      </div>
    );
  }
}

export default Game;
