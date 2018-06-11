import PropTypes from "prop-types";
import Responsive from "react-responsive";

import style from "@/shared/constants/style";

function Mobile(props) {
  return (
    <Responsive {...props} maxWidth={style.mobile.maxWidth}>
      {props.children}
    </Responsive>
  );
}

Mobile.propTypes = {
  children: PropTypes.any,
};

export default Mobile;
