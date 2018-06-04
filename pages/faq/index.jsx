import Layout from "../../components/layout";
import Faq from "../../components/faq";
import Chat from "../../components/chat";


const FaqPage = () => (
  <Layout main={<Faq />} aside={<Chat />} contentPadding />
);

export default FaqPage;
