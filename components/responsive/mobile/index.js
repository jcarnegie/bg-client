import PropTypes from "prop-types";
import Responsive from "react-responsive";

import style from "@/shared/constants/style";

function Mobile(props) {
  return (
    <Responsive {...props} maxWidth={style.mobile.maxWidth}>
      <style jsx global>{`
        body {
          font-size: 16px;
        }

        h1 {
          font-size: 1.6em;
        }

        h2 {
          font-size: 1.4em;
        }

        h3 {
          font-size: 1.2em;
        }

        h5 {
          font-size: 1.1em;
        }
      `}</style>
      {props.children}
    </Responsive>
  );
}

Mobile.propTypes = {
  children: PropTypes.any,
};

export default Mobile;
