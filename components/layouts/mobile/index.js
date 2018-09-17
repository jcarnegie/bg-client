import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Main from '@/components/layouts/Main';
import Header from '@/components/header/mobile';
import Footer from '@/components/footer/mobile';
import MenuDrawer from '@/components/menudrawer';
import { MobileScreen } from 'react-responsive-redux';


@connect(
  state => ({
    layout: state.layout,
  })
)
class MobileLayout extends Component {
  render() {
    const props = Object.assign({}, this.props);

    delete props.dispatch; /* Cannot pass dispatch prop to children */

    return (
      <MobileScreen {...props}>
        <div className="mobile-wrapper">
          <Header />
          <Main>
            {props.children}
          </Main>
          <MenuDrawer show={props.layout.showMenu} />
        </div>
        <Footer />
      </MobileScreen>
    );
  }
}

MobileLayout.propTypes = {
  children: PropTypes.any,
};

MobileLayout.defaultProps = {
  children: null,
};

export default MobileLayout;
