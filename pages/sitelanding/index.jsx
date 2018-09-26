import Layout from '@/components/layouts';
import Landing from '@/components/landing';

import { Query } from 'react-apollo';
import { sitelandingQuery } from '@/shared/utils/apollo/sitelanding';


const SiteLandingPage = props => (
  <Layout>
    <Query query={sitelandingQuery}>
      {({ data, loading }) => {
        if (loading) return null;
        return <Landing {...props} games={data} me={data.me} />;
      }}
    </Query>
  </Layout>
);


export default SiteLandingPage;
