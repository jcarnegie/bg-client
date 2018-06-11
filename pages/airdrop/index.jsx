import {DesktopContent, MobileContent, DesktopLayout, MobileLayout} from "@/components/layouts";
import Airdrop from "@/components/airdrop";
import Chat from "@/components/chat";


const AirdropPage = props => (
  <>
    <MobileLayout
      main={<MobileContent><Airdrop {...props} /></MobileContent>}
    />
    <DesktopLayout
      main={<DesktopContent><Airdrop {...props} /></DesktopContent>}
      aside={<Chat {...props} />}
    />
  </>
);

export default AirdropPage;
