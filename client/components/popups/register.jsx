import "./modal.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {email, nickName, wallet} from "../../../shared/constants/placeholder";
import {reEmail} from "../../../shared/constants/regexp";
import {CREATE_USER, MESSAGE_ADD} from "../../../shared/constants/actions";
import {enabledLanguages} from "../../../shared/constants/language";


@injectIntl
@connect(
  state => ({
    user: state.user,
    account: state.account,
    network: state.network
  })
)
export default class RegisterPopup extends Component {
  static propTypes = {
    user: PropTypes.object,
    account: PropTypes.object,
    network: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  state = {
    walletLength: 0,
    formData: {
      get(key) {
        return this[key];
      },
      wallet: this.props.account.wallet,
      language: this.props.intl.locale
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: {
        get(key) {
          return this[key];
        },
        wallet: nextProps.account.wallet,
        language: nextProps.intl.locale
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
    }, this.sign);
  }

  isValid(a) {
    const {intl} = this.props;

    let isValid = true;
    for (let e of a) {
      switch (e.name) {
        case "wallet":
          if (!window.web3.isAddress(e.value)) {
            e.parentNode.classList.add("has-error");
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

  sign() {
    const {dispatch, intl} = this.props;
    const message = window.web3.toHex(intl.formatMessage({id: "modals.register.text"}));
    const from = this.state.formData.get("wallet");

    window.web3.currentProvider.sendAsync({
      method: "personal_sign",
      params: [message, from],
      from
    }, (err, result) => {
      if (err || result.error) {
        dispatch({
          type: MESSAGE_ADD,
          payload: err || result.error
        });
        return;
      }

      window.web3.currentProvider.sendAsync({
        method: "personal_ecRecover",
        params: [message, result.result],
        from
      }, (err, recovered) => {
        if (err || result.error) {
          dispatch({
            type: MESSAGE_ADD,
            payload: err || result.error
          });
          return;
        }

        if (recovered.result === from) {
          dispatch({
            type: CREATE_USER,
            payload: Array.from(this.state.formData.entries()).reduce((memo, pair) => ({
              ...memo,
              [pair[0]]: pair[1]
            }), {})
          });
        } else {
          dispatch({
            type: MESSAGE_ADD,
            payload: new Error(intl.formatMessage({
              id: "errors.spoofing-attempt"
            }, {
              wallet1: recovered.result,
              wallet2: from
            }))
          });
        }
      });
    });
  }

  render() {
    const {user, intl, network} = this.props;

    return (
      <Modal show={!network.isLoading && network.success && !user.isLoading && !user.success} className="register">
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>
              <FormattedMessage id="modals.register.title" />
            </h2>
            <br />
            <FormGroup controlId="wallet">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.language.label" />
              </Col>
              <Col>
                <FormControl
                  name="language"
                  componentClass="select"
                  defaultValue={this.state.formData.get("language")}
                  required
                >
                  {enabledLanguages.map(language =>
                    (<FormattedMessage key={language} id={`components.language.${language}`}>
                      {formattedMessage => <option key={language} value={language}>{formattedMessage}</option>}
                    </FormattedMessage>)
                  )}
                </FormControl>
              </Col>
            </FormGroup>
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
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.email.label" />
              </Col>
              <Col>
                <FormControl
                  type="email"
                  name="email"
                  pattern={reEmail.source.replace("a-z", "a-zA-Z")} // there is no `i` flag
                  defaultValue={this.state.formData.get("email")}
                  placeholder={email}
                  onInvalid={e => {
                    e.target.parentNode.parentNode.classList.add("has-error");
                    if (e.target.validity.valueMissing) {
                      e.target.setCustomValidity(intl.formatMessage({
                        id: "fields.email.required"
                      }));
                    } else if (e.target.validity.typeMismatch) {
                      e.target.setCustomValidity(intl.formatMessage({
                        id: "fields.email.invalid"
                      }));
                    }
                  }}
                  onInput={e => {
                    e.target.parentNode.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                  }}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="nickName">
              <Col componentClass={ControlLabel}>
                <FormattedMessage id="fields.nickName.label" />
              </Col>
              <Col>
                <FormControl
                  type="text"
                  name="nickName"
                  defaultValue={this.state.formData.get("nickName")}
                  placeholder={nickName}
                  onInvalid={e => {
                    e.target.parentNode.parentNode.classList.add("has-error");
                    e.target.setCustomValidity(intl.formatMessage({
                      id: "fields.nickName.required"
                    }));
                  }}
                  onInput={e => {
                    e.target.parentNode.parentNode.classList.remove("has-error");
                    e.target.setCustomValidity("");
                  }}
                  required
                />
              </Col>
            </FormGroup>

            <p className="note"><FormattedMessage id="modals.register.n1" /></p>
            <p className="note"><FormattedMessage id="modals.register.n2" /></p>

            <br />
            <Button type="submit" className="btn-block text-uppercase">
              <FormattedMessage id="buttons.register" />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
