import { DesktopLayout, MobileLayout } from '@/components/layouts';
import GameLanding from '@/components/GameLanding';
import Chat from '@/components/chat';


const GameLandingPage = props => (
  <>
    <MobileLayout
      main={<GameLanding {...props} />}
    />
    <DesktopLayout
      main={<GameLanding {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

export default GameLandingPage;
