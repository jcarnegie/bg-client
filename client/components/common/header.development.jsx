import "./header.less";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
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
    account: state.account
  })
)
export default class Header extends Component {
  static propTypes = {
    account: PropTypes.object
  };

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
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/images/logo.png" className="navbar-logo" />
            <Link to="/" className="navbar-name">
              <FormattedMessage id="components.title" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.renderNav()}
      </Navbar>
    );
  }
}
