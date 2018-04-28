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
    amount: 1
  };

  componentDidMount() {
    this.props.dispatch({
      type: RATE_UPDATE
    });
  }

  onInput(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const contract = window.web3.eth.contract(topupABI).at(process.env.TOPUP_CONTRACT_ADDR);
    contract.buyTokens({
        value: this.state.amount * 1e18,
        from: this.props.user.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      },
      console.info
    );
  }

  render() {
    if (!this.props.rate.data) {
      return null;
    }

    return (
      <Modal show={this.props.show} className="convert" onHide={this.props.onHide}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form inline onSubmit={::this.onSubmit}>
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.eth.label" />
              </Col>
              <Col>
                <FormControl
                  type="number"
                  name="amount"
                  defaultValue={this.state.amount}
                  onInput={::this.onInput}
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
                  name="result"
                  value={this.state.amount * this.props.rate.data}
                  readOnly
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
