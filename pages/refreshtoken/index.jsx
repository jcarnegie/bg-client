import React, { Component } from 'react';
import Layout from '@/components/layouts';
import RefreshToken from '@/components/RefreshToken';

class RefreshTokenPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <RefreshToken {...this.props} />
      </Layout>
    );
  }
};

export default RefreshTokenPage;
