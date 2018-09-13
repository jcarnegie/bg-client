import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Login from '@/components/login';


class LoginPage extends Component {
  render() {
    return (
      <Layout showFooter={false}>
        <Login {...this.props} />
      </Layout>
    );
  }
};


export default LoginPage;

