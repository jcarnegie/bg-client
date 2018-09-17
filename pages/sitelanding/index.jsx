import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Layout from '@/components/layouts';
import Landing from '@/components/landing';


const SiteLandingPage = props => (
  <Layout>
    <MobileScreen>
      <Landing {...props} />
    </MobileScreen>
    <DesktopScreen>
      <Landing {...props} />
    </DesktopScreen>
  </Layout>
);

export default SiteLandingPage;
