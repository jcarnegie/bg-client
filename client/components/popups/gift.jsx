import "./modal.less";
import "./gift.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Modal, Thumbnail} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {wallet} from "../../../shared/constants/placeholder";
import nftABI from "../../../shared/contracts/ERC721";


@injectIntl
@connect(
  state => ({
    user: state.user,
    network: state.network
  })
)
export default class GiftPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    user: PropTypes.object,
    network: PropTypes.object,
    onHide: PropTypes.func,
    item: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string
    }),
    game: PropTypes.shape({
      nft: PropTypes.object
    }),
    intl: intlShape
  };

  state = {
    formData: {
      get(key) {
        return this[key];
      },
      wallet: ""
    }
  };

  onSubmit(e) {
    e.preventDefault();

    if (!this.isValid(Array.from(e.target.elements))) {
      return false;
    }

    this.setState({
      formData: new FormData(e.target)
    }, this.transfer);
  }

  transfer() {
    const {network, user, item, game, onHide} = this.props;
    const {formData} = this.state;

    const contract = window.web3.eth.contract(nftABI).at(game.nft[network.data.id]);
    contract.safeTransferFrom(user.data.wallet, formData.get("wallet"), item.tokenId, {
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      },
      () => {
        onHide();
      }
    );
  }

  isValid(a) {
    const {intl} = this.props;

    let isValid = true;
    for (let e of a) {
      switch (e.name) {
        case "wallet":
          if (!window.web3.isAddress(e.value)) {
            e.parentNode.parentNode.classList.add("has-error");
            e.setCustomValidity(intl.formatMessage({
              id: "fields.wallet.invalid"
            }));
            isValid = false;
          }
          break;
        default:
          break;
      }
    }

    return isValid;
  }

  render() {
    const {show, onHide, intl, item} = this.props;

    return (
      <Modal show={show} className="gift" onHide={onHide} backdropClassName="semi">
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>{item.name}</h2>
            <br />

            <Thumbnail src={item.image} />

            <FormGroup controlId="wallet">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.wallet.label" />
              </Col>
              <Col>
                <FormControl
                  type="text"
                  name="wallet"
                  defaultValue={this.state.formData.get("wallet")}
                  placeholder={wallet}
                  maxLength="42"
                  minLength="42"
                  onInvalid={e => {
                    e.target.parentNode.parentNode.classList.add("has-error");
                    if (e.target.validity.valueMissing) {
                      e.target.setCustomValidity(intl.formatMessage({
                        id: "fields.wallet.required"
                      }));
                    } else if (e.target.validity.tooShort) {
                      e.target.setCustomValidity(intl.formatMessage({
                        id: "fields.wallet.minlength"
                      }));
                    } else if (e.target.validity.tooLong) {
                      e.target.setCustomValidity(intl.formatMessage({
                        id: "fields.wallet.maxlength"
                      }));
                    }
                  }}
                  onInput={e => {
                    e.target.parentNode.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                    this.setState({
                      walletLength: e.target.value.length
                    });
                  }}
                  required
                />
              </Col>
            </FormGroup>

            <br />

            <Button type="submit" className="btn-block text-uppercase">
              <FormattedMessage id="buttons.send" />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
