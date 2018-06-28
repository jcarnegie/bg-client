import React, {Component} from "react";
import * as log from "loglevel";
import PropTypes from "prop-types";
import {Button, Form, Glyphicon, Modal, Grid, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";

import BGModal from "@/components/modal";
import withFormHelper from "@/components/inputs/withFormHelper";
import topupABI from "@/shared/contracts/topup";
import {MESSAGE_ADD} from "@/shared/constants/actions";
import networkConfig from "@/client/utils/network";
import InputGroup from "@/components/inputs/input.group";


function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

@withFormHelper
@connect(
  state => ({
    analytics: state.analytics,
    gas: state.gas,
    rate: state.rate,
    user: state.user,
    network: state.network,
  })
)
export default class ConvertPopup extends Component {
  static propTypes = {
    analytics: PropTypes.object,
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
      plat: rate.data,
    });
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.rate.isLoading && nextProps.rate.success && nextProps.rate.data * nextProps.formData.eth !== nextProps.formData.plat) {
      nextProps.setState({
        plat: nextProps.rate.data * nextProps.formData.eth,
      });
    }

    return null;
  }

  onChangeETH(e) {
    const {setState, rate} = this.props;
    setState({
      eth: e.target.value,
      plat: rate.data * e.target.value,
    });
  }

  onChangePLAT(e) {
    const {setState, rate} = this.props;
    setState({
      eth: e.target.value / rate.data,
      plat: e.target.value,
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
          return dispatch({
            type: MESSAGE_ADD,
            payload: error,
          });
        }
        this.props.analytics.ga.event({
          category: "Site Interaction",
          action: "Purchase",
          label: "Buy-Plat",
        });
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
      <BGModal show={show} className="convert" onHide={onHide}>
        <style jsx>{`
          .convert-title {
            font-size: 20px !important;
            margin: 0 0 30px 0;

          }
          :global(.convert .modal-header) {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
          :global(.convert .glyphicon.glyphicon-transfer) {
            background-color: #C0BFD3;
            display: inline-block;
            height: 30px;
            width: 30px;
            line-height: 30px;
            color: #ffffff;
            border-radius: 50%;
            vertical-align: text-top;
            padding: 0;
          }
          :global(.convert-submit) {
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            text-transform: uppercase;
          }
          :global(.form-control) {
            width: 100% !important;
            min-width: 100% !important;
            padding: 10px;
            width: 100% !important;
          }
          :global(.no-padding) {
            padding: 0;
          }
          :global(.flex-col) {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form noValidate onSubmit={::this.onSubmit}>
          <Grid fluid>
              <Row>
                <h2 className="convert-title">1 ETH = {rate.data} PLAT</h2>
              </Row>
              <Row style={{display: "flex"}}>
                <Col sm={5} className="no-padding">
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
                </Col>
                <Col sm={2} className="flex-col">
                  <Glyphicon glyph="transfer" />
                </Col>
                <Col sm={5} className="no-padding">
                  <InputGroup
                    type="number"
                    min={rate.data * step}
                    step={rate.data * step}
                    name="plat"
                    value={precisionRound(formData.plat, 6)}
                    onChange={::this.onChangePLAT}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" className="btn-block convert-submit">
                    <FormattedMessage id="buttons.convert" />
                  </Button>
                </Col>
              </Row>
              </Grid>
          </Form>
        </Modal.Body>
      </BGModal>
    );
  }
}
