import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  graphql,
  Query,
} from 'react-apollo';
import { path } from 'ramda';

import {
  viewGameBySlugQuery,
  queries,
  localQueries,
} from '@/shared/utils/apollo';

import {
  WalletContext,
} from '@/shared/utils/context';

import DataLoading from '@/components/DataLoading';

import InitGameIframeConnection from '@/components/common/init';
import { defaultLanguage } from '@/shared/constants/language';

class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    slug: PropTypes.string,
    query: PropTypes.object,
    root: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {},
    game: {
      viewGameBySlug: {},
    },
    user: {
      viewUserByWallet: {},
    },
    slug: '',
    query: {},
    root: {
      network: {},
    },
  };

  dom = {
    frame: null,
  }

  static getInitialProps({ err, req, res, query, store, isServer }) {
    if (err) {
      log.error(err);
    }
    return { ...query };
  };

  renderGame(game, user, query) {
    let url = '';

    try {
      url = game.viewGameBySlug.url + (game.viewGameBySlug.url.includes('?') ? '&' : '?') + queryString.stringify(query);
      if (process.env.DEPLOYED_ENV !== 'production' && game.viewGameBySlug.stagingUrl) {
        url = game.viewGameBySlug.stagingUrl + (game.viewGameBySlug.stagingUrl.includes('?') ? '&' : '?') + queryString.stringify(query);
      }
      log.info(`game URL: ${url}`);
    } catch (err) {
      log.error('Unable to parse url for game: ', err);
      return 'Error';
    }

    return (
      <div id="game-frame-wrapper">
        <iframe
          ref={c => (this.dom.frame = c)}
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

  componentWillUnmount() {
    if (!this.dom.frame) return;
    this.dom.frame.src = 'about:blank';
    document.getElementById('game-frame-wrapper').removeChild(document.getElementById('game-frame'));
    document.getElementById('game-component-wrapper').removeChild(document.getElementById('game-frame-wrapper'));
  }

  render() {
    const { root, game, query } = this.props;
    if (!root || !game) return <DataLoading />;
    if (root.loading || game.loading) return <DataLoading />;
    if (!root.network.supported) return null;
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
        <WalletContext.Consumer>
          {({ wallet }) => {
            if (!wallet) return <DataLoading />;
            return (
              <Query
                query={queries.viewUserByWallet}
                variables={{ wallet }}
              >
                {({ data }) => {
                  if (!data || !data.viewUserByWallet || data.error || data.loading) {
                    if (path(['error'], data)) log.error('error occurred');
                    return <DataLoading />;
                  }
                  return (
                    <>
                      <InitGameIframeConnection />
                      {::this.renderGame(game, data.viewUserByWallet, query)}
                    </>
                  );
                }}
              </Query>
            );
          }}
        </WalletContext.Consumer>
      </div>
    );
  }
}

export default compose(
  viewGameBySlugQuery,
  graphql(localQueries.root, { name: 'root' })
)(Game);
