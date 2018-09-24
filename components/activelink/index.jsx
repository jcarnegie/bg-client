import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';


const ActiveLink = ({
  children,
  router = Router,
  href,
  as = null,
  style,
  activeStyle,
  className,
  ...rest
}) => {
  const allStyle = Object.assign({}, style, activeStyle);
  const isStringHref = typeof href === 'string';

  const handleClick = e => {
    e.preventDefault();
    if (!isStringHref) return router.push(href, as);
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
  root: PropTypes.object,
};

ActiveLink.defaultProps = {
  children: null,
  className: '',
  router: Router,
  href: '/',
  style: {},
  activeStyle: {},
  as: '',
  root: {},
};

export default withRouter(ActiveLink);
