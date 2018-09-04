import React, { Component } from 'react';

import { compose } from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import Layout from '@/components/layouts';

import Game from '@/components/game';


class GamePage extends Component {
  static getInitialProps = ctx => Game.getInitialProps(ctx);

  render() {
    const { user } = this.props;
    if (user.loading) return null;

    return (
      <>
        <Layout.Mobile>
          <Game {...this.props} />
        </Layout.Mobile>
        <Layout.Desktop>
          <Game {...this.props} />
        </Layout.Desktop>
      </>
    );
  }
};


export default compose(viewUserByWalletQuery)(GamePage);

