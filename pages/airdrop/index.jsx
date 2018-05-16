import Layout from "../../components/layout";
import Airdrop from "../../components/airdrop";
import Chat from "../../components/chat";


const AirdropPage = () => (
  <Layout main={<Airdrop />} aside={<Chat />} />
);

export default AirdropPage;
