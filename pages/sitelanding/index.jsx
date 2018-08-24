import { DesktopLayout, MobileLayout } from '@/components/layouts';
import Landing from '@/components/landing';


const SiteLandingPage = props => (
  <>
    <MobileLayout
      main={<Landing {...props} />}
    />
    <DesktopLayout
      main={<Landing {...props} />}
    />
  </>
);

export default SiteLandingPage;
