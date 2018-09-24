import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import BGDesktopModal from '@/components/modal/desktop';
import BGMobileModal from '@/components/modal/mobile';


export default function BGModal(props) {
  return (
    <>
      <MobileScreen>
        <BGMobileModal {...props} />
      </MobileScreen>
      <DesktopScreen>
        <BGDesktopModal {...props} />
      </DesktopScreen>
    </>
  );
};
