import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Query,
} from 'react-apollo';
import { path } from 'ramda';

import {
  gameQuery,
} from '@/shared/utils/apollo/game';

import {
  GlobalContext,
} from '@/shared/utils/context';

import DataLoading from '@/components/DataLoading';

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
  };

  static defaultProps = {
    dispatch: () => {},
    game: {
      viewGameBySlug: {},
    },
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
    const nextGameId = path(['viewGameBySlug', 'id'], nextProps.game);
    const gameId = path(['viewGameBySlug', 'id'], this.props.game);
    const shouldRender = (
      nextNetworkId !== networkId ||
      nextGameId !== gameId
    );
    return shouldRender;
  }

  render() {
    const { query } = this.props;
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
        <GlobalContext.Consumer>
          {({ web3Wallet, me }) => {
            if (!web3Wallet) return <DataLoading />;
            return (
              <Query
                query={gameQuery}
                variables={{ slug: this.props.slug }}
              >
                {({ data }) => {
                  if (!data || data.error || data.loading) {
                    if (path(['error'], data)) log.error('error occurred');
                    return <DataLoading />;
                  }
                  return ::this.renderGame(data.viewGameBySlug, me, query);
                }}
              </Query>
            );
          }}
        </GlobalContext.Consumer>
      </div>
    );
  }
}

export default Game;
