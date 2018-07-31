import { DesktopLayout, MobileLayout } from '@/components/layouts';
import GameLanding from '@/components/GameLanding';
import Chat from '@/components/chat';


const GameLandingPage = props => {
  return (
    <>
      <MobileLayout
        main={<GameLanding {...props} />}
      />
      <DesktopLayout
        main={<GameLanding {...props} />}
        layoutOverrides={{ asideRightCollapsedOverride: true, asideRightWidthOverride: 0, asideRightCollapsedWidthOverride: 0 }}
      />
    </>
  );
};

export default GameLandingPage;
