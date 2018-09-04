import Layout from '@/components/layouts';
import Sandbox from '@/components/sandbox';


const SandboxPage = props => (
  <>
    <Layout.Mobile>
      <Sandbox {...props} />
    </Layout.Mobile>
    <Layout.Desktop>
      <Sandbox {...props} />
    </Layout.Desktop>
  </>
);

SandboxPage.getInitialProps = ctx => Sandbox.getInitialProps(ctx);


export default SandboxPage;
