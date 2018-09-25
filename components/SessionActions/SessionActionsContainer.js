import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { path } from 'ramda';

import { web3NetworkStateHasBeenChecked } from '@/shared/utils/network';
import {
  withGlobalContext,
} from '@/shared/utils/context';

import DataLoading from '@/components/DataLoading';
import NetworkNotSupported from '@/components/NetworkNotSupported';
import LoginToWeb3 from '@/components/LoginToWeb3';
import InstallWeb3 from '@/components/InstallWeb3';
import { withRoot } from '@/components/wrappers';


@connect(
  state => ({
    layout: state.layout,
    analytics: state.analytics,
  })
)
@withGlobalContext
@withRoot
class SessionActionsContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    layout: PropTypes.object,
    analytics: PropTypes.object,
    root: PropTypes.object,
    ctx: PropTypes.object,
  }

  state = {
    loading: false,
    success: false,
  }

  component() {
    const { children, root } = this.props;
    const { web3Wallet } = this.props.ctx;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { web3Wallet }));

    if (!web3NetworkStateHasBeenChecked(path(['network'], root))) {
      return childrenWithProps;
    }

    if (!web3Wallet) {
      return <LoginToWeb3 />;
    }
    if (root.network.available === false) {
      return <InstallWeb3 />;
    }
    if (root.network.supported === false) {
      return <NetworkNotSupported />;
    }
    if (this.state.loading) {
      return <DataLoading />;
    }
    if (this.state.success) {
      return <div>Success!</div>;
    }
    return childrenWithProps;
  }

  render() {
    const { mobile } = this.props.layout.type;
    return (
      <div className="session-actions-container">
        <style jsx>{`
          .session-actions-container {
            background: linear-gradient(to bottom, #B4D0F5, #D8D8EF);
            height: ${mobile ? null : 'calc(100vh - 62px)'};
            display: flex;
            flex-direction: ${mobile ? 'column' : 'row'};
          }
          :global(.session-actions-container .form-control) {
            border: 0;
            outline: 0;
            border-bottom: 1px solid black;
            height: 45px;
          }
          .session-actions-container-image-container {
            display: flex;
            align-items: center;
            justify-content: ${mobile ? 'center' : 'flex-start'};
            width: ${mobile ? '100%' : '100%'};
            float: left;
            height: ${mobile ? null : '100%'};
            margin-top: ${mobile ? '30px' : null};
            margin-bottom: ${mobile ? '30px' : null};
            padding-right: ${mobile ? 0 : '5%'};
          }
          .session-actions-container-image {
            border-radius: 50%;
            width: 70%;
            display: block;
            margin-left: ${mobile ? 0 : 'auto'};
            position: relative;
            max-width: 500px;
            max-height: 500px;
          }
          :global(.session-actions-container-btn) {
            width: 100% !important;
            font-size: 18px !important;
            font-weight: 500 !important
          }
          .session-actions-component {
            display: flex;
            align-items: center;
            justify-content: ${mobile ? 'center' : 'flex-start'};
            width: 100%;
            padding-left: ${mobile ? 0 : '5%'};
          }
          :global(.btn-block-session-actions-container-active) {
            color: white;
            background: #314B88;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            padding: 10px 0px 10px 0px !important;
          }
          :global(.btn-block-session-actions-container) {
            color: #6C5A5A !important;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            background-color: #D7DEF6 !important;
            padding: 10px 0px 10px 0px !important;
          }
        `}</style>
        <div className="session-actions-container-image-container">
          <img src="/static/images/misc/auth.png" className="session-actions-container-image" />
        </div>
        <div className="session-actions-component">
          {::this.component()}
        </div>
      </div>
    );
  }
}


export default SessionActionsContainer;
