import { DesktopContent, MobileContent, DesktopLayout, MobileLayout } from '@/components/layouts';
import ThankYou from '@/components/thankyou';
import Chat from '@/components/chat';


const ThankYouPage = props => {
  return (
    <>
      <MobileLayout
        main={
          <div className="bg-thankyou">
            <style jsx>{`
              .bg-thankyou {
                padding: 4%;
                background-color: #CBDEFC;
                height: calc(100vh + -262px);
              }
            `}</style>
            <ThankYou {...props} />
          </div>}
      />
      <DesktopLayout
        main={<div className="bg-thankyou">
          <style jsx>{`
            .bg-thankyou {
              padding: 40px 10% 60px 10%;
              background-color: #CBDEFC;
              height: calc(100vh + -192px);
            }
          `}</style>
          <ThankYou {...props} />
        </div>}
        aside={<Chat {...props} />}
      />
    </>
  );
};

export default ThankYouPage;
