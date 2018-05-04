import "./user.less";
import React, {Component} from "react";
import {Navbar, Image} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";


@connect(
  state => ({
    user: state.user
  })
)
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object
  };

  render() {
    const {user} = this.props;
    if (user.isLoading || !user.success) {
      return null;
    }

    return (
      <Navbar.Text pullRight>
        {user.data.wallet.substring(0, 10)}
        <Image src="/images/logo.png" className="avatar" />
      </Navbar.Text>
    );
  }
}
