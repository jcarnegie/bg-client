import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Mobile, Desktop } from '@/components/responsive';

import style from '@/shared/constants/style';

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
    const { user } = this.props;

    if (user.isLoading || !user.success) {
      return null;
    }

    return (
      <div className="user">
        <style jsx>{`
          .user {
            line-height: 0;
            height: 62px;
            display: flex;
            align-items: center;
            color: white;
            font-size: 12px;
            font-weight: 100;
          }
          .user .avatar {
            width: 25px;
            height: 25px;
          }
          .user .text {
            line-height: 15px;
            display: inline-block;
            margin: 14px 0;
            vertical-align: middle;
            padding: 0 0 0 8px;
          }
          .user .text .name {
            text-transform: uppercase;
            font-size: 14px;
            display: block;
            text-align: right;
            float: left;
            clear: both;
          }
          .user .text .wallet {
            text-align: right;
            display: block;
            float: left;
            clear: both;
            font-size: 12px;
          }
          .user .user-mobile {
            border-bottom: ${style.header.border};
            width: 100%;
            padding: 20px 27px;
            font-size: 14px;
            font-weight: 100;
          }
          .user .user-mobile .text {
            margin: 0;
          }
        `}</style>
        <Desktop>
          <div className="user-desktop">
          <img src="/static/images/icons/avatar_my.png" className="avatar" />
          <span className="text">
            <span className="name">{user.data.nickName}</span>
            <span className="wallet">{user.data.wallet.substring(0, 10) + '...'}</span>
          </span>
          </div>
        </Desktop>
        <Mobile>
          <div className="user-mobile">
          <img src="/static/images/icons/avatar_my.png" className="avatar" />
          <span className="text">
            <span className="name">{user.data.nickName}</span>
            <span className="wallet">{user.data.wallet.substring(0, 10) + '...'}</span>
          </span>
          </div>
        </Mobile>
      </div>
    );
  }
}
