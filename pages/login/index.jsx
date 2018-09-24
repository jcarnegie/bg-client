import React, { Component } from 'react';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Login } from '@/components/SessionActions';


class LoginPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <SessionActionsContainer>
          <Login {...this.props} />
        </SessionActionsContainer>
      </Layout>
    );
  }
};


export default LoginPage;

