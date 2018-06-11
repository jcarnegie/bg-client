import {DesktopLayout, MobileLayout} from "@/components/layouts";
import Game from "@/components/game";
import Chat from "@/components/chat";


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

GamePage.getInitialProps = ctx => Game.getInitialProps(ctx);

export default GamePage;
