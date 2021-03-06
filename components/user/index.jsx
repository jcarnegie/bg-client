import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';
import Router from 'next/router';
import { contains, path, pathOr } from 'ramda';

import {
  GlobalContext,
} from '@/shared/utils/context';

import style from '@/shared/constants/style';

@connect(
  state => ({
    layout: state.layout,
  })
)
class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    layout: PropTypes.object,
  };

  static defaultProps = {
    user: {},
    layout: {},
  };

  truncatedField(str = '') {
    if (!str) return null;
    return str.length > 10 ? `${str.substring(0, 10)}...` : str;
  }

  fieldLoader() {
    return <ScaleLoader height={10} width={2} color="white" />;
  }

  render() {
    const { layout, user } = this.props;
    if (!user || !user.id) return null;
    const pathname = path(['router', 'pathname'], Router);
    if (!pathname || pathname === '/login' || pathname === '/register') return null;
    return (
      <GlobalContext.Consumer>
        {({ web3Wallet }) => {
          /* If no wallet, or wallet not linked, hide */
          if (!web3Wallet || !contains(web3Wallet, pathOr([], ['wallets'], user))) return null;
          return (
            <div className="user">
              <style jsx global>{`
                .user .user-mobile {
                  width: 100%;
                  padding: 20px 20px;
                  font-size: 14px;
                  font-weight: 100;
                }
                .user .user-mobile .text {
                  margin: 0;
                }
              `}</style>
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
                    .avatar {
                      width: 25px;
                      height: 25px;
                    }
                    .text {
                      line-height: 15px;
                      display: inline-block;
                      margin: 14px 0;
                      vertical-align: middle;
                      padding: 0 0 0 8px;
                    }
                    .text .name {
                      text-transform: uppercase;
                      font-size: ${layout.type.mobile ? '15px' : '14px'};
                      display: block;
                      text-align: right;
                      float: left;
                      clear: both;
                      ${layout.type.mobile ? 'margin-bottom: 5px;' : ''}
                    }
                    .text .wallet {
                      text-align: right;
                      display: block;
                      float: left;
                      clear: both;
                      font-size: ${layout.type.mobile ? '14px;' : '12px'};
                      ${layout.type.mobile ? 'font-weight: 100;' : ''}
                    }
                    .user-desktop {
                      margin-left: 20px;
                    }
                  `}</style>
                  <div className={cx({
                    'user-mobile': layout.type.mobile,
                    'user-desktop': !layout.type.mobile,
                  })}>
                  <img src="/static/images/icons/avatar_my.png" className="avatar" />
                  <span className="text">
                    <span className="name" title={user.nickName}>{this.truncatedField(user.nickName)}</span>
                    <span className="wallet" title={web3Wallet}>{this.truncatedField(web3Wallet)}</span>
                  </span>
                </div>
            </div>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}

export default User;
