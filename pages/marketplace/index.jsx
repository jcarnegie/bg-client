import { DesktopLayout, MobileLayout } from '@/components/layouts';
import Market from '@/components/market';


const MarketPlace = props => (
  <>
    <MobileLayout
      main={<Market {...props} />}
    />
    <DesktopLayout
      main={<Market {...props} />}
    />
  </>
);

MarketPlace.getInitialProps = ctx => {
  return {};
};

export default MarketPlace;
