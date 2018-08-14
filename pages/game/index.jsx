import React, { Component } from 'react';

import {
  DesktopLayout,
  MobileLayout,
} from '@/components/layouts';

import Game from '@/components/game';
import Chat from '@/components/chat';


class GamePage extends Component {
  getInitialProps = ctx => Game.getInitialProps(ctx);

  render() {
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


export default GamePage;

