import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Layout, { Content } from '@/components/layouts';
import Presale from '@/components/presale';
import { Query } from 'react-apollo';
import { featureOn, featureRouteGuard } from '@/shared/utils';
import { presaleQuery } from '@/shared/utils/apollo/presale';

const PresalePage = props => {
  return (
    <Layout>
      <Query query={presaleQuery}>
        {({ data, loading }) => {
          if (loading) return null;
          return (
            <>
              <MobileScreen>
                <Content.Mobile>
                  <Presale {...props} me={data.me} listUserPresaleTickets={data.listUserPresaleTickets} />
                </Content.Mobile>
              </MobileScreen>
              <DesktopScreen>
                <Content.Desktop>
                  <Presale {...props} />
                </Content.Desktop>
              </DesktopScreen>
            </>
          )
        }}
      </Query>
    </Layout>
  );
};

PresalePage.getInitialProps = ctx => ctx.query;

export default PresalePage;
