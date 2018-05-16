import PropTypes from "prop-types";

import Header from "../header";

import Aside from "./aside";
import Main from "./main";
// import BGModal from "./bgmodal";


const HEADER_HEIGHT = "62px";
const ASIDE_WIDTH = "285px";


function Layout(props) {
  const aside = props.aside ? (
    <Aside offsetTop={HEADER_HEIGHT}>
      {props.aside}
    </Aside>
  ) : null;

  return (
    <div>
      <Header />
      <Main offsetTop={HEADER_HEIGHT} offsetRight={ASIDE_WIDTH} contentPadding={props.contentPadding}>
        {props.main}
      </Main>

      {aside}

      {props.children}
    </div>
  );
}

Layout.propTypes = {
  main: PropTypes.any,
  aside: PropTypes.any,
  children: PropTypes.any,
  contentPadding: PropTypes.bool,
};

Layout.defaultProps = {
  aside: null,
  main: null,
  children: null,
  contentPadding: true,
};

export default Layout;
