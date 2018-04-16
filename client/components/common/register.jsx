import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {email, nickName, wallet} from "../../../shared/constants/placeholder";
import {reEmail} from "../../../shared/constants/regexp";


@injectIntl
@connect(
  state => ({
    user: state.user,
    account: state.account
  })
)
export default class RegisterPopup extends Component {
  static propTypes = {
    user: PropTypes.object,
    account: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  state = {
    walletLength: 0,
    formData: {
      get(key) {
        return this[key];
      },
      wallet: this.props.account.wallet
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: {
        get(key) {
          return this[key];
        },
        wallet: nextProps.account.wallet
      }
    });
  }


  onSubmit(e) {
    e.preventDefault();

    if (!this.isValid(Array.from(e.target.elements))) {
      return false;
    }

    this.setState({
      formData: new FormData(e.target)
    }, () => {
      this.props.dispatch({
        type: "CREATE_USER",
        payload: Array.from(this.state.formData.entries()).reduce((memo, pair) => ({
          ...memo,
          [pair[0]]: pair[1]
        }), {})
      });
    });
  }

  isValid(a) {
    let isValid = true;
    for (let e of a) {
      switch (e.name) {
        case "wallet":
          if (!window.web3.isAddress(e.value)) {
            e.parentNode.classList.add("has-error");
            e.setCustomValidity(this.props.intl.formatMessage({
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
    return (
      <Modal show={this.props.account.isLoaded && this.props.account.wallet && this.props.user.isLoaded && !this.props.user.data}>
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <FormGroup controlId="nickName">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="forms.nickName" />
              </Col>
              <Col>
                <FormControl
                  type="text"
                  name="nickName"
                  defaultValue={this.state.formData.get("nickName")}
                  placeholder={nickName}
                  onInvalid={e => {
                    e.target.parentNode.classList.add("has-error");
                    e.target.setCustomValidity(this.props.intl.formatMessage({
                      id: "fields.nickName.required"
                    }));
                  }}
                  onInput={e => {
                    e.target.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                  }}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="forms.email" />
              </Col>
              <Col>
                <FormControl
                  type="email"
                  name="email"
                  pattern={reEmail.source.replace("a-z", "a-zA-Z")} // there is no `i` flag
                  defaultValue={this.state.formData.get("email")}
                  placeholder={email}
                  onInvalid={e => {
                    e.target.parentNode.classList.add("has-error");
                    if (e.target.validity.valueMissing) {
                      e.target.setCustomValidity(this.props.intl.formatMessage({
                        id: "fields.email.required"
                      }));
                    } else if (e.target.validity.typeMismatch) {
                      e.target.setCustomValidity(this.props.intl.formatMessage({
                        id: "fields.email.invalid"
                      }));
                    }
                  }}
                  onInput={e => {
                    e.target.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                  }}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="wallet">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="forms.wallet" />
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
                    e.target.parentNode.classList.add("has-error");
                    if (e.target.validity.valueMissing) {
                      e.target.setCustomValidity(this.props.intl.formatMessage({
                        id: "fields.wallet.required"
                      }));
                    } else if (e.target.validity.tooShort) {
                      e.target.setCustomValidity(this.props.intl.formatMessage({
                        id: "fields.wallet.minlength"
                      }));
                    } else if (e.target.validity.tooLong) {
                      e.target.setCustomValidity(this.props.intl.formatMessage({
                        id: "fields.wallet.maxlength"
                      }));
                    }
                  }}
                  onInput={e => {
                    e.target.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                    this.setState({
                      walletLength: e.target.value.length
                    });
                  }}
                  required
                  readOnly
                />
              </Col>
            </FormGroup>

            <br />

            <ButtonToolbar>
              <Button type="submit" className="pull-right">
                <FormattedMessage id="components.buttons.register" />
              </Button>
            </ButtonToolbar>

          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
