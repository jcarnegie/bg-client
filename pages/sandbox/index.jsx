import { DesktopLayout, MobileLayout } from '@/components/layouts';
import Sandbox from '@/components/sandbox';


const SandboxPage = props => (
  <>
    <MobileLayout
      main={<Sandbox {...props} />}
    />
    <DesktopLayout
      main={<Sandbox {...props} />}
    />
  </>
);

SandboxPage.getInitialProps = ctx => Sandbox.getInitialProps(ctx);


export default SandboxPage;
