import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Glyphicon, Modal, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  localQueries,
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import BGModal from '@/components/modal';
import withFormHelper from '@/components/inputs/withFormHelper';

import {
  getTopupContract,
} from '@/shared/utils/network';

import InputGroup from '@/components/inputs/input.group';


function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

@withFormHelper
@connect(
  state => ({
    analytics: state.analytics,
  })
)
class ConvertPopup extends Component {
  static propTypes = {
    analytics: PropTypes.object,
    show: PropTypes.bool,
    data: PropTypes.object,
    dispatch: PropTypes.func,
    onHide: PropTypes.func,
    setState: PropTypes.func,
    formData: PropTypes.object,
    user: PropTypes.object,
  };

  state = {};

  componentDidMount() {
    const { setState, data } = this.props;
    setState({
      eth: 1,
      plat: data.rate,
    });
  }

  static getDerivedStateFromProps(nextProps) {
    const { data, formData } = nextProps;
    const { loading, rate } = data;
    if (loading) return null;

    const plat = rate * formData.eth;

    if (plat !== formData.plat) {
      nextProps.setState({ plat });
    }

    return null;
  }

  onChangeETH(e) {
    const { setState, data } = this.props;
    const { rate } = data;
    setState({
      eth: e.target.value,
      plat: rate * e.target.value,
    });
  }

  onChangePLAT(e) {
    const { setState, data } = this.props;
    const { rate } = data;
    setState({
      eth: e.target.value / rate,
      plat: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { data, dispatch, formData } = this.props;
    const { wallet, gas, network } = data;
    getTopupContract(network).buyTokens({
        value: window.web3.toWei(precisionRound(formData.eth, 6), 'ether'),
        from: wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(gas.average),
      },
      error => {
        if (error) {
          return null;
        }
        this.props.analytics.ga.event({
          category: 'Site Interaction',
          action: 'Purchase',
          label: 'Buy-Plat',
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
    const { data, show, onHide, formData } = this.props;
    const { rate } = data;

    if (!rate) {
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
                <h2 className="convert-title">1 ETH = {rate} PLAT</h2>
              </Row>
              <Row style={{ display: 'flex' }}>
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
                    min={rate * step}
                    step={rate * step}
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


export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root),
)(ConvertPopup);
