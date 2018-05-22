import "./modal.less";
import "./gift.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Modal, Thumbnail} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {wallet} from "../../../shared/constants/placeholder";
import nftABI from "../../../shared/contracts/ERC721";
import {GIFT_ADD_ERROR, GIFT_ADD_LOADING, GIFT_ADD_SUCCESS, MESSAGE_ADD} from "../../../shared/constants/actions";
import InputGroupValidation from "../../components/common/inputs/input.group.validation";


@injectIntl
@connect(
  state => ({
    user: state.user,
    network: state.network,
    gas: state.gas
  })
)
export default class GiftPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    user: PropTypes.object,
    network: PropTypes.object,
    gas: PropTypes.object,
    onHide: PropTypes.func,
    dispatch: PropTypes.func,
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
    const {network, gas, user, item, game, onHide, dispatch} = this.props;
    const {formData} = this.state;

    dispatch({
      type: GIFT_ADD_LOADING
    });
    const contract = window.web3.eth.contract(nftABI).at(game.nft[network.data.id]);
    contract.safeTransferFrom(user.data.wallet, formData.get("wallet"), item.tokenId, {
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(gas.data.average)
      },
      (error, tx) => {
        if (error) {
          dispatch({
            type: GIFT_ADD_ERROR
          });
          dispatch({
            type: MESSAGE_ADD,
            payload: error
          });
        } else {
          dispatch({
            type: GIFT_ADD_SUCCESS,
            payload: {
              item: item.tokenId,
              game: game._id,
              tx
            }
          });
        }
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
    const {show, onHide, item} = this.props;

    return (
      <Modal show={show} className="gift" onHide={onHide} backdropClassName="semi">
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>{item.name}</h2>
            <br />

            <Thumbnail src={item.image} />
            <InputGroupValidation
              type="text"
              name="wallet"
              defaultValue={this.state.formData.get("wallet")}
              placeholder={wallet}
              maxLength="42"
              minLength="42"
              required
            />
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
