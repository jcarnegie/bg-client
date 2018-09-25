import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import {
  queries,
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

export const rootShape = PropTypes.shape({
  network: PropTypes.object,
  wallet: PropTypes.string,
});

export const withMe = Component => function ComponentWithMe(props) {
 return (
    <Query ssr query={queries.me}>
      {({ loading, data = {} }) => {
        if (loading) return null;
        return <Component {...props} {...data} />;
      }}
    </Query>
  );
};
