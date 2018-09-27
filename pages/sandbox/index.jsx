import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Sandbox from '@/components/sandbox';


class SandboxPage extends Component {
  static getInitialProps({ me, query }) {
    return { me, query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <Sandbox {...this.props} />
      </Layout>
    );
  }
};


export default SandboxPage;
