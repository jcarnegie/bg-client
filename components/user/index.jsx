import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';

import { queries } from '@/shared/utils/apollo';
import { getWeb3Wallet } from '@/shared/utils/network';
import style from '@/shared/constants/style';

import { Mobile, Desktop } from '@/components/responsive';


class User extends Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    const { data } = this.props;
    const { viewUserByWallet } = data;

    if (!viewUserByWallet || data.loading) return <ScaleLoader height={10} width={2} color="white" />;
    if (data.error) return null;

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
            <span className="name">{viewUserByWallet.nickName}</span>
            <span className="wallet">{viewUserByWallet.wallet.substring(0, 10) + '...'}</span>
          </span>
          </div>
        </Desktop>
        <Mobile>
          <div className="user-mobile">
          <img src="/static/images/icons/avatar_my.png" className="avatar" />
          <span className="text">
            <span className="name">{viewUserByWallet.nickName}</span>
            <span className="wallet">{viewUserByWallet.wallet.substring(0, 10) + '...'}</span>
          </span>
          </div>
        </Mobile>
      </div>
    );
  }
}

export default compose(graphql(queries.viewUserByWallet, {
  options: props => ({
    variables: { wallet: getWeb3Wallet() },
    ssr: false,
  }),
}))(User);
