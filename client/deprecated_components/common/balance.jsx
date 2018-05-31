import "./balance.less";
import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Convert from "../popups/convert";
import networkConfig from "../../utils/network";


@connect(
  state => ({
    user: state.user,
    network: state.network,
    balanceETH: state.balanceETH,
    balancePLAT: state.balancePLAT
  })
)
export default class Balance extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    network: PropTypes.object,
    balanceETH: PropTypes.object,
    balancePLAT: PropTypes.object
  };

  state = {
    show: false,
    balanceETH: this.props.balanceETH,
    balancePLAT: this.props.balancePLAT
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.balanceETH.data !== prevState.balanceETH.data) {
      return {
        balanceETH: nextProps.balanceETH
      };
    }

    if (nextProps.balancePLAT.data !== prevState.balancePLAT.data) {
      return {
        balancePLAT: nextProps.balancePLAT
      };
    }

    return null;
  }

  onClick(e) {
    e.preventDefault();

    const {network, user} = this.props;
    const isAvailable = !network.isLoading && network.success && Object.keys(networkConfig).includes(network.data.id) && !user.isLoading && user.success;

    this.setState({
      show: isAvailable
    });
  }

  onHide() {
    this.setState({
      show: false
    });
  }

  render() {
    const {balanceETH, balancePLAT, show} = this.state;

    if (!Number.isFinite(balanceETH.data) || !Number.isFinite(balancePLAT.data)) {
      return null;
    }

    return (
      <Navbar.Text>
        <Convert show={show} onHide={::this.onHide} />
        <span className="balance">
          {balanceETH.data.toFixed(2)} ETH
          {"\u00A0\u00A0\u00A0"}
          {balancePLAT.data.toFixed(0)} PLAT
        </span>
        <a href="#" className="plus" onClick={::this.onClick} />
      </Navbar.Text>
    );
  }
}
