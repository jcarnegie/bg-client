import "./modal.less";
import "./convert.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import topupABI from "../../../shared/contracts/topup";
import networkConfig from "../../utils/network";
import {MESSAGE_ADD} from "../../../shared/constants/actions";

function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

@connect(
  state => ({
    rate: state.rate,
    user: state.user,
    network: state.network
  })
)
export default class ConvertPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    rate: PropTypes.object,
    dispatch: PropTypes.func,
    onHide: PropTypes.func,
    user: PropTypes.object,
    network: PropTypes.object
  };

  state = {
    eth: 1,
    plat: this.props.rate.data
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.rate.isLoading && nextProps.rate.success && nextProps.rate.data * prevState.eth !== prevState.plat) {
      return {
        plat: nextProps.rate.data * prevState.eth
      };
    }

    return null;
  }

  onChangeETH(e) {
    this.setState({
      eth: e.target.value,
      plat: this.props.rate.data * e.target.value
    });
  }

  onChangePLAT(e) {
    this.setState({
      eth: e.target.value / this.props.rate.data,
      plat: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {network, user, dispatch} = this.props;
    const contract = window.web3.eth.contract(topupABI).at(networkConfig[network.data.id].topup);
    contract.buyTokens({
        value: window.web3.toWei(precisionRound(this.state.eth, 6)),
        from: user.data.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      },
      error => {
        if (error) {
          dispatch({
            type: MESSAGE_ADD,
            payload: error
          });
        } else {
          ReactGA.event({
            category: "Money",
            action: "Conversion",
            label: precisionRound(this.state.eth, 6)
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
    const {rate, show, onHide} = this.props;

    if (!rate.data) {
      return null;
    }

    const step = 0.1;

    return (
      <Modal show={show} className="convert" onHide={onHide}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form inline noValidate onSubmit={::this.onSubmit}>
            <h2>1 ETH = {rate.data} PLAT</h2>
            <br />
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.eth.label" />
              </Col>
              <Col>
                <FormControl
                  type="number"
                  step={step}
                  min={step}
                  name="amount"
                  onKeyDown={::this.onKeyDown}
                  value={precisionRound(this.state.eth, 6)}
                  onChange={::this.onChangeETH}
                  required
                />
              </Col>
            </FormGroup>

            <Glyphicon glyph="transfer" />

            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.plat.label" />
              </Col>
              <Col>
                <FormControl
                  type="number"
                  min={rate.data * step}
                  step={rate.data * step}
                  name="result"
                  value={precisionRound(this.state.plat, 6)}
                  onChange={::this.onChangePLAT}
                />
              </Col>
            </FormGroup>

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
