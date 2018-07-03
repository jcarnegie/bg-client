import React, {Component} from "react";
import Link from "next/link";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";

import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";
import style from "@/shared/constants/style";

import ActiveLink from "@/components/activelink";
import Language from "@/components/language";
import Balance from "@/components/balance";
import User from "@/components/user";


@injectIntl
@connect(
  state => ({
    account: state.account,
    chat: state.chat,
    user: state.user,
  })
)
export default class Header extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    chat: PropTypes.object,
    user: PropTypes.object,
  };

  navigation() {
    return (
      <div className="navigation">
        <style jsx>{`
          .navigation {
            height: 100%;
            display: flex;
            align-items: center;
            float: left;
          }
          .navigation .navigation-link {
            color: white;
            text-transform: uppercase;
            text-decoration: none;
            line-height: 62px;
            font-size: 13px;
            font-weight: 100;
          }
          .navigation :global(.navigation-link span) {
            vertical-align: middle;
          }
          .logo-img {
            width: 24px;
            margin: 0 0 0 30px;
          }
          .logo-text > a {
            margin: 0 45px 0 10px;
            color: ${style.colors.logos};
            text-decoration: none;
            font-size: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .04em;
          }
        `}</style>
        <Link href="/">
          <img src="/static/images/icons/bitguild_logo@1x.png" className="logo-img no-select" />
        </Link>
        <span className="logo-text">
          <Link href="/">
            <a><FormattedMessage id="components.title" /></a>
          </Link>
        </span>
        <ActiveLink
          href="/inventory"
          activeStyle={{boxShadow: "inset 0px -4px 0px 0px #ffd57d"}}
          style={{textDecoration: "none"}}
        >
          <span className="navigation-link"><FormattedMessage id="components.menu.inventory" /></span>
        </ActiveLink>
        <ActiveLink
          href="/marketplace"
          activeStyle={{ boxShadow: "inset 0px -4px 0px 0px #ffd57d" }}
          style={{ 
           textDecoration: "none",
           marginLeft: "20px" }}
        >
          <span className="navigation-link"><FormattedMessage id="components.menu.marketplace" /></span>
        </ActiveLink>
      </div>
    );
  }

  settings() {
    const {user, dispatch} = this.props;
    return (
      <div className="settings">
        <style jsx>{`
          .settings {
            height: 100%;
            width: auto;
            display: flex;
            float: right;
            margin: 0 15px 0 0;
          }
          .settings div {
            display: flex;
            align-items: center;
          }
          .settings .spaced-right {
            margin: 0 25px 0 0;
          }
          .settings .user {
            margin: 0 10px 0 0;
            display: ${user.data ? "initial" : "none"};
          }
          .settings .settings-button {
            display: ${user.data ? "none" : "initial"};
            color: white;
            margin: 0 -15px 0 0;
            border: 0;
            background-color: rgba(87, 181, 127, .9);
            padding: 0 30px;
            text-transform: uppercase;
            font-weight: 100;
            font-size: 14px;
            letter-spacing: 1px;
          }
          .settings .settings-button:hover {
            background-color: rgba(87, 181, 127, 1);
          }
        `}</style>
        <div className={cx({"spaced-right": !!user.data})}>
          <Balance />
        </div>
        <div className="user">
          <User />
        </div>
        <Language />
        <button className="settings-button" onClick={() => dispatch({
          type: USER_SHOW_REGISTER_WORKFLOW,
          payload: !user.showRegisterWorkflow,
        })}>
          <FormattedMessage id="buttons.register" />
        </button>
      </div>
    );
  }

  render() {
    return (
      <header className="header">
        <style jsx>{`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1060; /* Bootstrap modal is 1040, 1050 - MenuDrawer is 1030 */
            background-color: ${style.colors.secondary};
            height: ${style.header.height};
          }
        `}</style>
        {::this.navigation()}
        {::this.settings()}
      </header>
    );
  }
}
