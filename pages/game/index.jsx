import React, { Component } from 'react';

import Router from 'next/router';

import { compose, graphql } from 'react-apollo';

import {
  viewUserByWalletQuery,
  localQueries,
} from '@/shared/utils/apollo';

import {
  DesktopLayout,
  MobileLayout,
} from '@/components/layouts';

import Game from '@/components/game';
import Chat from '@/components/chat';


class GamePage extends Component {
  getInitialProps = ctx => Game.getInitialProps(ctx);

  render() {
    const { user, data } = this.props;
    const { network } = data;
    if (user.loading || data.loading) return null;
    if (user.error || !network.supported) {
      Router.replace('/');
      return null;
    };

    return (
      <>
        <MobileLayout
          main={<Game {...this.props} />}
        />
        <DesktopLayout
          main={<Game {...this.props} />}
          aside={<Chat {...this.props} />}
        />
      </>
    );
  }
};


export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root)
)(GamePage);

