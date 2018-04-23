import "./balance.less";
import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";


@connect(
  state => ({
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT
  })
)
export default class Balance extends Component {
  static propTypes = {
    user: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object
  };

  render() {
    const {balanceETH, balancePLAT} = this.props;
    return (
      <Navbar.Text pullRight>
        {!balanceETH.isLoading && balanceETH.success ? `${balanceETH.data.toFixed(2)} ETH` : ""}
        {" "}
        {!balancePLAT.isLoading && balancePLAT.success ? `${balancePLAT.data.toFixed(0)} PLAT` : ""}
        {" "}
        <a href="#" className="plus">+</a>
      </Navbar.Text>
    );
  }
}
