import PropTypes from "prop-types";

import style from "@/shared/constants/style";

function Main(props) {
  return (
    <main>
      <style jsx>{`
        main {
          width: 100%;
          margin-top: ${style.header.height};
          width: calc(100% - ${props.offsetRight ? props.offsetRight : "0"});
        }
      `}</style>
      {props.children}
    </main>
  );
}

Main.propTypes = {
  offsetRight: PropTypes.string,
  children: PropTypes.any,
};

Main.defaultProps = {
  offsetRight: "0",
  children: null,
};

export default Main;
