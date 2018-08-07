import React, { Component } from 'react';
import * as log from 'loglevel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import {
  compose,
} from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import Convert from '@/components/popups/convert';

import { USER_SHOW_REGISTER_WORKFLOW, SHOW_CONVERT_MODAL } from '@/shared/constants/actions';


@connect(
  state => ({
    rate: state.rate,
    layout: state.layout,
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT,
  })
)
class Balance extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    layout: PropTypes.object,
    rate: PropTypes.object,
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object,
  };

  state = {
    show: false,
    balanceETH: this.props.balanceETH,
    balancePLAT: this.props.balancePLAT,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.balanceETH.data !== prevState.balanceETH.data) {
      return {
        balanceETH: nextProps.balanceETH,
      };
    }

    if (nextProps.balancePLAT.data !== prevState.balancePLAT.data) {
      return {
        balancePLAT: nextProps.balancePLAT,
      };
    }

    return null;
  }

  onClick(e) {
    e.preventDefault();
    if (!this.props.user.viewUserByWallet) {
      return this.props.dispatch({ type: USER_SHOW_REGISTER_WORKFLOW, payload: true });
    }

    if (!this.props.rate.data) {
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
        <a href="#" className="plus" onClick={::this.onClick} disabled={!this.props.rate.data}>
          <MdAddCircle height="30" width="30" />
        </a>
      </span>
    );
  }

  balances() {
    const { balanceETH, balancePLAT } = this.state;
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
            line-height: 14px;
          }
        `}</style>
        <div>
          {!Number.isFinite(balanceETH.data) || this.props.balanceETH.isLoading ? this.textLoading() : <span className="balance-value">{balanceETH.data.toFixed(2)} ETH</span>}
        </div>
        <div>
          {!Number.isFinite(balancePLAT.data) || this.props.balancePLAT.isLoading ? this.textLoading() : <span className="balance-value">{balancePLAT.data.toFixed(0)} PLAT</span>}
        </div>
      </span>
    );
  }

  render() {
    return (
      <div className="balance">
        <style jsx>{`
          :global(.balance) {
            display: flex;
            align-items: center;
            color: white;
            font-size: 13px;
            font-weight: 100;
          }
        `}</style>
        <Convert show={this.state.show || this.props.layout.showConvertModal} onHide={::this.onHide} />
        {::this.plus()}
        {::this.balances()}
      </div>
    );
  }
}


export default compose(
  viewUserByWalletQuery,
)(Balance);
