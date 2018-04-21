import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {connect} from "react-redux";


@connect(
  state => ({
    user: state.user,
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT
  })
)
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object
  };

  render() {
    const {user, balanceETH, balancePLAT} = this.props;
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">BitGuild</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse href="#">
          <Navbar.Text pullRight>
            {!balanceETH.isLoading && balanceETH.success ? `${balanceETH.data.toFixed(2)} ETH` : ""}
            {" "}
            {!balancePLAT.isLoading && balancePLAT.success ? `${balancePLAT.data.toFixed(0)} PLAT` : ""}
            {" "}
            {!user.isLoading && user.success ? user.data.nickName : "You are not logged in"}
            </Navbar.Text>
          <Nav navbar>
            <LinkContainer to="/inventory">
              <NavItem><FormattedMessage id="components.menu.inventory" /></NavItem>
            </LinkContainer>
            <LinkContainer to="/exchange">
              <NavItem><FormattedMessage id="components.menu.exchange" /></NavItem>
            </LinkContainer>
            <LinkContainer to="/community">
              <NavItem><FormattedMessage id="components.menu.community" /></NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
