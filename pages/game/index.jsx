import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Game from '@/components/game';
import { Query } from 'react-apollo';
import {
  gameQuery,
} from '@/shared/utils/apollo/game';

class GamePage extends Component {
  static getInitialProps = ctx => Game.getInitialProps(ctx);
  render() {
    return (
      <Layout showFooter={false}>
        <Query
          query={gameQuery}
          variables={{ slug: this.props.slug }}
        >
          {({ data, loading }) => {
            if (loading) return null;
            return <Game {...this.props} game={data.viewGameBySlug} me={data.me} />;
          }}
        </Query>
      </Layout>
    );
  }
};


export default GamePage;

