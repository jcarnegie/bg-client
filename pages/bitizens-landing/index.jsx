import Layout from '@/components/layouts';
import GameLanding from '@/components/GameLanding';


const GameLandingPage = props => {
  return (
    <>
      <Layout.Mobile>
        <GameLanding {...props} />
      </Layout.Mobile>
      <Layout.Desktop>
        <GameLanding {...props} />
      </Layout.Desktop>
    </>
  );
};

export default GameLandingPage;
