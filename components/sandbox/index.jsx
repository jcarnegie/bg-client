import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import * as log from 'loglevel';

import {
  compose,
  graphql,
  Query,
} from 'react-apollo';
import { path } from 'ramda';

import {
  queries,
  localQueries,
} from '@/shared/utils/apollo';

import {
  WalletContext,
} from '@/shared/utils/context';

import DataLoading from '@/components/DataLoading';

import GameIframeConnection from '@/components/GameIframeConnection';
import { defaultLanguage } from '@/shared/constants/language';
import style from '@/shared/constants/style';

const BITGUILD_INFO_URL = 'https://bitguild.info/';

class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string,
    }),
  };

  static async getInitialProps({ query }) {
    log.info('getInitialProps: query: ', query);
    return { query: (query || {}) };
  }

  dom = {
    frame: null,
  }

  renderGame(user, query) {
    log.info('Rendering iFrame with query: ', query);
    return (
      <div className="game-frame-wrapper">
        <GameIframeConnection user={user} />
        <iframe
          ref={c => (this.dom.frame = c)}
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

  componentWillUnmount() {
    if (!this.dom.frame) return;
    this.dom.frame.src = 'about:blank';
    document.getElementById('game-frame-wrapper').removeChild(document.getElementById('game-frame'));
    document.getElementById('game-component-wrapper').removeChild(document.getElementById('game-frame-wrapper'));
  }

  render() {
    const { root, query } = this.props;
    if (!root || root.loading) return <DataLoading />;
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
                  return ::this.renderGame(data.viewUserByWallet, query);
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
  graphql(localQueries.root, { name: 'root' })
)(SandBox);
