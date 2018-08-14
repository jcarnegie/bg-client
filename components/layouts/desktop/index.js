import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '@/components/header/desktop';
import Footer from '@/components/footer/desktop';
import Main from '@/components/layouts/main';
import Aside from '@/components/layouts/aside';
import { Desktop } from '@/components/responsive';

import style from '@/shared/constants/style';


@connect(
  state => ({
    layout: state.layout,
  })
)
class DesktopLayout extends React.Component {
  static propTypes = {
    main: PropTypes.any,
    aside: PropTypes.any,
    dispatch: PropTypes.func,
    layout: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    aside: null,
    main: null,
    children: null,
  }

  render() {
    let {
      asideRightCollapsed,
      asideRightWidth,
      asideRightCollapsedWidth,
    } = this.props.layout;

    const aside = this.props.aside ? (
      <Aside offsetTop={style.header.height}>
        {this.props.aside}
      </Aside>
    ) : null;

    /* dispatch should not be passed to children */
    const props = Object.assign({}, this.props);
    delete props.dispatch;

    let offsetRight = '0';
    if (aside) offsetRight = asideRightCollapsed ? asideRightCollapsedWidth.toString() : asideRightWidth.toString();

    return (
      <Desktop {...props}>
        <div className="wrapper">
          <Header />
          <Main offsetRight={offsetRight}>
            {this.props.main}
          </Main>
          {aside}
          {this.props.children}
        </div>
        <Footer offsetRight={offsetRight} />
      </Desktop>
    );
  }
}


export default DesktopLayout;
