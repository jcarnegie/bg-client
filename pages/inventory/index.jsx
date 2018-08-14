import React, { Component } from 'react';

import Router from 'next/router';

import { compose, graphql } from 'react-apollo';

import {
  viewUserByWalletQuery,
  localQueries,
} from '@/shared/utils/apollo';

import {
  showRegistrationWorkflow,
} from '@/shared/utils';

import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Inventory from '@/components/inventory';
import Chat from '@/components/chat';

class InventoryPage extends Component {
  getInitialProps = ctx => ({});

  render() {
    const { user, data } = this.props;
    const { network } = data;
    if (user.loading || data.loading) return null;
    if (user.error || !network.supported) {
      Router.replace('/');
      showRegistrationWorkflow();
      return null;
    };
    return (
      <>
        <MobileLayout
          main={<MobileContent><Inventory {...this.props} /></MobileContent>}
        />
        <DesktopLayout
          main={<DesktopContent><Inventory {...this.props} /></DesktopContent>}
          aside={<Chat {...this.props} />}
        />
      </>
    );
  }
};


export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root)
)(InventoryPage);
