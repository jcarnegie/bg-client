import "./balance.less";
import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Convert from "../popups/convert";


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

  state = {
    show: false
  };

  onClick(e) {
    e.preventDefault();
    this.setState({
      show: true
    });
  }

  onHide() {
    this.setState({
      show: false
    });
  }

  render() {
    const {balanceETH, balancePLAT} = this.props;
    return (
      <Navbar.Text pullRight>
        <Convert show={this.state.show} onHide={::this.onHide} />
        {!balanceETH.isLoading && balanceETH.success ? `${balanceETH.data.toFixed(2)} ETH` : ""}
        {" "}
        {!balancePLAT.isLoading && balancePLAT.success ? `${balancePLAT.data.toFixed(0)} PLAT` : ""}
        {" "}
        <a href="#" className="plus" onClick={::this.onClick}>+</a>
      </Navbar.Text>
    );
  }
}
