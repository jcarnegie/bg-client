import React, { Component } from 'react';

import Layout from '@/components/layouts';
import Register from '@/components/Register';


class RegisterPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <Register {...this.props} />
      </Layout>
    );
  }
};


export default RegisterPage;

