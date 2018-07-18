import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Inventory from '@/components/inventory';
import Chat from '@/components/chat';
import { userLoginRouteGuard, ethNetworkRouteGuard } from '@/shared/utils';


const InventoryPage = props => {
  return (
    <>
      <MobileLayout
        main={<MobileContent><Inventory {...props} /></MobileContent>}
      />
      <DesktopLayout
        main={<DesktopContent><Inventory {...props} /></DesktopContent>}
        aside={<Chat {...props} />}
      />
    </>
  );
};

InventoryPage.getInitialProps = ctx => {
  userLoginRouteGuard(ctx);
  ethNetworkRouteGuard(ctx);
  return {};
};


export default InventoryPage;
