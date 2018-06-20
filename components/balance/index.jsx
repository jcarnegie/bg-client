import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ScaleLoader from "react-spinners/dist/spinners/ScaleLoader";
import MdAddCircle from "react-icons/lib/md/add-circle";

import Convert from "@/components/popups/convert";

import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";


@connect(
  state => ({
    user: state.user,
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT,
  })
)
export default class Balance extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
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
    if (!this.props.user.data) {
      return this.props.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: true});
    }
    this.setState({
      show: true,
    });
  }

  onHide() {
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
        `}</style>
        <a href="#" className="plus" onClick={::this.onClick}>
          <MdAddCircle height="30" width="30" />
        </a>
      </span>
    );
  }

  balances() {
    const {balanceETH, balancePLAT} = this.state;

    if (!Number.isFinite(balanceETH.data) || !Number.isFinite(balancePLAT.data)) {
      return null;
    }
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
          {this.props.balanceETH.isLoading ? this.textLoading() : <span className="balance-value">{balanceETH.data.toFixed(2)} ETH</span>}
        </div>
        <div>
          {this.props.balancePLAT.isLoading ? this.textLoading() : <span className="balance-value">{balancePLAT.data.toFixed(0)} PLAT</span>}
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
        <Convert show={this.state.show} onHide={::this.onHide} />
        {::this.plus()}
        {::this.balances()}
      </div>
    );
  }
}
