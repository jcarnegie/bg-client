import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Navbar} from "react-bootstrap";
import {FormattedMessage} from "react-intl";


export default class Header extends Component {
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
      </Navbar>
    );
  }
}
