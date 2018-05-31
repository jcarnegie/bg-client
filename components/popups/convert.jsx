import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Glyphicon, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";

import withFormHelper from "../inputs/withFormHelper";
import topupABI from "../../shared/contracts/topup";
import networkConfig from "../../client/utils/network";
import {MESSAGE_ADD} from "../../shared/constants/actions";
import InputGroup from "../inputs/input.group";


function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

@withFormHelper
@connect(
  state => ({
    gas: state.gas,
    rate: state.rate,
    user: state.user,
    network: state.network,
  })
)
export default class ConvertPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    rate: PropTypes.object,
    dispatch: PropTypes.func,
    onHide: PropTypes.func,
    setState: PropTypes.func,
    formData: PropTypes.object,
    user: PropTypes.object,
    network: PropTypes.object,
    gas: PropTypes.object,
  };

  state = {};

  componentDidMount() {
    const {setState, rate} = this.props;
    setState({
      eth: 1,
      plat: rate.data
    });
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.rate.isLoading && nextProps.rate.success && nextProps.rate.data * nextProps.formData.eth !== nextProps.formData.plat) {
      nextProps.setState({
        plat: nextProps.rate.data * nextProps.formData.eth
      });
    }

    return null;
  }

  onChangeETH(e) {
    const {setState, rate} = this.props;
    setState({
      eth: e.target.value,
      plat: rate.data * e.target.value
    });
  }

  onChangePLAT(e) {
    const {setState, rate} = this.props;
    setState({
      eth: e.target.value / rate.data,
      plat: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {network, user, gas, dispatch, formData} = this.props;
    const contract = window.web3.eth.contract(topupABI).at(networkConfig[network.data.id].topup);
    contract.buyTokens({
        value: window.web3.toWei(precisionRound(formData.eth, 6), "ether"),
        from: user.data.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(gas.data.average),
      },
      error => {
        if (error) {
          dispatch({
            type: MESSAGE_ADD,
            payload: error,
          });
        }
      }
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 189 || e.keyCode === 69) { // disallow - e
      e.preventDefault();
    }
  }

  render() {
    const {rate, show, onHide, formData} = this.props;

    if (!rate.data) {
      return null;
    }

    const step = 0.1;

    return (
      <Modal show={show} className="convert" onHide={onHide}>
        <style jsx global>{`
          .convert h2 {
            font-size: 20px !important;
          }
          .convert .modal-header {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
          .convert .glyphicon.glyphicon-transfer {
            background-color: #C0BFD3;
            display: inline-block;
            margin: 0 10px;
            height: 30px;
            width: 30px;
            line-height: 30px;
            color: #ffffff;
            border-radius: 50%;
            vertical-align: text-top;
          }
          .convert .form-control[type=number] {
            width: 145px;
          }

        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form inline noValidate onSubmit={::this.onSubmit}>
            <h2>1 ETH = {rate.data} PLAT</h2>
            <br />
            <InputGroup
              type="number"
              step={step}
              min={step}
              name="eth"
              onKeyDown={::this.onKeyDown}
              value={precisionRound(formData.eth, 6)}
              onChange={::this.onChangeETH}
              required
            />

            <Glyphicon glyph="transfer" />

            <InputGroup
              type="number"
              min={rate.data * step}
              step={rate.data * step}
              name="plat"
              value={precisionRound(formData.plat, 6)}
              onChange={::this.onChangePLAT}
            />

            <br />
            <br />
            <br />

            <Button type="submit" className="btn-block text-uppercase">
              <FormattedMessage id="buttons.convert" />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
