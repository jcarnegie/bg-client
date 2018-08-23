import React, { Component } from 'react';

import { compose } from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Inventory from '@/components/inventory';

class InventoryPage extends Component {
  static getInitialProps = ctx => ({});

  render() {
    const { user } = this.props;
    if (user.loading) return null;
    return (
      <>
        <MobileLayout
          main={<MobileContent><Inventory {...this.props} /></MobileContent>}
        />
        <DesktopLayout
          main={<DesktopContent><Inventory {...this.props} /></DesktopContent>}
        />
      </>
    );
  }
};


export default compose(viewUserByWalletQuery)(InventoryPage);
