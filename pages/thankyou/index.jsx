import Layout from '@/components/layouts';
import ThankYou from '@/components/thankyou';


const ThankYouPage = props => {
  return (
    <>
      <Layout.Mobile>
        <div className="bg-thankyou">
          <style jsx>{`
            .bg-thankyou {
              padding: 4%;
              background-color: #CBDEFC;
              height: calc(100vh + -262px);
            }
          `}</style>
          <ThankYou {...props} />
        </div>
      </Layout.Mobile>
      <Layout.Desktop>
        <div className="bg-thankyou">
          <style jsx>{`
            .bg-thankyou {
              padding: 40px 10% 60px 10%;
              background-color: #CBDEFC;
              height: calc(100vh + -192px);
            }
          `}</style>
          <ThankYou {...props} />
        </div>
      </Layout.Desktop>
    </>
  );
};

export default ThankYouPage;
