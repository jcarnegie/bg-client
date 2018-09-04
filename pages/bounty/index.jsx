import Layout from '@/components/layouts';
import Bugbounty from '@/components/bugbounty';


const BugBountyPage = props => {
  return (
    <>
      <Layout.Mobile>
        <div className="bg-bounty">
          <style jsx>{`
            .bg-bounty {
              padding: 4%;
              background-color: #F3F8FF;
            }
          `}</style>
          <Bugbounty {...props} />
        </div>
      </Layout.Mobile>
      <Layout.Desktop>
        <div className="bg-bounty">
          <style jsx>{`
            .bg-bounty {
              padding: 40px 10% 60px 10%;
              background-color: #F3F8FF;
            }
          `}</style>
          <Bugbounty {...props} />
        </div>
      </Layout.Desktop>
    </>
  );
};

export default BugBountyPage;
