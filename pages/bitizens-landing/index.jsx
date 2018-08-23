import { DesktopLayout, MobileLayout } from '@/components/layouts';
import GameLanding from '@/components/GameLanding';


const GameLandingPage = props => {
  return (
    <>
      <MobileLayout
        main={<GameLanding {...props} />}
      />
      <DesktopLayout
        main={<GameLanding {...props} />}
      />
    </>
  );
};

export default GameLandingPage;
