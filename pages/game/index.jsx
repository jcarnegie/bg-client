import React, { Component } from 'react';

import { compose } from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import {
  DesktopLayout,
  MobileLayout,
} from '@/components/layouts';

import Game from '@/components/game';


class GamePage extends Component {
  static getInitialProps = ctx => Game.getInitialProps(ctx);

  render() {
    const { user } = this.props;
    if (user.loading) return null;

    return (
      <>
        <MobileLayout
          main={<Game {...this.props} />}
        />
        <DesktopLayout
          main={<Game {...this.props} />}
        />
      </>
    );
  }
};


export default compose(viewUserByWalletQuery)(GamePage);

