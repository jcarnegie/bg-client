import {DesktopLayout, MobileLayout} from "@/components/layouts";
import Sandbox from "@/components/sandbox";
import Chat from "@/components/chat";


const SandboxPage = props => (
  <>
    <MobileLayout
      main={<Sandbox {...props} />}
    />
    <DesktopLayout
      main={<Sandbox {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

SandboxPage.getInitialProps = ctx => Sandbox.getInitialProps(ctx);

export default SandboxPage;
