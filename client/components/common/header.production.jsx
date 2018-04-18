import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";


export default class Header extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">BitGuild</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}
