import React, { Component } from 'react';

import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Inventory from '@/components/inventory';
import Chat from '@/components/chat';

class InventoryPage extends Component {
  getInitialProps = ctx => ({});

  render() {
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


export default InventoryPage;
