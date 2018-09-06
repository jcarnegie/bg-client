import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Sandbox from '@/components/sandbox';


class SandboxPage extends Component {
  static getInitialProps = ctx => Sandbox.getInitialProps(ctx);

  render() {
    return (
      <Layout showFooter={false}>
        <Sandbox {...this.props} />
      </Layout>
    );
  }
};


export default SandboxPage;
