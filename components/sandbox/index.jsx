import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';

import { path } from 'ramda';

import { withGlobalContext } from '@/shared/utils/context';
import { withRoot } from '@/components/wrappers';

import GameIframeConnection from '@/components/GameIframeConnection';
import { defaultLanguage } from '@/shared/constants/language';
import style from '@/shared/constants/style';

const BITGUILD_INFO_URL = 'https://bitguild.info/';
@withGlobalContext
@withRoot
class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string,
    }),
    root: PropTypes.object,
    ctx: PropTypes.shape({
      isCurrentWalletLinked: PropTypes.bool,
      userNeedsToLogInOrRegister: PropTypes.bool,
      me: PropTypes.object,
    }),
  };

  static async getInitialProps({ query }) {
    log.info('getInitialProps: query: ', query);
    return { query: (query || {}) };
  }

  renderGame(user, query) {
    log.info('Rendering iFrame with query: ', query);
    return (
      <div className="game-frame-wrapper">
        <GameIframeConnection user={user} />
        <iframe
          id="game-frame"
          src={query ? query.url : BITGUILD_INFO_URL}
          key={user ? user.language : defaultLanguage}
          className="game"
        />
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const nextNetworkId = path(['network', 'id'], nextProps.root);
    const networkId = path(['network', 'id'], this.props.root);
    const shouldRender = (
      nextNetworkId !== networkId
    );
    return shouldRender;
  }

  render() {
    const { root, query } = this.props;
    const { network } = root;
    const { me } = this.props.ctx;

    if (!network.supported) return null;
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
          {this.renderGame(me, query)}
      </div>
    );
  }
}

export default SandBox;
