import React, { Component } from 'react';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Link } from '@/components/SessionActions';


class LinkWalletsPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }
  render() {
    return (
      <Layout showFooter={false}>
        <SessionActionsContainer>
          <Link {...this.props} />
        </SessionActionsContainer>
      </Layout>
    );
  }
};


export default LinkWalletsPage;

