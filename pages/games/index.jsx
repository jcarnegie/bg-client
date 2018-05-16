import Layout from "../../components/layout";
import Games from "../../components/games";
import Chat from "../../components/chat";


const GamesPage = () => (
  <Layout main={<Games />} aside={<Chat />} contentPadding={false} />
);

export default GamesPage;
