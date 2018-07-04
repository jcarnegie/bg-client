import {DesktopLayout, MobileLayout} from "@/components/layouts";
import Landing from "@/components/landing";
import Chat from "@/components/chat";


const LandingPage = props => (
  <>
    <MobileLayout
      main={<Landing {...props} />}
    />
    <DesktopLayout
      main={<Landing {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

export default LandingPage;
