import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  viewUserByWalletQuery,
  localQueries,
} from '@/shared/utils/apollo';


import {
  AUTH_ROUTES_REGEX,
  requireUserLoginAndSupportedNetwork,
} from '@/shared/utils';


const ActiveLink = ({
  children,
  router = Router,
  href,
  as = null,
  style,
  activeStyle,
  className,
  user,
  data,
  ...rest
}) => {
  const allStyle = Object.assign({}, style, activeStyle);
  const { network } = data;
  const isStringHref = typeof href === 'string';

  const handleClick = e => {
    e.preventDefault();
    if (!isStringHref) return router.push(href, as);
    if (!href.match(AUTH_ROUTES_REGEX)) return router.push(href);
    if (!requireUserLoginAndSupportedNetwork(user, network)) return;
    return router.push(href);
  };

  const isActive = isStringHref ? router.asPath.indexOf(href) !== -1 : router.asPath.indexOf(href.pathname) !== -1;

  return (
    <a href={href} onClick={handleClick} style={isActive ? allStyle : style} className={className}>
      {children}
    </a>
  );
};

ActiveLink.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  router: PropTypes.any,
  href: PropTypes.any,
  style: PropTypes.object,
  activeStyle: PropTypes.object,
  as: PropTypes.any,
  user: PropTypes.object,
  data: PropTypes.object,
};

ActiveLink.defaultProps = {
  children: null,
  className: '',
  router: Router,
  href: '/',
  style: {},
  activeStyle: {},
  as: '',
  user: {},
  data: {},
};

export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root)
)(withRouter(ActiveLink));
