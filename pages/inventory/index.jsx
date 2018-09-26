import React, { Component } from 'react';

import Layout, { Content } from '@/components/layouts';
import Inventory from '@/components/inventory';
import { Query } from 'react-apollo';
import {
  inventoryQuery,
} from '@/shared/utils/apollo/inventory';

class InventoryPage extends Component {
  static getInitialProps = ctx => ({});

  render() {
    return (
        <Query query={inventoryQuery}>
          {({ data, loading }) => {
            if (loading) return null;
            return (
              <>
                <Layout.Mobile>
                  <Content.Mobile>
                    <Inventory {...this.props} listItems={data.listItems} listGames={data.listGames} />
                  </Content.Mobile>
                </Layout.Mobile>
                <Layout.Desktop>
                  <Content.Desktop>
                    <Inventory {...this.props} listItems={data.listItems} listGames={data.listGames} />
                  </Content.Desktop>
                </Layout.Desktop>
              </>
            );
          }}
        </Query>
    );
  }
};

export default InventoryPage;
