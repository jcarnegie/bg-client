import Layout from '@/components/layouts';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import GameLanding from '@/components/GameLanding';


const GameLandingPage = props => {
  return (
    <Layout>
      <MobileScreen>
        <GameLanding {...props} />
      </MobileScreen>
      <DesktopScreen>
        <GameLanding {...props} />
      </DesktopScreen>
    </Layout>
  );
};

export default GameLandingPage;
