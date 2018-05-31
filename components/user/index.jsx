import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Image, Navbar} from "react-bootstrap";


@connect(
  state => ({
    user: state.user,
  })
)
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object,
  };

  render() {
    const {user} = this.props;

    if (user.isLoading || !user.success) {
      return null;
    }

    return (
      <>
        <style jsx global>{`
          .user {
            line-height: 0;
          }
          .user .avatar {
            width: 25px;
            height: 25px;
            border-radius: 6px;
            margin-left: 5px;
          }
          .user .text {
            line-height: 15px;
            display: inline-block;
            margin: 15px 0;
            vertical-align: middle;
          }
          .user .text .name {
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            display: block;
            text-align: right;
          }
          .user .text .wallet {
            font-size: 11px;
            font-weight: 300;
            text-align: right;
            display: block;
          }        
        `}</style>
        <Navbar.Text className="user">
          <span className="text">
            <span className="name">{user.data.nickName}</span>
            <span className="wallet">{user.data.wallet.substring(0, 10) + "..."}</span>
          </span>
          <Image src="/static/images/avatar.png" className="avatar" />
        </Navbar.Text>
      </>
    );
  }
}
