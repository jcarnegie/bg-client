import Inventory from "../../components/inventory";
import Layout from "../../components/layout";
import Chat from "../../components/chat";


const InventoryPage = () => (
  <Layout main={<Inventory />} aside={<Chat />} contentPadding />
);


export default InventoryPage;
