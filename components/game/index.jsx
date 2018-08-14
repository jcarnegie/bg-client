import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import {
  viewGameBySlugQuery,
  viewUserByWalletQuery,
  localQueries,
} from '@/shared/utils/apollo';

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
  };

  static defaultProps = {
    dispatch: () => {},
    data: {},
    game: {},
    user: {},
    slug: '',
    query: {},
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
      url = game.viewGameBySlug.url + (game.viewGameBySlug.url.includes('?') ? '&' : '?') + queryString.stringify(query);
      if (process.env.DEPLOYED_ENV !== 'production' && game.viewGameBySlug.stagingUrl) {
        url = game.viewGameBySlug.stagingUrl + (game.viewGameBySlug.stagingUrl.includes('?') ? '&' : '?') + queryString.stringify(query);
      }
      log.info(`game URL: ${url}`);
    } catch (err) {
      log.error('Unable to parse url for game: ', err);
      return 'Error';
    }
    return (<iframe src={url} key={user.data ? user.data.language : defaultLanguage} className="game" />);
  }

  render() {
    const { user, root, game, query } = this.props;
    if (!user || !root || !game) return <DataLoading />;
    const { network } = root;
    if (user.loading || root.loading || game.loading) return <DataLoading />;
    if (user.error || !network.supported) return null;
    return (
      <div>
        <style jsx global>{`
          iframe.game {
            height: calc(100vh - 62px);
            width: 100%;
            border: 0;
            display: block;
          }
        `}</style>
        <InitGameIframeConnection />
        {this.renderGame(game, user, query)}
      </div>
    );
  }
}

export default compose(
  viewGameBySlugQuery,
  viewUserByWalletQuery,
  graphql(localQueries.root, { name: 'root' })
)(Game);
