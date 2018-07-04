import PropTypes from "prop-types";
import Router, {withRouter} from "next/router";

const ActiveLink = ({children, router = Router, href, style, activeStyle, className}) => {
  const allStyle = Object.assign({}, style, activeStyle);

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={router.pathname.indexOf(href) !== -1 ? allStyle : style} className={className}>
      {children}
    </a>
  );
};

ActiveLink.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  router: PropTypes.any,
  href: PropTypes.string,
  style: PropTypes.object,
  activeStyle: PropTypes.object,
};

ActiveLink.defaultProps = {
  children: null,
  className: "",
  router: Router,
  href: "/",
  style: {},
  activeStyle: {},
};

export default withRouter(ActiveLink);
