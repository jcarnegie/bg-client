import {DesktopLayout, MobileLayout} from "@/components/layouts";
import Games from "@/components/games";
import Chat from "@/components/chat";


const GamesPage = props => (
  <>
    <MobileLayout
      main={<Games {...props} />}
    />
    <DesktopLayout
      main={<Games {...props} />}
      aside={<Chat {...props} />}
    />
  </>
);

export default GamesPage;
