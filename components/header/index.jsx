import React, {Component} from "react";
import Link from "next/link";
import {Image, Nav, Navbar} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ActiveLink from "../activelink";
import Language from "../language";
import Balance from "../balance";
import User from "../user";


@injectIntl
@connect(
  state => ({
    account: state.account,
  })
)
export default class Header extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderNav = ::this.renderNav;
  }

  renderNav() {
    const {account} = this.props;

    if (account.isLoading || !account.success) {
      return null;
    }

    return (
      <Navbar.Collapse>
        <Nav navbar className="main-menu">
          <li>
            <ActiveLink
              href="/inventory"
              activeStyle={{boxShadow: "inset 0px -4px 0px 0px #ffd57d"}}
            >
              <FormattedMessage id="components.menu.inventory" />
          </ActiveLink>
          </li>
        </Nav>
        <Nav navbar pullRight>
          <Balance />
          <User />
          <Language />
        </Nav>
      </Navbar.Collapse>
    );
  }

  render() {
    return (
      <Navbar fixedTop fluid>
        <style jsx global>{`
          .navbar {
            background-color: #314B88;
            border-radius: 0;
            border: 0;
            margin: 0;
            z-index: 1060;
          }
          .navbar .container-fluid {
            padding-left: 90px;
            padding-right: 90px;
          }
          .navbar .navbar-brand {
            padding: 13px 15px;
            height: 62px;
          }
          .navbar .navbar-brand .navbar-logo {
            margin-top: 4px;
            width: 24px;
            display: inline-block;
            float: left;
          }
          .navbar .navbar-brand .navbar-name,
          .navbar .navbar-brand .navbar-name a {
            font-weight: 700;
            font-size: 20px;
            margin-left: 5px;
            line-height: 36px;
            color: #FFD57D;
            text-transform: uppercase;
            letter-spacing: .04em;
          }
          .navbar .navbar-brand .navbar-name,
          .navbar .navbar-brand .navbar-name:hover,
          .navbar .navbar-brand .navbar-name a,
          .navbar .navbar-brand .navbar-name a:hover {
            text-decoration: none;
          }
          .navbar .navbar-text,
          .nav a,
          .navbar a {
            color: #ffffff;
            line-height: 62px;
            font-size: 13px;
            margin: 0;
          }
          .navbar .navbar-nav > .open > a,
          .navbar .navbar-nav > .open > a:hover,
          .navbar .navbar-nav > .open > a:focus {
            color: #ffffff;
            background-color: transparent;
          }
          .navbar .dropdown-menu li a:hover {
            background: rgb(49, 75, 136) !important;
          }
          .navbar .main-menu > li > a {
            color: #ffffff;
            font-weight: 600;
            font-size: 15px;
            text-transform: uppercase;
            padding-top: 0;
            padding-bottom: 0;
          }
          .navbar .main-menu > li > a:hover,
          .navbar .main-menu > li > a:focus {
            color: #ffffff;
          }
          .navbar .main-menu > li > a span {
            line-height: 62px;
            display: inline-block;
          }
          .navbar .main-menu > li > a,
          .navbar .main-menu > li > a:hover,
          .navbar .main-menu > li > a:focus {
            color: #ffffff;
            background-color: initial;
          }
          .navbar-text {
            padding: 0 20px;
          }
          .navbar-text span {
            margin: 0 10px 0 0;
          }
        `}</style>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/static/images/logo-small.png" className="navbar-logo" />
            <span className="navbar-name">
              <Link href="/">
                <a><FormattedMessage id="components.title" /></a>
              </Link>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.renderNav()}
      </Navbar>
    );
  }
}
