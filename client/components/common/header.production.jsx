import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Navbar} from "react-bootstrap";


export default class Header extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/images/logo.png" className="navbar-logo" />
            <Link to="/" className="navbar-name">BitGuild</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}
