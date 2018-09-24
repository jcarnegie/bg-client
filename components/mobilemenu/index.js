import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginButton from '@/components/LoginButton';

import {
  LAYOUT_MOBILE_MENU_SHOW,
} from '@/shared/constants/actions';

import style from '@/shared/constants/style';


class HeaderItem extends Component {
  static defaultProps = {
    active: false,
    className: '',
    onClick: () => {},
  }

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
    active: PropTypes.bool,
  }

  render() {
    return (
      <div className={`header-item no-select ${this.props.className}`} onClick={this.props.onClick}>
        <style jsx>{`
          .header-item {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 21px;
            background: ${this.props.active ? 'rgba(255, 255, 255, .2)' : 'transparent'};
          }
        `}</style>
        {this.props.children}
      </div>
    );
  }
}

@connect(
  state => ({
    layout: state.layout,
  })
)
class MenuToggle extends Component {
  static propTypes = {
    layout: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render() {
    return (
      <HeaderItem
        active={this.props.layout.showMenu}
        onClick={() => this.props.dispatch({
          type: LAYOUT_MOBILE_MENU_SHOW,
          payload: { showMenu: !this.props.layout.showMenu },
        })}
      >
        <style jsx>{`
          g {
            fill: white;
          }
        `}</style>
        <svg width="20px" height="17px" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Portal-UIs-final" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="chat--screen-2-copy-4" transform="translate(-337.000000, -21.000000)" fill="#D7DDE3">
              <g id="navbar" transform="translate(-1.000000, -1.000000)">
                <g id="icon--menu" transform="translate(338.000000, 22.000000)">
                  <rect id="rec" x="0" y="0" width="20" height="3" rx="1.5"></rect>
                  <rect id="rec" x="0" y="7" width="15" height="3" rx="1.5"></rect>
                  <rect id="rec" x="0" y="14" width="20" height="3" rx="1.5"></rect>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </HeaderItem>
    );
  }
}


class MobileMenu extends Component {
  render() {
    return (
      <div className="menu-wrapper">
        <style jsx>{`
          .menu-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
          }
        `}</style>
        <MenuToggle />
        <LoginButton />
      </div>
    );
  }
}


export default MobileMenu;
