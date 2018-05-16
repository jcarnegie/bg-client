import Layout from "../../components/layout";
import Game from "../../components/game";
import Chat from "../../components/chat";


const GamePage = props => (
  <Layout
    main={<Game {...props} />}
    aside={<Chat />}
  />
);

GamePage.getInitialProps = ctx => Game.getInitialProps(ctx);

export default GamePage;
