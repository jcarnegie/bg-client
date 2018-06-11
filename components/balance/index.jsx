import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Convert from "@/components/popups/convert";
import {Mobile, Desktop} from "@/components/responsive";


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
    this.setState({
      show: true,
    });
  }

  onHide() {
    this.setState({
      show: false,
    });
  }

  render() {
    const {balanceETH, balancePLAT, show} = this.state;

    if (!Number.isFinite(balanceETH.data) || !Number.isFinite(balancePLAT.data)) {
      return null;
    }

    return (
      <div className="balance">
        <style jsx>{`
          .balance {
            display: flex;
            align-items: center;
            color: white;
            font-size: 12px;
            font-weight: 100;
          }
          .balance-text {
            margin:  0 10px 0 5px;
          }
          .balance-value {
            text-transform: uppercase;
            display: block;
            text-align: right;
            float: left;
            clear: both;
          }
          .plus {
            width: 25px;
            height: 25px;
            display: inline-block;
            vertical-align: middle;
            background-image: url("/static/images/buttons/balance/add.png");
            background-size: 25px 25px;
          }
          .plus :hover {
            background-image: url("/static/images/buttons/balance/add_clicked.png");
            background-size: cover;
          }
          .plus :focus {
            outline: 0;
          }
          
          .balance .balance-mobile {
            display: flex;
            align-items: center;
            padding: 20px 27px;
            font-size: 14px;
            font-weight: 100;
          }
          .balance .balance-mobile .balance-text {
            display: inline-block;
            line-height: 14px;
            padding: 0 0 0 8px;
            margin: 0;
          }
          .balance .balance-mobile .plus {
            margin: 0;
          }
        `}</style>
        <Convert show={show} onHide={::this.onHide} />
        <Desktop>
          <a href="#" className="plus" onClick={::this.onClick} />
          <span className="balance-text">
            <span className="balance-value">{balanceETH.data.toFixed(2)} ETH</span>
            <span className="balance-value">{balancePLAT.data.toFixed(0)} PLAT</span>
          </span>
        </Desktop>
        <Mobile>
          <div className="balance-mobile">
            <a href="#" className="plus" onClick={::this.onClick} />
            <span className="balance-text">
              <span className="balance-value">{balanceETH.data.toFixed(2)} ETH</span>
              <span className="balance-value">{balancePLAT.data.toFixed(0)} PLAT</span>
            </span>
          </div>
        </Mobile>
      </div>
    );
  }
}
