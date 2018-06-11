// TODO - split into two separate header components for mobile and desktop
import React, {Component} from "react";
import Link from "next/link";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import style from "@/shared/constants/style";
import ActiveLink from "@/components/activelink";
import Language from "@/components/language";
import Balance from "@/components/balance";
import User from "@/components/user";
import MobileMenu from "@/components/mobilemenu";
import {Desktop, Mobile} from "@/components/responsive";


@injectIntl
@connect(
  state => ({
    account: state.account,
    responsive: state.responsive,
    chat: state.chat,
  })
)
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.any,
    chat: PropTypes.object,
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
          .logo-img {
            width: 24px;
          }
          .logo-img-mobile {
            margin: 0 0 0 15px;
          }
          .logo-img-desktop {
            margin: 0 0 0 30px;
          }
          .logo-text > a {
            margin: 0 45px 0 15px;
            color: ${style.colors.logos}; // #FFD57D
            text-decoration: none;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: .04em;
          }
        `}</style>
        <Mobile>
          <Link href="/">
            <img src="/static/images/logo-small.png" className="logo-img logo-img-mobile no-select" />
          </Link>
        </Mobile>
        <Desktop>
          <Link href="/">
            <img src="/static/images/logo-small.png" className="logo-img logo-img-desktop no-select" />
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
        </Desktop>
      </div>
    );
  }

  settings() {
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
        `}</style>
        <Balance />
        <User />
        <Language />
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
          .mobile-settings {
            position: absolute;
            top: 0;
            right: 0;
            height: 62px;
          }
        `}</style>
          {::this.navigation()}
        <Desktop>
          {::this.settings()}
        </Desktop>
        <Mobile>
          <div className="mobile-settings">
            <MobileMenu />
          </div>
        </Mobile>
      </header>
    );
  }
}
