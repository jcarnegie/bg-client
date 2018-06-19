import {DesktopLayout, MobileLayout} from "@/components/layouts";
import Game from "@/components/game";
import Chat from "@/components/chat";
import {userLoginRouteGuard, ethNetworkRouteGuard} from "@/shared/utils";

const GamePage = props => (
  <>
    <MobileLayout
      main={<Game {...props} />}
    />
    <DesktopLayout
      main={<Game {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

GamePage.getInitialProps = ctx => {
  userLoginRouteGuard(ctx);
  ethNetworkRouteGuard(ctx);
  return Game.getInitialProps(ctx);
};


export default GamePage;
