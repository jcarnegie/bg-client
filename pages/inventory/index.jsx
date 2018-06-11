import {DesktopContent, MobileContent, DesktopLayout, MobileLayout} from "@/components/layouts";
import Inventory from "@/components/inventory";
import Chat from "@/components/chat";


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

export default InventoryPage;
