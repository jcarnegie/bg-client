import React, { Component } from 'react';

import Router from 'next/router';

import { compose, graphql } from 'react-apollo';

import {
  viewUserByWalletQuery,
  localQueries,
} from '@/shared/utils/apollo';

import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Inventory from '@/components/inventory';
import Chat from '@/components/chat';

class InventoryPage extends Component {
  static getInitialProps = ctx => ({});

  render() {
    const { user, root } = this.props;
    const { network } = root;
    if (user.loading || root.loading) return null;
    if (user.error || !network.supported) {
      Router.replace('/');
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
  graphql(localQueries.root, { name: 'root' })
)(InventoryPage);
