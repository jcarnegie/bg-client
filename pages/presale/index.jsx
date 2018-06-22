import {DesktopContent, MobileContent, DesktopLayout, MobileLayout} from "@/components/layouts";
import Presale from "@/components/presale";
import Chat from "@/components/chat";
import {featureRouteGuard} from "@/shared/utils";

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
  featureRouteGuard(ctx, process.env.FEATURE_PRESALE === "true");
  return Presale.WrappedComponent.getInitialProps(ctx);
};

export default PresalePage;
