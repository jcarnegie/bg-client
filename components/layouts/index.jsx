import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import MobileHeader from '@/components/header/mobile';
import MobileFooter from '@/components/footer/mobile';
import DesktopHeader from '@/components/header/desktop';
import DesktopFooter from '@/components/footer/desktop';
import MenuDrawer from '@/components/menudrawer';

import style from '@/shared/constants/style';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';
import Main from './Main';


@connect(
  state => ({
    layout: state.layout,
  })
)
class Layout extends Component {
  static propTypes = {
    showFooter: PropTypes.bool,
    layout: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    showFooter: true,
    layout: {},
    children: null,
  }

  render() {
    return (
      <>
        <DesktopScreen><DesktopHeader /></DesktopScreen>
        <MobileScreen><MobileHeader /></MobileScreen>
          <Main>
            {this.props.children}
          </Main>
          <MobileScreen><MenuDrawer show={this.props.layout.showMenu} /></MobileScreen>
        {
          this.props.showFooter ? (
            <>
              <DesktopScreen><DesktopFooter /></DesktopScreen>
              <MobileScreen><MobileFooter /></MobileScreen>
            </>
          ) : null
        }
      </>
    );
  }
}

function Content({ padding = '20px', children = null }) {
  return (
    <div className="bg-content">
      <style jsx>{`
        .bg-content {
          padding: ${padding};
          background-color: ${style.colors.background};
        }
      `}</style>
      {children}
    </div>
  );
}

Content.propTypes = {
  padding: PropTypes.string,
  children: PropTypes.any,
};

function DesktopContent(props) {
  return (<Content {...props} padding="40px 10%" />);
}
function MobileContent(props) {
  return (<Content {...props} padding="4%" />);
}

Content.Desktop = DesktopContent;
Content.Mobile = MobileContent;

Layout.Content = Content;
Layout.Main = Main;
Layout.Desktop = DesktopLayout;
Layout.Mobile = MobileLayout;

export {
  Layout,
  DesktopLayout,
  MobileLayout,
  Content,
  DesktopContent,
  MobileContent,
};

export default Layout;
