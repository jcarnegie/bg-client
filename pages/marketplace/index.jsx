import { DesktopLayout, MobileLayout } from '@/components/layouts';
import Market from '@/components/market';
import Chat from '@/components/chat';
import { featureOn, featureRouteGuard } from '@/shared/utils';


const MarketPlace = props => (
  <>
    <MobileLayout
      main={<Market {...props} />}
    />
    <DesktopLayout
      main={<Market {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

MarketPlace.getInitialProps = ctx => {
  featureRouteGuard(ctx, featureOn('marketplace'));
  return {};
};

export default MarketPlace;
