import {DesktopContent, MobileContent, DesktopLayout, MobileLayout} from "@/components/layouts";
import FAQ from "@/components/faq";
import Chat from "@/components/chat";


const FAQPage = props => (
  <>
    <MobileLayout
      main={<MobileContent><FAQ {...props} /></MobileContent>}
    />
    <DesktopLayout
      main={<DesktopContent><FAQ {...props} /></DesktopContent>}
      aside={<Chat {...props} />}
    />
  </>
);

export default FAQPage;
