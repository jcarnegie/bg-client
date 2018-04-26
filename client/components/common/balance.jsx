import "./balance.less";
import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import topupABI from "../../../shared/contracts/topup";


@connect(
  state => ({
    user: state.user,
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT
  })
)
export default class Balance extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object
  };

  onClick(e) {
    e.preventDefault();
    const contract = window.web3.eth.contract(topupABI).at(process.env.TOPUP_CONTRACT_ADDR);
    contract.buyTokens({
        value: 1.1 * 1e18,
        from: this.props.user.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      },
      console.info
    );
  }

  render() {
    const {balanceETH, balancePLAT} = this.props;
    return (
      <Navbar.Text pullRight>
        {!balanceETH.isLoading && balanceETH.success ? `${balanceETH.data.toFixed(2)} ETH` : ""}
        {" "}
        {!balancePLAT.isLoading && balancePLAT.success ? `${balancePLAT.data.toFixed(0)} PLAT` : ""}
        {" "}
        <a href="#" className="plus" onClick={this.onClick}>+</a>
      </Navbar.Text>
    );
  }
}
