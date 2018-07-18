import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Main from '@/components/layouts/main';
import Header from '@/components/header/mobile';
import MenuDrawer from '@/components/menudrawer';
import ChatDrawer from '@/components/chatdrawer';
import { Mobile } from '@/components/responsive';


@connect(
  state => ({
    chat: state.chat,
    layout: state.layout,
  })
)
class MobileLayout extends Component {
  render() {
    const props = Object.assign({}, this.props);

    delete props.dispatch; /* Cannot pass dispatch prop to children */

    return (
      <Mobile {...props}>
        <Header />
        <Main>
          {props.main}
        </Main>
        <MenuDrawer show={props.layout.showMenu} />
        <ChatDrawer show={props.layout.chatMobileShow} />
        {props.children}
      </Mobile>
    );
  }
}

MobileLayout.propTypes = {
  main: PropTypes.any,
  children: PropTypes.any,
};

MobileLayout.defaultProps = {
  main: null,
  children: null,
};

export default MobileLayout;
