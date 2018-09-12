import { Query } from 'react-apollo';

import {
  localQueries,
} from '@/shared/utils/apollo';


export const withRoot = Component => function ComponentWithRoot(props) {
  return (
    <Query query={localQueries.root}>
      {({ data }) => {
        return <Component {...props} root={data} />;
      }}
    </Query>
  );
};
