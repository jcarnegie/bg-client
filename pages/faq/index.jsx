import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import FAQ from '@/components/faq';


const FAQPage = props => (
  <>
    <MobileLayout
      main={<MobileContent><FAQ {...props} /></MobileContent>}
    />
    <DesktopLayout
      main={<DesktopContent><FAQ {...props} /></DesktopContent>}
    />
  </>
);

export default FAQPage;
