import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";

import {MENU_SHOW, CHAT_TOGGLE, USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";
import style from "@/shared/constants/style";


class HeaderItem extends Component {
  static defaultProps = {
    active: false,
    className: "",
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
            padding: 0 15px;
            background: ${this.props.active ? "rgba(255, 255, 255, .2)" : "transparent"};
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
          type: MENU_SHOW,
          payload: {showMenu: !this.props.layout.showMenu},
        })}
      >
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

@connect(
  state => ({
    chat: state.chat,
  })
)
class ChatToggle extends Component {
  static propTypes = {
    chat: PropTypes.shape({
      show: PropTypes.bool,
    }),
    dispatch: PropTypes.func,
  }

  render() {
    return (
      <HeaderItem active={this.props.chat.show} onClick={() => this.props.dispatch({type: CHAT_TOGGLE})}>
        <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-297.000000, -20.000000)" fill="#FFFFFF" fillRule="nonzero">
              <g transform="translate(297.000000, 20.000000)">
                <path d="M17.9249992,3.07788945 C15.9409858,1.09484925 13.3058993,0 10.4992462,0 C7.69259317,0 5.05750666,1.09484925 3.07349328,3.07788945 C-0.753760917,6.90326633 -1.03090691,13.0150754 2.37842872,17.1570352 C1.90772045,18.1199749 1.35342846,18.7619347 0.724351048,19.0697236 C0.341625629,19.258794 0.126067634,19.6721106 0.187655632,20.0942211 C0.253642774,20.5207286 0.579179337,20.8505025 1.00589618,20.9164573 C1.23905075,20.9516332 1.48980189,20.9736181 1.74935131,20.9736181 C3.03830014,20.9736181 4.3932361,20.5295226 5.52381579,19.7512563 C7.04591919,20.5690955 8.75718572,21 10.4992462,21 C13.3058993,21 15.9409858,19.9095477 17.9249992,17.9265075 C19.9090126,15.9434673 21,13.3052764 21,10.504397 C21,7.70351759 19.9090126,5.06092965 17.9249992,3.07788945 Z M17.0847629,17.0822864 C15.3251058,18.8410804 12.9847619,19.8084171 10.4992462,19.8084171 C8.83637029,19.8084171 7.20428832,19.3643216 5.78336522,18.5288945 C5.69098322,18.4761307 5.58540379,18.4453518 5.48422351,18.4453518 C5.35664837,18.4453518 5.22467409,18.4893216 5.11909466,18.5684673 C3.77295698,19.6105528 2.41802101,19.7644472 1.82413674,19.7776382 C2.53239872,19.25 3.12628299,18.4321608 3.62338612,17.2933417 C3.71576812,17.0822864 3.67617584,16.8360553 3.52220584,16.6601759 C0.266840202,12.9842965 0.438406769,7.38253769 3.91372954,3.9089196 C5.67338665,2.15012563 8.01373059,1.18278894 10.4992462,1.18278894 C12.9847619,1.18278894 15.3251058,2.15012563 17.0847629,3.9089196 C20.7184549,7.54522613 20.7184549,13.4547739 17.0847629,17.0822864 Z" id="Shape"></path>
                <path d="M14.4647577,7 L6.53524229,7 C6.23788546,7 6,7.22222222 6,7.5 C6,7.77777778 6.23788546,8 6.53524229,8 L14.4647577,8 C14.7621145,8 15,7.77777778 15,7.5 C15,7.22222222 14.7581498,7 14.4647577,7 Z" id="Shape"></path>
                <path d="M14.4647577,10 L6.53524229,10 C6.23788546,10 6,10.2222222 6,10.5 C6,10.7777778 6.23788546,11 6.53524229,11 L14.4647577,11 C14.7621145,11 15,10.7777778 15,10.5 C15,10.2222222 14.7581498,10 14.4647577,10 Z" id="Shape"></path>
                <path d="M14.4647577,13 L6.53524229,13 C6.23788546,13 6,13.2222222 6,13.5 C6,13.7777778 6.23788546,14 6.53524229,14 L14.4647577,14 C14.7621145,14 15,13.7777778 15,13.5 C15,13.2222222 14.7581498,13 14.4647577,13 Z" id="Shape"></path>
              </g>
            </g>
          </g>
        </svg>
      </HeaderItem>
    );
  }
}

@connect(
  state => ({
    user: state.user,
  })
)
class MobileMenu extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render() {
    const {user, dispatch} = this.props;

    return (
      <div className="menu-wrapper">
        <style jsx>{`
          .menu-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
          }
          :global(.settings-button) {
            display: ${user.data ? "none" : "flex"} !important; /* module overrides */
            color: ${style.colors.secondary};
            border: 0;
            background: #B0C3EE !important; /* module overrides */
            padding: 0 30px !important; /* module overrides */
            text-transform: uppercase;
            font-weight: 500;
            align-items: center;
            justify-content: center;
          }
          :global(.settings-button:hover) {
            background: #9BB2E7 !important;
          }
        `}</style>
        <ChatToggle />
        <MenuToggle />
        <HeaderItem className="settings-button" onClick={() => dispatch({
          type: USER_SHOW_REGISTER_WORKFLOW,
          payload: !this.props.user.showRegisterWorkflow,
        })}>
          <FormattedMessage id="buttons.register" />
        </HeaderItem>
      </div>
    );
  }
}


export default MobileMenu;
