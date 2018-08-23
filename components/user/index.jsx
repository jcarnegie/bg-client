import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { path } from 'ramda';
import cx from 'classnames';

import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';

import { viewUserByWalletQuery } from '@/shared/utils/apollo';
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
    return str.length > 10 ? `${str.substring(0, 10)}...` : str;
  }

  fieldLoader() {
    return <ScaleLoader height={10} width={2} color="white" />;
  }

  render() {
    const { user, layout } = this.props;
    const { viewUserByWallet, loading } = user;
    if (user.error || !viewUserByWallet) return null;

    const nickName = path(['nickName'], viewUserByWallet);
    const wallet = path(['wallet'], viewUserByWallet);

    return (
      <div className="user">
        <style jsx global>{`
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
                font-size: 14px;
                display: block;
                text-align: right;
                float: left;
                clear: both;
              }
              .text .wallet {
                text-align: right;
                display: block;
                float: left;
                clear: both;
                font-size: 12px;
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
              <span className="name">{loading ? this.fieldLoader() : this.truncatedField(nickName)}</span>
              <span className="wallet">{loading ? this.fieldLoader() : this.truncatedField(wallet)}</span>
            </span>
          </div>
      </div>
    );
  }
}

export default compose(viewUserByWalletQuery)(User);
