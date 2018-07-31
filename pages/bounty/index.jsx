import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import Bugbounty from '@/components/bugbounty';
import Chat from '@/components/chat';


const BugBountyPage = props => {
  return (
    <>
      <MobileLayout
        main={
          <div className="bg-bounty">
            <style jsx>{`
              .bg-bounty {
                padding: 4%;
                background-color: #F3F8FF;
              }
            `}</style>
            <Bugbounty {...props} />
          </div>}
      />
      <DesktopLayout
        main={<div className="bg-bounty">
          <style jsx>{`
            .bg-bounty {
              padding: 40px 10%;
              background-color: #F3F8FF;
            }
          `}</style>
          <Bugbounty {...props} />
        </div>}
        aside={<Chat {...props} />}
      />
    </>
  );
};

export default BugBountyPage;
