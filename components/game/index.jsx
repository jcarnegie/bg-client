import * as log from 'loglevel';
import queryString from 'query-string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dissoc, merge, path } from 'ramda';

import GameIframeConnection from '@/components/GameIframeConnection';
import { defaultLanguage } from '@/shared/constants/language';

import {
  client,
  mutations,
} from '@/shared/utils/apollo';

import GiveawayModal from '@/components/popups/giveaway';

const updateUser = (id, payload) => {
  const variables = { id, payload: dissoc('__typename', payload) };
  return client.mutate({
    mutation: mutations.updateUser,
    variables,
  });
};

// TODO: move this to DB
const GIVEAWAY_CAMPAIGNS = {
  'blockchain.cuties': {
    gameId: 9,
    handle: 'BLOCKCHAIN_CUTIES_GIVEAWAY',
    startTime: '2018-10-04T00:00:00Z',
    endTime: '2018-10-31T07:00:00Z',
  },
};

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

  state = {
    showGiveawayModal: false,
  }

  static getInitialProps({ err, req, res, query, store, isServer }) {
    if (err) {
      log.error(err);
    }
    return { ...query };
  };

  _handleClose() {
    this.setState({
      showGiveawayModal: false,
    });
    window.location.reload();
  }

  _shouldShowGiveaway(user, campaign) {
    if (!campaign) return false; // no campaign defined

    const handle = path(['handle'], campaign); // retrieve timestamp-handle
    const hasVisited = path(['data', handle], user); // do not show pop up if user already visited

    const hasUser = path(['id'], user); // make sure user is retrieved

    let isCampaignActive;
    const startTime = new Date(campaign.startTime).getTime();
    const endTime = new Date(campaign.endTime).getTime();
    const now = Date.now();
    isCampaignActive = startTime > 0 && endTime > 0 && now >= startTime && now <= endTime;

    log.info('_shouldShowGiveaway: isCampaignActive, hasVisited', isCampaignActive, hasVisited);

    return hasUser && !hasVisited && isCampaignActive;
  }

  _logTimestamp(user, slug) {
    if (
      !slug ||
      !GIVEAWAY_CAMPAIGNS[slug] ||
      !GIVEAWAY_CAMPAIGNS[slug].handle ||
      !user
    ) return;

    const campaign = GIVEAWAY_CAMPAIGNS[slug];
    const handle = path(['handle'], campaign);

    if (::this._shouldShowGiveaway(user, campaign)) {
      this.setState({ showGiveawayModal: true });
      // Timestamp
      const timestamp = {};
      timestamp[handle] = Date.now();

      const newData = merge(timestamp, path(['data'], user));

      updateUser(user.id, { data: newData });

      log.info(`campaign ${handle} timestamp logged: ${timestamp[handle]}`);
    }
  }

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

    ::this._logTimestamp(user, path(['slug'], game));

    return (
      <div id="game-frame-wrapper">
        <GiveawayModal
          user={user}
          show={this.state.showGiveawayModal}
          onHide={::this._handleClose} />
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

  shouldComponentUpdate(nextProps, nextState) {
    const nextNetworkId = path(['network', 'id'], nextProps.root);
    const networkId = path(['network', 'id'], this.props.root);
    const nextGameId = path(['id'], nextProps.game);
    const gameId = path(['id'], this.props.game);
    const showGiveawayModal = this.state.showGiveawayModal;
    const nextShowGiveawayModal = nextState.showGiveawayModal;
    const shouldRender = (
      nextNetworkId !== networkId ||
      nextGameId !== gameId ||
      showGiveawayModal !== nextShowGiveawayModal
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
