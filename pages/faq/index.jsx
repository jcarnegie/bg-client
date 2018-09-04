import Layout, { Content } from '@/components/layouts';
import FAQ from '@/components/faq';


const FAQPage = props => (
  <>
    <Layout.Mobile>
      <Content.Mobile>
        <FAQ {...props} />
      </Content.Mobile>
    </Layout.Mobile>
    <Layout.Desktop>
      <Content.Desktop>
        <FAQ {...props} />
      </Content.Desktop>
    </Layout.Desktop>
  </>
);

export default FAQPage;
