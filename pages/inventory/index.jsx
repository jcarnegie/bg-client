import React, { Component } from 'react';

import Layout, { Content } from '@/components/layouts';
import Inventory from '@/components/inventory';

class InventoryPage extends Component {
  static getInitialProps = ctx => ({});

  render() {
    return (
      <>
        <Layout.Mobile>
          <Content.Mobile>
            <Inventory {...this.props} />
          </Content.Mobile>
        </Layout.Mobile>
        <Layout.Desktop>
          <Content.Desktop>
            <Inventory {...this.props} />
          </Content.Desktop>
        </Layout.Desktop>
      </>
    );
  }
};

export default InventoryPage;
