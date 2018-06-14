import {DesktopContent, MobileContent, DesktopLayout, MobileLayout} from "@/components/layouts";
import Inventory from "@/components/inventory";
import Chat from "@/components/chat";
import {userLoginRouteGuard} from "@/shared/utils";


const InventoryPage = props => (
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

InventoryPage.getInitialProps = ctx => {
  userLoginRouteGuard(ctx);
  return {};
};


export default InventoryPage;
