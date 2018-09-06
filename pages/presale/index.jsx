import Layout, { Content } from '@/components/layouts';
import Presale from '@/components/presale';
import { featureOn, featureRouteGuard } from '@/shared/utils';

const PresalePage = props => (
  <>
    <Layout.Mobile>
      <Content.Mobile>
        <Presale {...props} />
      </Content.Mobile>
    </Layout.Mobile>
    <Layout.Desktop>
      <Content.Desktop>
        <Presale {...props} />
      </Content.Desktop>
    </Layout.Desktop>
  </>
);

PresalePage.getInitialProps = ctx => {
  featureRouteGuard(ctx, featureOn('bitizens_presale'));
  return Presale.WrappedComponent.getInitialProps(ctx);
};

export default PresalePage;
