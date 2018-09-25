import React, { Component } from 'react';
import * as log from 'loglevel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, path } from 'ramda';
import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import Router from 'next/router';

import {
  client,
  localMutations,
} from '@/shared/utils/apollo';

// import Convert from '@/components/popups/convert';
import {
  GlobalContext,
} from '@/shared/utils/context';


import { SHOW_CONVERT_MODAL } from '@/shared/constants/actions';


@connect(
  state => ({
    layout: state.layout,
  })
)
class Balance extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    layout: PropTypes.object,
    balanceETH: PropTypes.number,
    balancePLAT: PropTypes.number,
    rate: PropTypes.number,
    user: PropTypes.object,
  };
  static defaultProps = {
    data: {},
    layout: {},
  }

  state = {
    show: false,
    balanceETH: this.props.balanceETH,
    balancePLAT: this.props.balancePLAT,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { balanceETH, balancePLAT } = nextProps;
    let props = {};
    if (balanceETH !== prevState.balanceETH) {
      props.balanceETH = balanceETH;
    }

    if (balancePLAT !== prevState.balancePLAT) {
      props.balancePLAT = balancePLAT;
    }

    return isEmpty(props) ? props : null;
  }

  onClick(e) {
    e.preventDefault();
    if (!this.props.user) {
      // TODO: redirect to login
      return client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });
    }

    if (!this.props.rate) {
      log.info('No rate info is avaliable, so convert workflow may not work properly.');
    }

    this.setState({
      show: true,
    });
  }

  onHide() {
    this.props.dispatch({ type: SHOW_CONVERT_MODAL, payload: false });
    this.setState({
      show: false,
    });
  }

  textLoading() {
    return <ScaleLoader height={10} width={2} color="white" />;
  }

  plus() {
    return (
      <span>
        <style jsx>{`
          .plus {
            display: inline-block;
            vertical-align: middle;
            color: rgba(255,255,255, 1);
          }
          .plus :hover {
            color: rgba(255,255,255, .8);
          }
          .plus :focus {
            outline: 0;
          }

          .plus[disabled] {
            color: rgba(200,200,200, 1);
            cursor:  not-allowed;
          }
        `}</style>
        <a href="#" className="plus" onClick={::this.onClick} disabled={!this.props.rate}>
          <MdAddCircle height="30" width="30" />
        </a>
      </span>
    );
  }

  balances() {
    const { balanceETH, balancePLAT } = this.props;
    return (
      <GlobalContext.Consumer>
        {({ web3Wallet }) => {
          if (!web3Wallet) return null;
          return (
            <span className="balance-text">
              <style jsx>{`
            .balance-text {
              margin:  0 0 0 8px;
            }
            .balance-text > * {
              display: block;
              line-height: 13px;
            }
            :global(.balance-text > *) {
              display: flex;
            }
            .balance-value {
              text-transform: uppercase;
              display: block;
              text-align: right;
              float: left;
              clear: both;
              line-height: ${this.props.layout.type.mobile ? '20px' : '14px'};
            }
          `}</style>
              <div>
                {!Number.isFinite(balanceETH) || <span className="balance-value">{balanceETH.toFixed(2)} ETH</span>}
              </div>
              <div>
                {!Number.isFinite(balancePLAT) || <span className="balance-value">{balancePLAT.toFixed(0)} PLAT</span>}
              </div>
            </span>
          );
        }}
      </GlobalContext.Consumer>
    );
  }

  render() {
    const pathname = path(['router', 'pathname'], Router);
    if (!pathname || pathname === '/login' || pathname === '/register') return null;
    return (
      <div className="balance">
        <style jsx>{`
          :global(.balance) {
            display: flex;
            align-items: center;
            color: white;
            font-size: ${this.props.layout.type.mobile ? '14px' : '13px'};
            font-weight: 100;
          }
        `}</style>
        {/* <Convert show={this.state.show || this.props.layout.showConvertModal} onHide={::this.onHide} /> */}
        {/* {::this.plus()} */}
        {::this.balances()}
      </div>
    );
  }
}

export default Balance;
