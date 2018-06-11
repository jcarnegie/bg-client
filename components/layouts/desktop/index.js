import PropTypes from "prop-types";
import Header from "@/components/header";

import Aside from "@/components/layouts/desktop/aside";
import Main from "@/components/layouts/desktop/main";
import {Desktop} from "@/components/responsive";

const HEADER_HEIGHT = "62px";
const ASIDE_WIDTH = "285px";

function DesktopLayout(props) {
  const aside = props.aside ? (
    <Aside offsetTop={HEADER_HEIGHT}>
      {props.aside}
    </Aside>
  ) : null;

  return (
    <Desktop {...props}>
      <Header />
      <Main offsetRight={ASIDE_WIDTH}>
        {props.main}
      </Main>
      {aside}
      {props.children}
    </Desktop>
  );
}

DesktopLayout.propTypes = {
  main: PropTypes.any,
  aside: PropTypes.any,
  children: PropTypes.any,
};

DesktopLayout.defaultProps = {
  aside: null,
  main: null,
  children: null,
};

export default DesktopLayout;
