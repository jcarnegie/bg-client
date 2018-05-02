import "./header.less";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FormattedMessage} from "react-intl";
import Balance from "./balance";
import User from "./user";


export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/images/logo.png" className="navbar-logo" />
            <Link to="/" className="navbar-name">BitGuild</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse href="#">
          <Nav navbar>
            <LinkContainer to="/inventory">
              <NavItem><FormattedMessage id="components.menu.inventory" /></NavItem>
            </LinkContainer>
          </Nav>
          <User />
          <Balance />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
