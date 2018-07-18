import PropTypes from 'prop-types';
import Header from '@/components/header/desktop';

import Main from '@/components/layouts/main';
import Aside from '@/components/layouts/aside';
import { Desktop } from '@/components/responsive';

import style from '@/shared/constants/style';


function DesktopLayout(props) {
  const aside = props.aside ? (
    <Aside offsetTop={style.header.height}>
      {props.aside}
    </Aside>
  ) : null;

  return (
    <Desktop {...props}>
      <Header />
      <Main offsetRight={style.aside.width}>
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
