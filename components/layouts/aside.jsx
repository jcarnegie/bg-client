import PropTypes from "prop-types";

function Aside(props) {
  return (
    <aside>
      <style jsx>{`
        position: fixed;
        right: 0;
        top: ${props.offsetTop};
        bottom: 0;
        width: ${props.width};
      `}</style>
      {props.children}
    </aside>
  );
};

Aside.propTypes = {
  width: PropTypes.string,
  offsetTop: PropTypes.string,
  children: PropTypes.any,
};

Aside.defaultProps = {
  width: "285px",
  offsetTop: "0px",
  children: null,
};

export default Aside;
