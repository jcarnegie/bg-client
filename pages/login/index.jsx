import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Login } from '@/components/SessionActions';
import { redirectBasedOnState } from '@/client/utils';

class LoginPage extends Component {
  static propTypes = {
    me: PropTypes.object,
    query: PropTypes.object,
  }
  static getInitialProps({ me, query }) {
    return { me, query };
  }

  UNSAFE_componentWillMount() { /* eslint-disable-line camelcase */
    redirectBasedOnState(this.props.me, pathOr(['query', 'pathname'], this.props));
  }

  UNSAFE_componentWillUpdate() { /* eslint-disable-line camelcase */
    redirectBasedOnState(this.props.me, pathOr(['query', 'pathname'], this.props));
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
