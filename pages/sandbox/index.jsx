import Sandbox from "../../components/sandbox";
import Layout from "../../components/layout";
import Chat from "../../components/chat";


const SandboxPage = props => (
	<Layout
		main={<Sandbox {...props} />}
		aside={<Chat />}
		contentPadding={false}
	/>
);

SandboxPage.getInitialProps = ctx => Sandbox.getInitialProps(ctx);

export default SandboxPage;
