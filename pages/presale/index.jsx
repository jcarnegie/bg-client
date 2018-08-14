import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Presale from '@/components/presale';
import Chat from '@/components/chat';
import { featureOn, featureRouteGuard } from '@/shared/utils';

const PresalePage = props => (
  <>
    <MobileLayout
      main={<MobileContent><Presale {...props} /></MobileContent>}
    />
    <DesktopLayout
      main={<DesktopContent><Presale {...props} /></DesktopContent>}
      aside={<Chat {...props} />}
    />
  </>
);

PresalePage.getInitialProps = ctx => {
  featureRouteGuard(ctx, featureOn('bitizens_presale'));
  return Presale.WrappedComponent.getInitialProps(ctx);
};

export default PresalePage;
