import PropTypes from "prop-types";

const HEADER_HEIGHT = "62px";

function Main(props) {
  return (
    <main>
      <style jsx>{`
        main {
          margin-top: ${props.offsetTop};
          width: calc(100% - ${props.offsetRight});
          padding: ${props.contentPadding ? "4px 0 0 0" : "initial"};
        }
      `}</style>
      {props.children}
    </main>
  );
}

Main.propTypes = {
  offsetRight: PropTypes.string,
  offsetTop: PropTypes.string,
  children: PropTypes.any,
  contentPadding: PropTypes.bool,
};

Main.defaultProps = {
  offsetRight: false,
  offsetTop: HEADER_HEIGHT,
  children: null,
  contentPadding: false,
};

export default Main;
