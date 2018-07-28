import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import {
  viewGameBySlugQuery,
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import InitGameIframeConnection from '@/components/common/init';
import { defaultLanguage } from '@/shared/constants/language';

class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    user: PropTypes.object,
    slug: PropTypes.string,
    query: PropTypes.object,
  };

  static getInitialProps({ err, req, res, query, store, isServer }) {
    if (err) {
      log.error(err);
    }
    return { ...query };
  };

  renderGame() {
    const { game, user, query } = this.props;

    if (game.loading || user.loading) return 'loading';
    if (game.error || user.error) return 'Error';

    let url = '';

    try {
      url = game.viewGameBySlug.url + (game.viewGameBySlug.url.includes('?') ? '&' : '?') + queryString.stringify(query);
      if (process.env.DEPLOYED !== 'production' && game.viewGameBySlug.stagingUrl) {
        url = game.viewGameBySlug.stagingUrl + (game.viewGameBySlug.stagingUrl.includes('?') ? '&' : '?') + queryString.stringify(query);
      }
      log.info(`game URL: ${url}`);
    } catch (err) {
      log.error('Unable to parse url for game.');
      return 'Error';
    }
    return (<iframe src={url} key={user.data ? user.data.language : defaultLanguage} className="game" />);
  }

  render() {
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
        {this.renderGame()}
      </div>
    );
  }
}

export default compose(
  viewGameBySlugQuery,
  viewUserByWalletQuery
)(Game);
