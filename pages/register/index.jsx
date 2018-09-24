import React, { Component } from 'react';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Register } from '@/components/SessionActions';


class RegisterPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <SessionActionsContainer>
          <Register {...this.props} />
        </SessionActionsContainer>
      </Layout>
    );
  }
};


export default RegisterPage;

