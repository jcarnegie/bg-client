import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Game from '@/components/game';


class GamePage extends Component {
  static getInitialProps = ctx => Game.getInitialProps(ctx);

  render() {
    return (
      <Layout showFooter={false}>
        <Game {...this.props} />
      </Layout>
    );
  }
};


export default GamePage;

