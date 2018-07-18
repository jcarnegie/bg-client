import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Events from '@/components/events';
import Chat from '@/components/chat';


const EventsPage = props => (
  <>
    <MobileLayout
      main={<MobileContent><Events {...props} /></MobileContent>}
    />
    <DesktopLayout
      main={<DesktopContent><Events {...props} /></DesktopContent>}
      aside={<Chat {...props} />}
    />
  </>
);

export default EventsPage;
