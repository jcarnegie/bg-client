import "./header.less";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";

import {CHAT_TOGGLE} from "../../../shared/constants/actions";

import Language from "./language";
import Balance from "./balance";
import User from "./user";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router";


@injectIntl
@withRouter
@connect(
  state => ({
    account: state.account,
    chat: state.chat
  })
)
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.any,
    chat: PropTypes.object
  };

  openChat() {
    const {dispatch} = this.props;
    dispatch({
      type: CHAT_TOGGLE
    });
  }

  chatIcon() {
    return (
      <div className={"header-icon chat-icon" + (this.props.chat.visible ? " chat-active" : "")} onClick={::this.openChat}>
        <svg viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-228.000000, -19.000000)">
              <g transform="translate(240.500000, 31.500000) scale(-1, 1) translate(-240.500000, -31.500000) translate(228.000000, 19.000000)">
                <path d="M12.5,13.3241758 C12.0448352,13.3241758 11.6758242,12.9551648 11.6758242,12.5 C11.6758242,12.0448352 12.0448352,11.6758242 12.5,11.6758242 C12.9551648,11.6758242 13.3241758,12.0448352 13.3241758,12.5 C13.3241758,12.9551648 12.9551648,13.3241758 12.5,13.3241758 M12.5,0 C5.59642857,0 0,5.59642857 0,12.5 C0,15.1126923 0.802087912,17.5378022 2.17274725,19.5435714 L0.530879121,24.4691209 L5.45648352,22.8273077 C7.4621978,24.197967 9.88730769,25 12.5,25 C19.4035714,25 25,19.4035714 25,12.5 C25,5.59642857 19.4035714,0 12.5,0" fill="#BDCFEC"></path>
                <path d="M8,13 C8,14.1045946 7.10459459,15 6,15 C4.89540541,15 4,14.1045946 4,13 C4,11.8954054 4.89540541,11 6,11 C7.10459459,11 8,11.8954054 8,13" id="Fill-3" fill="#617FBA"></path>
                <path d="M14,13 C14,14.1045946 13.1045946,15 12,15 C10.8954595,15 10,14.1045946 10,13 C10,11.8954054 10.8954595,11 12,11 C13.1045946,11 14,11.8954054 14,13" id="Fill-5" fill="#617FBA"></path>
                <path d="M20,13 C20,14.1045946 19.1045946,15 18,15 C16.8954054,15 16,14.1045946 16,13 C16,11.8954054 16.8954054,11 18,11 C19.1045946,11 20,11.8954054 20,13" id="Fill-7" fill="#617FBA"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  menuToggle() {
    const {showMenu} = this.state;
    return (
      <div className={"header-icon menu-icon" + (showMenu ? " menu-active" : "")} onClick={() => ::this.setState({showMenu: !showMenu})}>
        <svg width="27px" height="18px" viewBox="0 0 27 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
            <g transform="translate(-276.000000, -22.000000)" stroke="#FFFFFF" strokeWidth="2">
              <g transform="translate(277.000000, 21.000000)">
                <path d="M24.3421053,2 L0.657894737,2"></path>
                <path d="M24.3421053,10 L0.657894737,10"></path>
                <path d="M24.3421053,18 L0.657894737,18"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  mobileMenu() {
    return (
      <Nav className="mobile-menu">
        <ul className="menu-nav">
          <LinkContainer to="/inventory" className="menu-list-item">
            <NavItem><FormattedMessage id="components.menu.inventory" /></NavItem>
          </LinkContainer>
        </ul>
        <Balance />
        <User />
        <Language />
      </Nav>
    );
  }

  renderNav() {
    const {account} = this.props;

    if (account.isLoading || !account.success) {
      return null;
    }

    return (
      <Navbar.Collapse href="#">
        <Nav navbar className="main-menu">
          <LinkContainer to="/inventory">
            <NavItem><FormattedMessage id="components.menu.inventory" /></NavItem>
          </LinkContainer>
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
    const {showMenu} = this.state;
    return (
      <Navbar fixedTop fluid>
        <Link to="/" className="navbar-logo-mobile">
          <Image src="/images/logo.png" />
        </Link>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/images/logo.png" className="navbar-logo" />
            <Link to="/" className="navbar-name">
              <FormattedMessage id="components.title" />
            </Link>
          </Navbar.Brand>
          {this.chatIcon()}
          {this.menuToggle()}
        </Navbar.Header>
        {this.renderNav()}
        {showMenu ? this.mobileMenu() : null}
      </Navbar>
    );
  }
}
