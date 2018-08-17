import { DesktopLayout, MobileLayout } from '@/components/layouts';
import Market from '@/components/market';
import Chat from '@/components/chat';


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
  return {};
};

export default MarketPlace;
