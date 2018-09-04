import Layout from '@/components/layouts';

import Market from '@/components/market';


const MarketPlace = props => (
  <>
    <Layout.Mobile>
      <Market {...props} />
    </Layout.Mobile>
    <Layout.Desktop>
      <Market {...props} />
    </Layout.Desktop>
  </>
);

MarketPlace.getInitialProps = ctx => {
  return {};
};

export default MarketPlace;
