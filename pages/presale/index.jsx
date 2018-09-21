import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Layout, { Content } from '@/components/layouts';
import Presale from '@/components/presale';
import { featureOn, featureRouteGuard } from '@/shared/utils';

const PresalePage = props => {
  return (
    <Layout>
      <MobileScreen>
        <Content.Mobile>
          <Presale {...props} />
        </Content.Mobile>
      </MobileScreen>
      <DesktopScreen>
        <Content.Desktop>
          <Presale {...props} />
        </Content.Desktop>
      </DesktopScreen>
    </Layout>
  );
};

PresalePage.getInitialProps = ctx => ctx.query;

export default PresalePage;
