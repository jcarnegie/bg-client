import React, { Component } from 'react';

import { compose } from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import Layout, { Content } from '@/components/layouts';
import Inventory from '@/components/inventory';

class InventoryPage extends Component {
  static getInitialProps = ctx => ({});

  render() {
    const { user } = this.props;
    if (user.loading) return null;
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


export default compose(viewUserByWalletQuery)(InventoryPage);
