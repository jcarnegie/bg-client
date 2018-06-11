import PropTypes from "prop-types";

import style from "@/shared/constants/style";

function Main(props) {
  return (
    <main>
      <style jsx>{`
        main {
          width: 100%;
          margin-top: ${style.header.height};
        }
      `}</style>
      {props.children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.any,
};

Main.defaultProps = {
  children: null,
};

export default Main;
