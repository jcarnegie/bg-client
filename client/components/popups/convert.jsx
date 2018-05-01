import "./modal.less";
import "./convert.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {RATE_UPDATE} from "../../../shared/constants/actions";
import {FormattedMessage} from "react-intl";
import topupABI from "../../../shared/contracts/topup";


@connect(
  state => ({
    rate: state.rate,
    user: state.user
  })
)
export default class ConvertPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    rate: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    onHide: PropTypes.func
  };

  state = {
    eth: 1,
    plat: this.props.rate.data
  };

  static isMetaMaskInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.rate.isLoading && nextProps.rate.success && nextProps.rate.data * prevState.eth !== prevState.plat) {
      return {
        plat: nextProps.rate.data * prevState.eth
      };
    }

    return null;
  }

  componentDidMount() {
    if (ConvertPopup.isMetaMaskInstalled()) {
      this.props.dispatch({
        type: RATE_UPDATE
      });
    }
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
    const contract = window.web3.eth.contract(topupABI).at(process.env.TOPUP_CONTRACT_ADDR);
    contract.buyTokens({
        value: this.state.eth * 1e18,
        from: this.props.user.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      },
      console.info
    );
  }

  render() {
    const {rate, show, onHide} = this.props;

    if (!rate.data) {
      return null;
    }

    return (
      <Modal show={show} className="convert" onHide={onHide}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form inline onSubmit={::this.onSubmit}>
            <h2>1 ETH = {rate.data} PLAT</h2>
            <br />
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.eth.label" />
              </Col>
              <Col>
                <FormControl
                  type="number"
                  step="0.1"
                  min="0.1"
                  name="amount"
                  value={this.state.eth}
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
                  min="5000"
                  step="5000"
                  name="result"
                  value={this.state.plat}
                  onChange={::this.onChangePLAT}
                />
              </Col>
            </FormGroup>

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
