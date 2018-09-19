import React, { Component } from 'react';

import Layout from '@/components/layouts';
import LinkWallets from '@/components/link';


class LinkWalletsPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }
  render() {
    return (
      <Layout showFooter={false}>
        <LinkWallets {...this.props} />
      </Layout>
    );
  }
};


export default LinkWalletsPage;

