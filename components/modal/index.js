import {Mobile, Desktop} from "@/components/responsive";
import BGDesktopModal from "@/components/modal/desktop";
import BGMobileModal from "@/components/modal/mobile";


export default function BGModal(props) {
  return (
    <>
      <Mobile>
        <BGMobileModal {...props} />
      </Mobile>
      <Desktop>
        <BGDesktopModal {...props} />
      </Desktop>
    </>
  );
};
