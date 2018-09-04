import Layout from '@/components/layouts';
import Landing from '@/components/landing';


const SiteLandingPage = props => (
  <>
    <Layout.Mobile>
      <Landing {...props} />
    </Layout.Mobile>
    <Layout.Desktop>
      <Landing {...props} />
    </Layout.Desktop>
  </>
);

export default SiteLandingPage;
